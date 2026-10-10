/**
 * Page titles and descriptions for every route, in one place.
 *
 * Browser tab titles: the homepage shows just the company name, and inner pages
 * show "Page | Jupiter Decors". The location keywords (Chennai, services) live
 * in the descriptions, headings and structured data, which is where search
 * engines use them for local results.
 *
 * This file is read by the app at runtime AND at build time, so every page is
 * also written out as static HTML with the right tags for Google, WhatsApp and
 * social link previews.
 */
import { business } from '../config/business';
import { services } from './services';

export interface PageSeo {
  path: string;
  /** Short page name; the homepage uses the company name on its own. */
  title: string;
  description: string;
  image: string;
  /** Hide from search engines (404 page). */
  noindex?: boolean;
}

export const fullTitle = (page: Pick<PageSeo, 'path' | 'title'>) =>
  page.path === '/' ? business.name : `${page.title} | ${business.name}`;

export const pages: PageSeo[] = [
  {
    path: '/',
    title: business.name,
    description:
      'Jupiter Decors offers interior, exterior, new house painting, repainting, waterproofing and texture painting in Chennai. Request a free painting quotation.',
    image: '/images/hero.jpg',
  },
  {
    path: '/services',
    title: 'Services',
    description:
      'Explore Jupiter Decors painting services in Chennai: interior, exterior, new house painting, repainting, waterproofing and texture painting.',
    image: '/images/services/interior-painting.jpg',
  },
  ...services.map((s) => ({
    path: `/services/${s.slug}`,
    title: s.name,
    description: s.seoDescription,
    image: s.image,
  })),
  {
    path: '/projects',
    title: 'Our Work',
    description:
      'Browse Jupiter Decors painting projects in Chennai: interior painting, exterior painting, repainting, texture finishes and waterproofing.',
    image: '/images/projects/interior-living-room.jpg',
  },
  {
    path: '/about',
    title: 'About',
    description:
      'Jupiter Decors is a Chennai-based painting service focused on careful preparation, clear communication and quality finishes for homes and workspaces.',
    image: '/images/about.jpg',
  },
  {
    path: '/contact',
    title: 'Contact',
    description:
      'Request a painting quotation from Jupiter Decors in Chennai. Send your project details on WhatsApp or call us.',
    image: '/images/hero.jpg',
  },
];

export const notFoundSeo: PageSeo = {
  path: '/404',
  title: 'Page not found',
  description: 'The page you were looking for could not be found.',
  image: '/images/hero.jpg',
  noindex: true,
};

export const getPageSeo = (path: string) => pages.find((p) => p.path === path) ?? notFoundSeo;
