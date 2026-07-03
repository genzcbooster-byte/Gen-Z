import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google Auth Provider with necessary scopes
export const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Since Firebase SDK doesn't persist the raw provider access token across page refreshes,
        // we'll need the user to trigger signIn if the token has expired,
        // but we can let them click to reconnect/re-authenticate if they are already logged in.
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in to retrieve fresh access token
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google access token from sign-in.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Sign-in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = () => cachedAccessToken;

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

// Search Google Drive for Genzverse Applications spreadsheet
export const findSpreadsheet = async (accessToken: string): Promise<string | null> => {
  try {
    const q = encodeURIComponent("name = 'Genzverse Applications' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false");
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name)`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      console.error('Failed to search Drive:', await response.text());
      return null;
    }

    const data = await response.json();
    if (data.files && data.files.length > 0) {
      return data.files[0].id;
    }
    return null;
  } catch (error) {
    console.error('Error finding spreadsheet:', error);
    return null;
  }
};

// Create a new Genzverse Applications spreadsheet and add headers
export const createSpreadsheet = async (accessToken: string): Promise<string> => {
  try {
    // 1. Create spreadsheet
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          title: 'Genzverse Applications',
        },
        sheets: [
          {
            properties: {
              title: 'Applications',
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Spreadsheet creation failed: ${await response.text()}`);
    }

    const sheetData = await response.json();
    const spreadsheetId = sheetData.spreadsheetId;

    // 2. Set headers on the spreadsheet
    const headers = [
      'ID',
      'Full Name',
      'Age',
      'Email ID',
      'College Name',
      'College Year',
      'Subjects',
      'WhatsApp/Phone',
      'Superpower',
      'Heard About Us',
      'Why Join',
      'Submitted At',
    ];

    const headerResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Applications!A1:L1?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [headers],
        }),
      }
    );

    if (!headerResponse.ok) {
      console.error('Failed to write headers:', await headerResponse.text());
    }

    return spreadsheetId;
  } catch (error) {
    console.error('Error creating spreadsheet:', error);
    throw error;
  }
};

// Append application row to Genzverse Applications spreadsheet
export const appendApplication = async (
  accessToken: string,
  spreadsheetId: string,
  formData: {
    id: string;
    fullName: string;
    age: string;
    email: string;
    collegeName: string;
    collegeYear: string;
    subjects?: string;
    whatsapp: string;
    instagram?: string;
    superpower: string;
    heardAboutUs: string;
    whyJoin?: string;
    submittedAt: string;
  }
): Promise<boolean> => {
  try {
    const row = [
      formData.id || Math.random().toString(36).substr(2, 9),
      formData.fullName,
      formData.age,
      formData.email,
      formData.collegeName,
      formData.collegeYear,
      formData.subjects || 'N/A',
      formData.whatsapp,
      formData.instagram || 'N/A',
      formData.superpower,
      formData.heardAboutUs,
      formData.whyJoin || 'N/A',
      formData.submittedAt,
    ];

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Applications!A:L:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [row],
        }),
      }
    );

    if (!response.ok) {
      console.error('Failed to append row:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error appending application:', error);
    return false;
  }
};

// Fetch all applications currently stored in the spreadsheet
export const fetchApplicationsFromSheet = async (
  accessToken: string,
  spreadsheetId: string
): Promise<any[]> => {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Applications!A2:L2000`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch spreadsheet rows:', await response.text());
      return [];
    }

    const data = await response.json();
    if (!data.values) return [];

    return data.values.map((row: any[], index: number) => ({
      id: row[0] || `row-${index}`,
      fullName: row[1] || 'N/A',
      age: row[2] || 'N/A',
      email: row[3] || 'N/A',
      collegeName: row[4] || 'N/A',
      collegeYear: row[5] || 'N/A',
      subjects: row[6] || 'N/A',
      whatsapp: row[7] || 'N/A',
      instagram: row[8] || 'N/A',
      superpower: row[9] || 'N/A',
      heardAboutUs: row[10] || 'N/A',
      whyJoin: row[11] || 'N/A',
      submittedAt: row[12] || 'N/A',
    }));
  } catch (error) {
    console.error('Error fetching rows:', error);
    return [];
  }
};
