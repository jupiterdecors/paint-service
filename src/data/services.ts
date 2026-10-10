import type { LucideIcon } from 'lucide-react';
import { Building2, Droplets, House, Layers, PaintRoller, RefreshCw } from 'lucide-react';

/**
 * Painting services. Edit text here and it updates the homepage cards,
 * the Services page and each service's own page.
 *
 * Photos: put a JPG at the `image` path inside /public (for example
 * public/images/services/interior-painting.jpg). Until a photo exists,
 * a labelled placeholder is shown instead.
 */
export interface Service {
  slug: string;
  name: string;
  icon: LucideIcon;
  /** One or two sentences for service cards. */
  summary: string;
  /** Page heading on the service's own page. */
  headline: string;
  intro: string[];
  image: string;
  imageAlt: string;
  /** Second image used further down the service page. */
  detailImage: string;
  detailImageAlt: string;
  benefits: { title: string; text: string }[];
  preparation: { title: string; text: string }[];
  suitableFor: string[];
  seoDescription: string;
}

export const services: Service[] = [
  {
    slug: 'interior-painting',
    name: 'Interior Painting',
    icon: PaintRoller,
    summary: 'Living rooms, bedrooms, kitchens and offices painted with a smooth, even finish and clean edges.',
    headline: 'Interior painting for rooms you live and work in',
    intro: [
      'Interior painting changes how a room feels every day. We paint living rooms, bedrooms, kitchens, hallways, ceilings and office spaces, with careful attention to the surface underneath the colour.',
      'Before we start, we talk through the colours, sheen and paint type that suit each room — for example washable finishes for kitchens and children’s rooms, or a softer finish for bedrooms.',
    ],
    image: '/images/services/interior-painting.jpg',
    imageAlt: 'Painter rolling a fresh coat of paint onto a living room wall',
    detailImage: '/images/services/interior-painting-detail.jpg',
    detailImageAlt: 'Freshly painted interior wall with clean edges along the ceiling',
    benefits: [
      { title: 'Even, consistent finish', text: 'Walls are prepared and coated so the colour looks uniform in daylight and under lamps.' },
      { title: 'Clean lines', text: 'Edges along ceilings, skirting, switchboards and window frames are cut in neatly.' },
      { title: 'The right finish for each room', text: 'We recommend suitable paint types for high-use areas, damp-prone rooms and ceilings.' },
      { title: 'Furniture and floors protected', text: 'Furniture is moved or covered and floors are masked before painting begins.' },
    ],
    preparation: [
      { title: 'Protect the room', text: 'Cover floors and furniture, and mask switchboards, fittings and window frames.' },
      { title: 'Repair the surface', text: 'Fill cracks and holes, and scrape away loose or flaking paint.' },
      { title: 'Sand and clean', text: 'Smooth patched areas and remove dust so paint can bond properly.' },
      { title: 'Prime where needed', text: 'Apply primer or putty on repaired or bare areas to even out the surface.' },
      { title: 'Apply finish coats', text: 'Apply the agreed number of coats, then inspect the room with you and clean up.' },
    ],
    suitableFor: ['Apartments and independent houses', 'Individual rooms or the whole home', 'Offices, clinics and shops', 'Ceilings and hallways'],
    seoDescription:
      'Interior painting in Chennai for living rooms, bedrooms, kitchens and offices. Careful preparation, clean edges and suitable paint recommendations from Jupiter Decors.',
  },
  {
    slug: 'exterior-painting',
    name: 'Exterior Painting',
    icon: Building2,
    summary: 'Weather-suited exterior coatings that refresh your building and help protect walls from sun and rain.',
    headline: 'Exterior painting made for Chennai weather',
    intro: [
      'Exterior walls face strong sun, heavy monsoon rain and humid, salty air. The right preparation and a suitable exterior coating help your building look fresh and keep its walls better protected.',
      'We inspect the outside walls, discuss areas that need repair, and recommend exterior paint systems suited to the surface and its exposure.',
    ],
    image: '/images/services/exterior-painting.jpg',
    imageAlt: 'Freshly painted exterior of a two-storey house',
    detailImage: '/images/services/exterior-painting-detail.jpg',
    detailImageAlt: 'Close view of a painted exterior wall and window frame',
    benefits: [
      { title: 'Suited to sun and rain', text: 'We recommend exterior coatings intended for outdoor exposure rather than interior paint.' },
      { title: 'Cracks addressed first', text: 'Visible cracks and damaged plaster are repaired before painting.' },
      { title: 'Improved kerb appeal', text: 'A fresh exterior colour scheme can make a home or building look well kept.' },
      { title: 'Organised site work', text: 'Work areas, ladders and materials are managed carefully around your property.' },
    ],
    preparation: [
      { title: 'Inspect the walls', text: 'Check for cracks, damp patches, algae and peeling paint.' },
      { title: 'Clean the surface', text: 'Remove dust, dirt and loose paint, and treat algae or fungus where present.' },
      { title: 'Repair cracks', text: 'Fill and seal cracks and patch damaged areas.' },
      { title: 'Prime', text: 'Apply a suitable exterior primer to help the finish coats bond.' },
      { title: 'Apply exterior coats', text: 'Apply the agreed exterior paint and inspect the finish with you.' },
    ],
    suitableFor: ['Independent houses and villas', 'Apartment buildings', 'Compound walls and gates', 'Shop and office frontages'],
    seoDescription:
      'Exterior painting in Chennai with crack repair, surface preparation and weather-suited coatings for houses, apartments and commercial buildings.',
  },
  {
    slug: 'new-house-painting',
    name: 'New House Painting',
    icon: House,
    summary: 'Complete painting for newly built homes, from putty and primer to the final coat, inside and out.',
    headline: 'Painting your new home from the first coat',
    intro: [
      'A newly built house needs a complete painting system: surface preparation, putty, primer and finish coats on fresh plaster. Getting these first layers right makes a difference for years.',
      'We help you plan colours room by room, choose finishes for interiors and exteriors, and coordinate the painting stage with the rest of your construction work.',
    ],
    image: '/images/services/new-house-painting.jpg',
    imageAlt: 'Bright, newly painted room in a new house',
    detailImage: '/images/services/new-house-painting-detail.jpg',
    detailImageAlt: 'Painter applying primer to fresh plaster in a new house',
    benefits: [
      { title: 'A full painting system', text: 'Putty, primer and finish coats are planned together rather than as separate jobs.' },
      { title: 'Colour planning', text: 'We help you choose a colour scheme that works across connecting rooms.' },
      { title: 'Interior and exterior together', text: 'One team handles the inside and outside, keeping finishes consistent.' },
      { title: 'Coordinated with construction', text: 'We plan painting around flooring, electrical and carpentry work.' },
    ],
    preparation: [
      { title: 'Check the plaster', text: 'Confirm new plaster has cured enough to be painted and note uneven areas.' },
      { title: 'Apply wall putty', text: 'Fill pores and level the surface for a smooth base.' },
      { title: 'Sand smooth', text: 'Sand the putty to an even surface and remove dust.' },
      { title: 'Prime', text: 'Apply primer suited to new interior and exterior surfaces.' },
      { title: 'Finish coats', text: 'Apply the chosen colours and finishes, then walk through every room with you.' },
    ],
    suitableFor: ['Newly built independent houses', 'New apartments before move-in', 'Home extensions and new floors', 'Builders and contractors'],
    seoDescription:
      'New house painting in Chennai including putty, primer and finish coats for interiors and exteriors, with colour planning from Jupiter Decors.',
  },
  {
    slug: 'repainting',
    name: 'Repainting',
    icon: RefreshCw,
    summary: 'Refresh faded, stained or dated walls in an occupied home with tidy, well-planned work.',
    headline: 'Repainting that refreshes your home without the chaos',
    intro: [
      'Over time, walls fade, stain, crack or simply start to feel dated. Repainting gives your home a fresh look, whether you are updating one room, preparing to rent out, or welcoming an occasion.',
      'Because most repainting happens in lived-in homes, we plan the work room by room, protect your belongings and keep the space as usable as possible.',
    ],
    image: '/images/services/repainting.jpg',
    imageAlt: 'Living room wall being repainted in a new colour',
    detailImage: '/images/services/repainting-detail.jpg',
    detailImageAlt: 'Wall partly repainted showing old and new colour',
    benefits: [
      { title: 'Room-by-room planning', text: 'Work is scheduled so you can keep using the rest of your home.' },
      { title: 'Old problems fixed', text: 'Flaking paint, cracks and stains are treated rather than painted over.' },
      { title: 'Belongings protected', text: 'Furniture, floors and fittings are covered before work starts.' },
      { title: 'A fresh colour scheme', text: 'Keep your existing colours or try a new palette — we can help you decide.' },
    ],
    preparation: [
      { title: 'Plan the sequence', text: 'Agree which rooms are painted in which order.' },
      { title: 'Protect belongings', text: 'Move or cover furniture and protect floors and fittings.' },
      { title: 'Remove loose paint', text: 'Scrape and sand flaking or peeling areas.' },
      { title: 'Treat stains and cracks', text: 'Fill cracks and use suitable primers over stains or colour changes.' },
      { title: 'Repaint and tidy', text: 'Apply finish coats, put rooms back in order and clean up.' },
    ],
    suitableFor: ['Occupied homes and apartments', 'Rental properties between tenants', 'Homes before festivals or functions', 'Offices and shops'],
    seoDescription:
      'Repainting services in Chennai for lived-in homes, rentals and offices. Room-by-room planning, surface repair and careful protection of your belongings.',
  },
  {
    slug: 'waterproofing',
    name: 'Waterproofing',
    icon: Droplets,
    summary: 'Waterproofing for terraces, bathrooms and external walls to help prevent leaks and damp patches.',
    headline: 'Waterproofing to help keep damp and leaks out',
    intro: [
      'Leaks and damp patches damage paint, plaster and the comfort of your home — especially through the monsoon. Waterproofing treats the source of the moisture rather than only the stains it leaves.',
      'We look at where the water is coming from, explain the options for that area — such as terraces, bathrooms or external walls — and recommend a suitable waterproofing approach before any painting is done.',
    ],
    image: '/images/services/waterproofing.jpg',
    imageAlt: 'Waterproof coating being applied to a terrace',
    detailImage: '/images/services/waterproofing-detail.jpg',
    detailImageAlt: 'Terrace surface after a waterproof coating has been applied',
    benefits: [
      { title: 'Source identified first', text: 'We look for the likely cause of the damp before suggesting a treatment.' },
      { title: 'Area-specific solutions', text: 'Terraces, bathrooms and external walls each need different treatments.' },
      { title: 'Protects your paintwork', text: 'Treating damp first helps new paint last instead of bubbling or peeling.' },
      { title: 'Clear explanation', text: 'We explain what each treatment involves so you can decide with confidence.' },
    ],
    preparation: [
      { title: 'Inspect the problem', text: 'Look at damp patches, cracks and drainage to find likely water entry points.' },
      { title: 'Clean and repair', text: 'Remove loose material and repair cracks and joints.' },
      { title: 'Prepare the surface', text: 'Make sure the surface is clean and dry enough for the chosen treatment.' },
      { title: 'Apply waterproofing', text: 'Apply the agreed waterproofing product in the recommended layers.' },
      { title: 'Finish and review', text: 'Allow curing time, then review the treated area with you.' },
    ],
    suitableFor: ['Terraces and roofs', 'Bathrooms and wet areas', 'External walls with damp patches', 'Sunshades and parapet walls'],
    seoDescription:
      'Waterproofing in Chennai for terraces, bathrooms and external walls. Jupiter Decors inspects the source of damp and recommends a suitable treatment.',
  },
  {
    slug: 'texture-painting',
    name: 'Texture Painting',
    icon: Layers,
    summary: 'Textured and designer wall finishes that add depth and character to a feature wall or space.',
    headline: 'Texture painting for walls with character',
    intro: [
      'Texture painting adds depth, pattern and a tactile quality that flat paint cannot. A single textured feature wall can change the feel of a living room, bedroom, entrance or office reception.',
      'We discuss the look you want, show you finish options, and can prepare a small sample area so you can see the texture before the full wall is done.',
    ],
    image: '/images/services/texture-painting.jpg',
    imageAlt: 'Textured feature wall in a living room',
    detailImage: '/images/services/texture-painting-detail.jpg',
    detailImageAlt: 'Close-up of a textured wall finish',
    benefits: [
      { title: 'A focal point', text: 'A textured feature wall draws attention and adds personality to a room.' },
      { title: 'Many finish styles', text: 'From subtle patterns to bolder textures, we help you choose a style that suits the space.' },
      { title: 'Sample before you commit', text: 'A small trial area lets you check the texture and colour first.' },
      { title: 'Works with your interiors', text: 'We consider furniture, lighting and existing colours when suggesting finishes.' },
    ],
    preparation: [
      { title: 'Choose the finish', text: 'Discuss the look you want and agree on a texture style and colour.' },
      { title: 'Prepare the wall', text: 'Repair and level the wall so the texture applies evenly.' },
      { title: 'Base coat', text: 'Apply a suitable base coat for the chosen texture.' },
      { title: 'Apply texture', text: 'Create the texture using the tools and technique for that finish.' },
      { title: 'Seal and review', text: 'Apply top coats where required and review the finished wall with you.' },
    ],
    suitableFor: ['Living room feature walls', 'Bedroom headboard walls', 'Entrances and staircases', 'Office receptions and shops'],
    seoDescription:
      'Texture painting and designer wall finishes in Chennai for feature walls, bedrooms, entrances and offices, from Jupiter Decors.',
  },
];

export const getServiceBySlug = (slug: string | undefined) => services.find((s) => s.slug === slug);
