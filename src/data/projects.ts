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
  { id: 'interior-living-room', title: 'Living room repaint', category: 'Interior', image: '/images/projects/interior-living-room.jpg', alt: 'Living room with freshly painted walls', description: 'Sample project — replace with a real Jupiter Decors interior.', isPlaceholder: true },
  { id: 'exterior-house', title: 'Independent house exterior', category: 'Exterior', image: '/images/projects/exterior-house.jpg', alt: 'Exterior of an independent house after painting', description: 'Sample project — replace with a real Jupiter Decors exterior.', isPlaceholder: true, shape: 'tall' },
  { id: 'texture-feature-wall', title: 'Textured feature wall', category: 'Texture', image: '/images/projects/texture-feature-wall.jpg', alt: 'Textured feature wall behind a sofa', description: 'Sample project — replace with a real texture painting project.', isPlaceholder: true },
  { id: 'repaint-bedroom', title: 'Bedroom colour refresh', category: 'Repainting', image: '/images/projects/repaint-bedroom.jpg', alt: 'Bedroom repainted in a soft colour', description: 'Sample project — replace with a real repainting project.', isPlaceholder: true },
  { id: 'waterproofing-terrace', title: 'Terrace waterproofing', category: 'Waterproofing', image: '/images/projects/waterproofing-terrace.jpg', alt: 'Terrace surface with waterproof coating', description: 'Sample project — replace with a real waterproofing project.', isPlaceholder: true, shape: 'tall' },
  { id: 'interior-kitchen', title: 'Kitchen and dining area', category: 'Interior', image: '/images/projects/interior-kitchen.jpg', alt: 'Kitchen and dining area with washable wall paint', description: 'Sample project — replace with a real Jupiter Decors interior.', isPlaceholder: true },
  { id: 'exterior-apartment', title: 'Apartment block exterior', category: 'Exterior', image: '/images/projects/exterior-apartment.jpg', alt: 'Apartment building exterior after repainting', description: 'Sample project — replace with a real Jupiter Decors exterior.', isPlaceholder: true },
  { id: 'texture-entrance', title: 'Entrance texture finish', category: 'Texture', image: '/images/projects/texture-entrance.jpg', alt: 'Textured wall finish at a home entrance', description: 'Sample project — replace with a real texture painting project.', isPlaceholder: true, shape: 'tall' },
  { id: 'repaint-office', title: 'Office repaint', category: 'Repainting', image: '/images/projects/repaint-office.jpg', alt: 'Repainted office interior', description: 'Sample project — replace with a real repainting project.', isPlaceholder: true },
  { id: 'waterproofing-bathroom', title: 'Bathroom wall damp treatment', category: 'Waterproofing', image: '/images/projects/waterproofing-bathroom.jpg', alt: 'Bathroom wall after damp treatment and repainting', description: 'Sample project — replace with a real waterproofing project.', isPlaceholder: true },
];
