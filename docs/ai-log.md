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