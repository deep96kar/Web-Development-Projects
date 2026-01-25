# Linktree Clone (Next.js + MongoDB)

This is a Linktree-clone style project built with Next.js (App Router) and MongoDB.

## How this project was started (using `npx`)

This project was bootstrapped using Next.js’s scaffolding tool:

```bash
npx create-next-app@latest
```

What this command does:

- `npx` downloads and runs a package temporarily (no global install needed).
- `create-next-app` generates a new Next.js project structure (folders + config files) and sets up `package.json`.
- It then installs dependencies inside the created project folder.

## Packages installed

From `package.json`:

**Dependencies**

- `next` (Next.js framework)
- `react`, `react-dom` (React runtime)
- `mongodb` (MongoDB driver)
- `react-toastify` (toast notifications)

**Dev Dependencies**

- `tailwindcss`, `@tailwindcss/postcss` (styling)
- `eslint`, `eslint-config-next` (linting)

## Environment setup (.env.local is required)

Create a file named `.env.local` in the project root and add your MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017
NEXT_PUBLIC_HOST=http://localhost:3000
```

Note: `lib/mongodb.js` throws an error if `MONGODB_URI` is missing.

## Run locally

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Open http://localhost:3000

## Useful scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
