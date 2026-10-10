/**
 * Stock photos for every image slot on the site (free Pexels licence:
 * free for commercial use, no attribution required — https://www.pexels.com/license/).
 *
 * How it works: each component still points at its local file, e.g.
 * /images/hero.jpg. If that file is not in /public yet, SmartImage loads the
 * matching Pexels photo below instead. Run `npm run images` once to download
 * all of them into /public/images so the site serves them itself (faster,
 * and nothing depends on Pexels staying online).
 *
 * To use your own photo: drop it into /public/images with the same file name.
 * The local file always wins. You can then delete its line here.
 */
const pexels = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

export const stockImages: Record<string, { url: string; credit: string }> = {
  // Page-level images
  '/images/hero.jpg': { url: pexels(7218579), credit: 'Blue Bird / Pexels' },
  '/images/why-choose-us.jpg': { url: pexels(7217973), credit: 'Blue Bird / Pexels' },
  '/images/about.jpg': { url: pexels(5493664), credit: 'Anthony Shkraba / Pexels' },

  // Services
  '/images/services/interior-painting.jpg': { url: pexels(6782438), credit: 'Artem Podrez (artbovich) / Pexels' },
  '/images/services/interior-painting-detail.jpg': { url: pexels(5583116), credit: 'Polina Tankilevitch / Pexels' },
  '/images/services/exterior-painting.jpg': { url: pexels(18078684), credit: 'cmrcn / Pexels' },
  '/images/services/exterior-painting-detail.jpg': { url: pexels(23417421), credit: 'withoguz / Pexels' },
  '/images/services/new-house-painting.jpg': { url: pexels(6899345), credit: 'artbovich / Pexels' },
  '/images/services/new-house-painting-detail.jpg': { url: pexels(6474483), credit: 'Tima Miroshnichenko / Pexels' },
  '/images/services/repainting.jpg': { url: pexels(5691677), credit: 'Ksenia Chernaya / Pexels' },
  '/images/services/repainting-detail.jpg': { url: pexels(5691692), credit: 'Ksenia Chernaya / Pexels' },
  '/images/services/waterproofing.jpg': { url: pexels(38510750), credit: 'Pexels' },
  '/images/services/waterproofing-detail.jpg': { url: pexels(38510730), credit: 'Pexels' },
  '/images/services/texture-painting.jpg': { url: pexels(6764282), credit: 'Pavel Danilyuk / Pexels' },
  '/images/services/texture-painting-detail.jpg': { url: pexels(5799059), credit: 'Ivan S / Pexels' },

  // Project gallery (sample entries until real project photos are added)
  '/images/projects/interior-living-room.jpg': { url: pexels(6758778), credit: 'artbovich / Pexels' },
  '/images/projects/exterior-house.jpg': { url: pexels(12081268), credit: 'Ari Ansyari / Pexels' },
  '/images/projects/texture-feature-wall.jpg': { url: pexels(6764289), credit: 'Pavel Danilyuk / Pexels' },
  '/images/projects/repaint-bedroom.jpg': { url: pexels(6474491), credit: 'Tima Miroshnichenko / Pexels' },
  '/images/projects/waterproofing-terrace.jpg': { url: pexels(38510748), credit: 'Pexels' },
  '/images/projects/interior-kitchen.jpg': { url: pexels(6782436), credit: 'artbovich / Pexels' },
  '/images/projects/exterior-apartment.jpg': { url: pexels(12359215), credit: 'Abdullah Asad / Pexels' },
  '/images/projects/texture-entrance.jpg': { url: pexels(5799050), credit: 'Ivan S / Pexels' },
  '/images/projects/repaint-office.jpg': { url: pexels(7218001), credit: 'Blue Bird / Pexels' },
  '/images/projects/waterproofing-bathroom.jpg': { url: pexels(38510734), credit: 'Pexels' },
};

/** Remote stand-in for a local image path, if one is configured. */
export const stockFallback = (src: string) => stockImages[src]?.url;
