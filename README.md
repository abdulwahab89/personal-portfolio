# Abdul Wahab Baig — Portfolio

A responsive, buildless portfolio inspired by awrs.me, with original styling and résumé-based content.

## Local preview

```sh
python3 -m http.server 4173 --directory dist
```

Visit http://localhost:4173. No package installation or build is required.

## Edit

- `dist/index.html`: sections, résumé link, and project illustrations.
- `dist/style.css`: typography, colors, layout, mobile breakpoints, and reduced-motion support.
- `dist/app.js`: project detail content, mobile navigation, active sections, and email copying.
- `dist/Abdul-Wahab-Baig-CV.pdf`: downloadable source résumé.

Project illustrations are original CSS concepts, not screenshots of production apps. Experience and contributions are based on the supplied CV. External Google Fonts have local font fallbacks. The contact link opens the visitor's email client; no contact information is stored.

## Continuous deployment to Netlify

`.github/workflows/deploy.yml` validates the site and deploys `dist/` to
https://wahabdev.netlify.app whenever code is pushed to `main`. It also supports
manual runs from GitHub Actions, restricted to `main`.

To activate:

1. Push this repository (including `.github/workflows/deploy.yml`) to GitHub.
2. Add a GitHub Actions repository secret named `NETLIFY_AUTH_TOKEN` containing
   a Netlify personal access token authorized to deploy this project. Never
   commit the token or paste it into chat.
3. Push to `main` and verify the **Deploy portfolio to Netlify** workflow succeeds.

The existing Netlify project ID is configured in the workflow. Deployments are
serialized to avoid overlapping production uploads. GitHub environment approval
rules, if configured for `production`, may require approval before a run deploys.
Do not enable a second Netlify Git deployment integration alongside this workflow.
