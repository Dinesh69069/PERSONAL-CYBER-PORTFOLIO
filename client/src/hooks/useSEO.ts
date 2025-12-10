import { useEffect } from 'react';
import { getPageMeta, PageMeta } from '../lib/seoConfig';

export const useSEO = (pageName: string) => {
  useEffect(() => {
    const meta: PageMeta = getPageMeta(pageName);
    
    // Update document title
    document.title = meta.title;
    
    // Update meta description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', meta.description);
    }
    
    // Update keywords if provided
    if (meta.keywords) {
      const keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta) {
        keywordsMeta.setAttribute('content', meta.keywords);
      }
    }
    
    // Update Open Graph meta tags
    updateMetaTag('og:title', meta.title);
    updateMetaTag('og:description', meta.description);
    updateMetaTag('og:type', meta.ogType || 'website');
    
    // Update Twitter Card meta tags
    updateMetaTag('twitter:title', meta.title);
    updateMetaTag('twitter:description', meta.description);
    
    // Update canonical URL if provided
    if (meta.canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', meta.canonical);
    }
  }, [pageName]);
};

// Helper function to update or create meta tags
const updateMetaTag = (property: string, content: string) => {
  let metaTag = document.querySelector(`meta[property="${property}"]`);
  if (!metaTag) {
    metaTag = document.querySelector(`meta[name="${property}"]`);
  }
  
  if (metaTag) {
    metaTag.setAttribute('content', content);
  } else {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(property.startsWith('og:') || property.startsWith('twitter:') ? 'property' : 'name', property);
    metaTag.setAttribute('content', content);
    document.head.appendChild(metaTag);
  }
};
