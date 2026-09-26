# AI Collaboration Log

## ChatGPT

**Prompt:** Explain in plain language why Next.js, TypeScript, Tailwind CSS, and the App Router are a good technology stack for a neighborhood property listing platform. Also explain how accessible HTML and keeping secrets out of the code make the project safer and easier to use.

**Output summary:** ChatGPT explained that Next.js and the App Router provide organized routing and good performance, TypeScript helps prevent coding mistakes, and Tailwind CSS supports fast and consistent styling. It also explained that semantic HTML improves accessibility and that environment variables protect passwords and API keys.

**What I used:** I used the recommendations for Next.js App Router, TypeScript, Tailwind CSS, accessible HTML, and keeping secrets outside the source code.

**What I rejected:** I did not add advanced features such as authentication, maps, payments, or a database because they were outside the starter project’s scope.

**How I verified it:** I created the application locally, ran the development server, checked the page in the browser, and confirmed that the page updated through hot reload.

## Microsoft Copilot

**Prompt:** Act as an App Shell Architect. Create a minimal, production-minded starter architecture for a neighborhood property platform using Next.js App Router, TypeScript, and Tailwind CSS. Include semantic HTML, keyboard accessibility, visible focus states, descriptive links, responsive design, and commands for development, linting, and production builds.

**Output summary:** Microsoft Copilot proposed a Next.js project structure, routes, reusable components, TypeScript data types, accessibility requirements, Tailwind organization, future features, and a verification checklist.

**What I used:** I used the recommendations for Next.js App Router, TypeScript, Tailwind CSS, ESLint, semantic headings, keyboard accessibility, visible focus indicators, descriptive links, responsive design, and the development, lint, and build commands.

**What I rejected:** I rejected the command that used the wrong project name, `neighborhood-property`. I also rejected extra routes and advanced features involving databases, authentication, payments, and maps because they were outside this starter project’s scope. The image guidance containing `alt=""` was inconsistent with its requirement for meaningful descriptions, so I did not rely on that example.

**How I verified it:** I ran the development server, reviewed the page in the browser, tested hot reload, and planned to verify the project with the lint and production build commands.

# Lab 2 AI Collaboration Log

## Google AI Studio — TypeScript Interface Draft

**Date:** September 25, 2026

**Prompt:** Create TypeScript interfaces only for a neighborhood property listing project. Include `Property`, `Sponsor`, `PropertyCardProps`, `SponsorBannerProps`, and `SearchFiltersProps`. Identify required and optional fields and briefly explain why any fields are optional. Do not generate React components or implementation code.

**Output summary:** Google AI Studio suggested interfaces containing property details, sponsor details, image fields, URLs, optional image priority, optional styling classes, and optional search-filter values and callbacks.

**What I used:** I accepted the required `Property` and `Sponsor` fields, including stable IDs, addresses, prices, property facts, image information, and URLs. I also accepted an optional image-priority field for the first above-the-fold property card.

**What I rejected or deferred:** I rejected optional `className` properties because the initial components did not require parent-controlled styling. I deferred the proposed filter callback design until I implemented and reviewed the form behavior.

**How I verified it:** I defined the shared interfaces in `src/types/index.ts`, used them in the components and sample data, and ran `npm run lint`. Lint completed successfully with exit code 0.

**Related commit:** `feat: add shared property and sponsor types`

## ChatGPT — Semantic HTML Critique

**Date:** September 25, 2026

**Prompt:** Review this React component for semantic HTML, WCAG-oriented keyboard access, responsive behavior, and TypeScript safety. Return: issue, why it matters, smallest change, and a manual test. Do not claim compliance from code alone.

**Output summary:** ChatGPT found that `PropertyCard` used an `h2` even though it was inside the `Available properties` section, which already had an `h2`.

**What I used:** I accepted the recommendation to change the property-card title from `h2` to `h3`. This created the logical hierarchy of page `h1`, section `h2`, and card `h3`.

**What I rejected:** No additional semantic changes were required. The component already used an `article`, `address`, facts list, descriptive link, native button, and dynamic image alternative text.

**How I verified it:** I reviewed the homepage heading order and confirmed that each property title is now below the section heading. I also ran lint and manually inspected the page.

**Related commit:** `fix: improve card accessibility and document tests`

## Google AI Studio / Gemini — Accessibility Critique

**Date:** September 25, 2026

**Prompt:** Review this React PropertyCard component for WCAG-oriented keyboard access, accessible names, image alternative text, focus visibility, and TypeScript safety. Return each recommendation using exactly these four parts: issue, why it matters, smallest change, and manual test. Do not claim accessibility compliance from code alone. Do not rewrite the entire component. Clearly say if a part already appears correct and still needs browser testing.

**Output summary:** Gemini reviewed focus-ring contrast, the Favorite toggle’s accessible name and state, image alternative text, native keyboard controls, and number formatting.

**What I used:** I accepted the recommendation to use a darker blue focus ring with a visible offset. I accepted the toggle-button recommendation with a correction: the visible and accessible concept remains `Favorite`, while `aria-pressed` communicates its selected state and a background change supplies visual feedback.

**What I rejected:** I rejected the suggestion to use `alt=""` because the lab requires purposeful, dynamic property-image alternative text. I rejected optional chaining for `price` and `squareFootage` because those values are required numbers in the TypeScript interface. Invalid future API data should be validated before reaching the component.

**How I verified it:** I tested Tab and Shift+Tab navigation, activated controls with Enter and Space, verified the Favorite state change, checked the form error message, and reran Lighthouse. The final Lighthouse accessibility score was 100 with no failed accessibility audits.

**Related commit:** `fix: improve card accessibility and document tests`

## Original Image Decision

The instructor-provided sponsor images were unavailable. I did not download random business logos or copy Realtor listing photographs. I created original SVG placeholder graphics for the property cards and two clearly fictional sample sponsors.

**How I verified it:** I confirmed that the SVG files loaded locally, included meaningful image information, and appeared correctly at 375 px, 768 px, and 1280 px.

**Related commit:** `feat: add sample listing and sponsor data`
