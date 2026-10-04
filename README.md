# Abdul Wahab Baig — Portfolio

A responsive, buildless portfolio, with original styling and résumé-based content.

## Local preview

```sh
python3 -m http.server 4173 --directory dist
```

Visit http://localhost:4173. No package installation or build is required.

## Edit

- `dist/index.html`: sections, résumé link, and project showcases.
- `dist/style.css`: typography, colors, layout, mobile breakpoints, and reduced-motion support.
- `dist/culture.js`: the hand-guided Sindhi welcome animation, replay, and reduced-motion final pose.
- `dist/app.js`: project detail content, mobile navigation, active sections, and email copying.
- `dist/Abdul-Wahab-Baig-CV.pdf`: downloadable source résumé.

Project images live in `dist/images/projects/` as optimized WebP assets. GOZOLT Go and GOZOLT Drivers have separate cards and galleries. Animates includes anime interests, preference matching, chat, profiles, and subscription screens. Green Streak uses the supplied wide app showcase. LikeIt and GupZar retain animated phone frames; supplied artwork with existing phone mockups is displayed directly. Galleries support previous/next controls, keyboard arrows, and full-size links. Single-image galleries disable navigation. Experience and contributions are based on the supplied CV; newer product descriptions reflect user-provided details and visible screens without invented metrics. External Google Fonts have local font fallbacks. The contact link opens the visitor's email client; no contact information is stored.

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

## Hero animation

The original SVG characters share an Ajrak and Sindhi Topi over a 22-second, single-play sequence. Hands and accessories use shared coordinates throughout the dressing gestures. The scene holds its final pose; visitors can replay it. Reduced-motion preferences show the dressed final pose immediately, and hidden tabs pause the timeline. Ajrak uses crimson, indigo, and cream geometry; the embroidered Topi includes its characteristic front cutout.

Cultural visual reference: [Sindhi Topi and Ajrak — Sindhi Association of Metropolitan Chicago](https://www.chicagosindhis.com/2022/04/11/sindhi-topi-and-ajrak/).
