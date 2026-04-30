# TierListr Website

Static marketing website for TierListr, built for GitHub Pages with no build step.

## Stack

- HTML
- CSS
- Vanilla JavaScript
- Static image and SVG assets

## Pages

- `/` homepage
- `/privacy/` privacy policy
- `/terms/` terms
- `/support/` support page
- `/404.html` custom not found page

## Project structure

```text
/
|-- index.html
|-- privacy/index.html
|-- terms/index.html
|-- support/index.html
|-- 404.html
|-- app-ads.txt
|-- robots.txt
|-- sitemap.xml
|-- assets/
|   |-- animations/
|   |-- brand/
|   |-- css/
|   |-- images/
|   |-- js/
|   `-- marketing/
|-- .nojekyll
`-- README.md
```

## Local development

Run a simple local server from the repository root:

```bash
python3 -m http.server 4321
```

Then open [http://localhost:4321](http://localhost:4321).

## Editing

There is no build step for this project.

- Edit HTML, CSS, text, and assets directly.
- The repository root is the deployable output.
- `.nojekyll` is included for GitHub Pages compatibility.

## Deployment

Deploy with GitHub Pages from the repository root:

1. Push the site to a GitHub repository.
2. Open the repository on GitHub.
3. Go to `Settings` -> `Pages`.
4. Choose `Deploy from a branch`.
5. Select `main` and `/ (root)`.
6. Save and wait for the site to publish.

## First push

If you are starting from this local folder:

```bash
git add .
git commit -m "Initial TierListr website"
git remote add origin <your-github-repo-url>
git push -u origin main
```
