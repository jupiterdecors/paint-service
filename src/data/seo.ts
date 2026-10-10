/**
 * Page titles and descriptions for every route, in one place.
 *
 * Titles carry the main search keywords ("painting services / painters in
 * Chennai", each service name + Chennai) since Google weighs the title most.
 * Homepage: "Jupiter Decors | Painting Services & Painters in Chennai";
 * inner pages: "Page title | Jupiter Decors". Keep titles under ~60 characters
 * and descriptions under ~160 so Google shows them in full.
 *
 * This file is read by the app at runtime AND at build time, so every page is
 * also written out as static HTML with the right tags for Google, WhatsApp and
 * social link previews.
 */
import { business } from '../config/business';
import { services } from './services';

export interface PageSeo {
  path: string;
  /** Page title (before " | Jupiter Decors"); the homepage uses HOME_TITLE instead. */
  title: string;
  description: string;
  image: string;
  /** Hide from search engines (404 page). */
  noindex?: boolean;
}

const HOME_TITLE = `${business.name} | Painting Services & Painters in ${business.city}`;

export const fullTitle = (page: Pick<PageSeo, 'path' | 'title'>) =>
  page.path === '/' ? HOME_TITLE : `${page.title} | ${business.name}`;

export const pages: PageSeo[] = [
  {
    path: '/',
    title: business.name,
    description:
      'Painters in Chennai for interior & exterior painting, new house painting, repainting, waterproofing and texture finishes. Get a free quote from Jupiter Decors.',
    image: '/images/hero.jpg',
  },
  {
    path: '/services',
    title: 'Painting Services in Chennai',
    description:
      'Explore Jupiter Decors painting services in Chennai: interior, exterior, new house painting, repainting, waterproofing and texture painting.',
    image: '/images/services/interior-painting.jpg',
  },
  ...services.map((s) => ({
    path: `/services/${s.slug}`,
    title: `${s.name} in Chennai`,
    description: s.seoDescription,
    image: s.image,
  })),
  {
    path: '/projects',
    title: 'Painting Projects in Chennai',
    description:
      'Browse Jupiter Decors painting projects in Chennai: interior painting, exterior painting, repainting, texture finishes and waterproofing.',
    image: '/images/projects/interior-living-room.jpg',
  },
  {
    path: '/about',
    title: 'About Our Chennai Painting Company',
    description:
      'Jupiter Decors is a Chennai-based painting service focused on careful preparation, clear communication and quality finishes for homes and workspaces.',
    image: '/images/about.jpg',
  },
  {
    path: '/contact',
    title: 'Contact & Free Painting Quote in Chennai',
    description:
      'Request a free painting quotation from Jupiter Decors in Chennai. Share your project details online and we will call you back.',
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
