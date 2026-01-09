import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://lovinaoceandolphintour.com'; 
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',      
        '/sign-in',    
        '/sign-up',    
        '/api',        
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}