import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const useSEO = (props: SEOProps | string, description?: string) => {
  useEffect(() => {
    let title: string;
    let desc: string;
    let keywords: string | undefined;
    let image = "https://genzverse.space/og-image.jpg";
    let url = window.location.href;
    let type = "website";

    if (typeof props === 'string') {
      title = props;
      desc = description || "";
    } else {
      title = props.title;
      desc = props.description;
      keywords = props.keywords;
      image = props.image || image;
      url = props.url || url;
      type = props.type || type;
    }

    document.title = title;
    
    const updateMeta = (name: string, content: string, attr: string = "name") => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta("description", desc);
    if (keywords) updateMeta("keywords", keywords);
    
    // OG Tags
    updateMeta("og:title", title, "property");
    updateMeta("og:description", desc, "property");
    updateMeta("og:image", image, "property");
    updateMeta("og:url", url, "property");
    updateMeta("og:type", type, "property");

    // Twitter Tags
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", desc);
    updateMeta("twitter:image", image);
    updateMeta("twitter:card", "summary_large_image");

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

  }, [props, description]);
};
