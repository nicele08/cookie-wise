# Cookie-wise 🍪

A modern, accessible cookie consent banner for Next.js applications. Built with NextUI and TypeScript, featuring dark mode support and granular cookie preference controls.

## Demo

Check out the live demo at [cookie-wise.vercel.app](https://cookie-wise.vercel.app/)


## Features

- 🎨 Beautiful UI with NextUI components
- 🌓 Dark mode support
- 🔒 Privacy-focused with granular cookie controls
- ♿ Fully accessible (WCAG compliant)
- 📱 Responsive design
- 🔄 Server-side cookie persistence
- 🌐 Ready for production use

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.18 or later
- npm

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/nicele08/cookie-wise.git
cd cookie-wise
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dependencies

Main dependencies used in this project:

- `next` - The React framework
- `@nextui-org/react` - UI component library
- `next-themes` - Dark mode support
- `framer-motion` - Animations
- `next-client-cookies` - Cookie management
- `typescript` - Type safety

## Configuration

### Tailwind CSS

The project uses Tailwind CSS with NextUI configuration. Here's the basic setup in `tailwind.config.ts`:

```js
import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;

```

### NextUI Theme

The app uses NextUI's theming system. You can customize the theme in `app/providers.tsx`:

```tsx
<NextUIProvider>
  <NextThemesProvider attribute="class" defaultTheme="dark">
    {children}
  </NextThemesProvider>
</NextUIProvider>
```

## Usage

Import and use the CookieConsentBanner component in your app:

```tsx
import CookieConsentBanner from "@/components/CookieConsentBanner";

// In your layout or page:
export default function Layout({ children }) {
  return (
    <>
      {children}
      <CookieConsentBanner />
    </>
  );
}
```

## Cookie Categories

The banner supports four categories of cookies:

1. Necessary - Essential for website functionality
2. Functional - Remember user preferences
3. Analytics - Track website usage
4. Marketing - Personalized advertisements

## Development

### Running Tests

```bash
npm run test
# or
yarn test
# or
pnpm test
```

### Linting

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [NextUI](https://nextui.org/)
- Dark mode support from [next-themes](https://github.com/pacocoursey/next-themes)

## Support

If you have any questions or need help integrating the component, please [open an issue](https://github.com/nicele08/cookie-wise/issues).
