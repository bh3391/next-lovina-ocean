import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma'; // Sesuaikan dengan lokasi prisma client Anda

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lovinaoceandolphintour.com';

  // AMBIL DATA DARI DATABASE
  const allPackages = await prisma.package.findMany({
    select: {
      slug: true,
    },
  });

  // MAPPING DATA KE FORMAT SITEMAP
  const packageEntries: MetadataRoute.Sitemap = allPackages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // DAFTAR HALAMAN STATIS
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // Tambahkan halaman lain jika ada (misal: contact, about)
    {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
    {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
  ];

  return [...staticEntries, ...packageEntries];
}