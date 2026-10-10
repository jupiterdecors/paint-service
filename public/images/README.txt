Stock photos are already wired in for every image on the site (see src/data/images.ts).
Until files exist in this folder, the site loads them from Pexels automatically.

To store them here instead (recommended before going live):
    npm run images

To use your own photo, put it in this folder with the same file name. Your file
always takes priority, and `npm run images` never overwrites existing files.

hero.jpg, why-choose-us.jpg, about.jpg
services/<service>.jpg and services/<service>-detail.jpg
projects/<project-id>.jpg  (ids are in src/data/projects.ts)

Project gallery photos are stock samples and keep their "Sample" label until you
replace them with real Jupiter Decors work and set isPlaceholder: false.
