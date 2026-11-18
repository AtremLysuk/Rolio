# R.olio — Infused Olive Oil Store

A responsive landing page with a working cart for a small brand of flavoured olive oils.
Built with React, TypeScript and Redux Toolkit, with GSAP animations and smooth scrolling.

**Live demo:** [rolio.vercel.app](https://rolio.vercel.app)

<!-- Screenshots: add files to docs/screenshots and uncomment
![Desktop](docs/screenshots/desktop.png)
![Mobile](docs/screenshots/mobile.png)
-->

> The UI is in Russian. There is no backend — orders and messages are not sent anywhere;
> the site shows a confirmation instead.

## Features

- **Product slider** in the hero section — slides change colour theme with the selected oil
- **Cart** on Redux Toolkit: add, change quantity, remove; total price and item count are
  derived with selectors; the cart is saved to `localStorage` and restored on reload
- **Checkout form** with React Hook Form: validation, two delivery methods
  (Nova Poshta / Ukrposhta) with their own fields, confirmation modal after submit
- **Contact form** in a modal with validation
- **Animations** with GSAP: modal transitions, text reveal on scroll (ScrollTrigger + SplitText),
  quantity counter; smooth scrolling with Lenis
- **Responsive layout** — product grid turns into a Swiper carousel on smaller screens
- **Accessibility:** focus trap and Escape in all modals, labelled form fields with
  announced errors, ARIA attributes for sliders and buttons
- **Optimised images** — all images in WebP (≈4 MB → 0.8 MB)

## Tech stack

| Area | Tools |
|---|---|
| UI | React 19, TypeScript |
| State | Redux Toolkit, React Redux |
| Forms | React Hook Form |
| Animation | GSAP (ScrollTrigger, SplitText), Lenis |
| Slider | Swiper |
| Styles | SCSS, CSS Modules, postcss-pxtorem |
| Accessibility | focus-trap-react |
| Build | Vite, ESLint |
| Hosting | Vercel |

## Getting started

```bash
git clone https://github.com/AtremLysuk/Rolio.git
cd Rolio
npm install
npm run dev
```

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── sections/     # page sections: Hero, Oil, About, Reviews, Delivery, Contacts, Footer
├── components/   # Cart, modals, buttons, icons, skeleton
├── redux/        # store and slices: cart, items, message
├── Hooks/        # typed Redux hooks, Lenis provider, useMatchMedia
└── scss/         # variables, mixins, global styles
public/
├── data.json     # product catalogue
└── images/       # WebP images
scripts/
└── convert-images.mjs   # PNG/JPG → WebP converter (sharp)
```
