# Arooj Butt: Portfolio

A static portfolio site for Arooj Butt, a growth and performance marketer. It's plain HTML, CSS and JavaScript, with no build step, so it can be hosted on GitHub Pages as is.

## Editing content

All text, numbers, case studies and gallery items live in **`assets/js/content.js`**. After changing CSS or JS, bump the `?v=` number on the three asset links in `index.html` so returning visitors don't get a cached copy. To change anything on the page, edit that file and refresh. You shouldn't need to touch `index.html` or `main.js` for content changes.

- **Case study:** add an object to `cases`. `tags` controls which filter chips show it. `media` takes image slugs or `{ video, poster }` objects.
- **Website or store:** add to `websites` with `name`, `url`, `platform`, `text` and `shots` (image slugs; leave empty for a branded placeholder).
- **Gallery item:** add to `gallery` with `cat` set to `carousel`, `ads`, `branding`, `social`, `personal` or `video`. Carousels take a `slides` array.
- **Images:** each image slug needs two files:
  - `assets/img/full/<slug>.jpg`: about 1600px on the long edge
  - `assets/img/thumb/<slug>.jpg`: about 640px

  On macOS you can make both with:

  ```sh
  sips -s format jpeg -s formatOptions 78 -Z 1600 source.png --out assets/img/full/my-slug.jpg
  sips -s format jpeg -s formatOptions 72 -Z 640  source.png --out assets/img/thumb/my-slug.jpg
  ```
- **Videos:** keep each file well under GitHub's 100 MB limit. Aim for under 25 MB.

## Preview locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a repository (for example `portfolio`) and push this folder to `main`.
2. In the repository, open **Settings → Pages**, set the source to *Deploy from a branch*, and choose `main` / root.
3. The site goes live at `https://<username>.github.io/portfolio/`.

All paths are relative, so the site works at a project URL or on a custom domain. For a custom domain, add a `CNAME` file containing the domain.

## Structure

```
index.html              page shell and section containers
assets/css/style.css    design system (light and dark themes) and components
assets/js/content.js    all content
assets/js/main.js       rendering, filters, case study modal, lightbox, theme
assets/img/full|thumb   optimised images
assets/video            compressed videos and poster frames
```
