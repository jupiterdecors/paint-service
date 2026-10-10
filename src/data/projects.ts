/**
 * Project gallery.
 *
 * IMPORTANT: these entries are SAMPLE PLACEHOLDERS. Replace them with real
 * Jupiter Decors projects: add your photo to public/images/projects/,
 * update the title, category, description and alt text, and set
 * `isPlaceholder: false`.
 */
export const projectCategories = ['Interior', 'Exterior', 'Repainting', 'Texture', 'Waterproofing'] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  /** Describe what is in the photo for screen readers and search engines. */
  alt: string;
  description: string;
  /** true = sample entry shown until a real project photo is added. */
  isPlaceholder: boolean;
  /** Use 'tall' for portrait photos to vary the gallery layout. */
  shape?: 'wide' | 'tall';
}

export const projects: Project[] = [
  { id: 'interior-living-room', title: 'Living room repaint', category: 'Interior', image: '/images/projects/interior-living-room.jpg', alt: 'Modern living room with freshly painted walls', description: 'Fresh interior walls with a smooth, even finish.', isPlaceholder: true },
  { id: 'exterior-house', title: 'Independent house exterior', category: 'Exterior', image: '/images/projects/exterior-house.jpg', alt: 'Independent house with a freshly painted facade among trees', description: 'Exterior repaint with weather-suited coatings.', isPlaceholder: true, shape: 'tall' },
  { id: 'texture-feature-wall', title: 'Feature wall colour', category: 'Texture', image: '/images/projects/texture-feature-wall.jpg', alt: 'Feature wall being painted in a deep blue', description: 'Feature wall with a decorative finish.', isPlaceholder: true },
  { id: 'repaint-bedroom', title: 'Room colour refresh', category: 'Repainting', image: '/images/projects/repaint-bedroom.jpg', alt: 'Room being repainted in a soft grey', description: 'Colour refresh with careful surface preparation.', isPlaceholder: true },
  { id: 'waterproofing-terrace', title: 'Terrace waterproofing', category: 'Waterproofing', image: '/images/projects/waterproofing-terrace.jpg', alt: 'Worker waterproofing a flat terrace roof', description: 'Waterproofing coat to protect against leaks and damp.', isPlaceholder: true, shape: 'tall' },
  { id: 'interior-kitchen', title: 'Kitchen and dining area', category: 'Interior', image: '/images/projects/interior-kitchen.jpg', alt: 'Open-plan living and kitchen area with light painted walls', description: 'Fresh interior walls with a smooth, even finish.', isPlaceholder: true },
  { id: 'exterior-apartment', title: 'Apartment block exterior', category: 'Exterior', image: '/images/projects/exterior-apartment.jpg', alt: 'Residential building exterior surrounded by greenery', description: 'Exterior repaint with weather-suited coatings.', isPlaceholder: true },
  { id: 'texture-entrance', title: 'Feature wall finishing', category: 'Texture', image: '/images/projects/texture-entrance.jpg', alt: 'Painting tools beside a freshly painted feature wall', description: 'Feature wall with a decorative finish.', isPlaceholder: true, shape: 'tall' },
  { id: 'repaint-office', title: 'Workspace repaint', category: 'Repainting', image: '/images/projects/repaint-office.jpg', alt: 'Painter rolling white paint onto a workspace wall', description: 'Colour refresh with careful surface preparation.', isPlaceholder: true },
  { id: 'waterproofing-bathroom', title: 'Roof waterproofing', category: 'Waterproofing', image: '/images/projects/waterproofing-bathroom.jpg', alt: 'Workers applying waterproofing material on a building roof', description: 'Waterproofing coat to protect against leaks and damp.', isPlaceholder: true },
];
