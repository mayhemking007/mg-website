<div align="center">
  <img src="./public/memografter-mark.png" alt="MemoGrafter logo" width="240" />

# MemoGrafter Website

The product website and documentation hub for MemoGrafter — lifecycle-managed memory infrastructure for TypeScript AI agents.

[Explore the docs](https://memografter.com/docs) · [MemoGrafter on GitHub](https://github.com/mayhemking007/memo-grafter) · [npm package](https://www.npmjs.com/package/memo-grafter)
</div>

## About

This repository contains the public-facing MemoGrafter experience: a responsive landing page, interactive product visuals, and an integrated documentation site. It introduces MemoGrafter's approach to structured, versioned memory and shows developers how to add durable recall to their agents.

## Highlights

- Product landing page with interactive memory-lifecycle visuals
- Built-in documentation with navigation, search, and syntax highlighting
- Responsive layouts and accessible UI components
- MemoGrafter Studio previews and TypeScript usage examples
- Optimized metadata, icons, and web-app manifest

## Tech stack

- [Next.js 16](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Shiki](https://shiki.style/) for code highlighting
- [Lucide](https://lucide.dev/) for icons

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm

### Run locally

```bash
git clone https://github.com/mayhemking007/mg-website.git
cd mg-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Documentation is available at [http://localhost:3000/docs](http://localhost:3000/docs).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint across the project |

## Project structure

```text
src/
├── app/          # Routes, layouts, metadata, and global styles
├── components/   # Landing-page and documentation UI
└── lib/          # Documentation content, navigation, and code highlighting
public/           # Static artwork and web-app assets
```

## Contributing

Contributions are welcome. Create a branch for your change, run the lint and build checks, then open a pull request with a clear description of what changed.

```bash
npm run lint
npm run build
```

For the memory library itself, see the [MemoGrafter repository](https://github.com/mayhemking007/memo-grafter).
