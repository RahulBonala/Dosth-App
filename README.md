# Dosth — Your Friend, Your Guide

An all-in-one urban services app for repairs, donations, and community support. Built as a mobile-first progressive web experience targeting urban India.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: CSS Modules + CSS Custom Properties (dark/light theme)
- **Fonts**: Google Fonts via `next/font` (Syne, DM Sans, JetBrains Mono)
- **Package Manager**: npm

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.js         # Root layout (fonts, metadata, theme script)
│   ├── page.js           # Landing page
│   ├── login/            # Phone OTP / email login
│   ├── signup/           # User registration
│   ├── repair/           # Service catalog, booking, payment, status
│   ├── donate/           # Donation form + NGO partners
│   ├── notifications/    # Notification feed
│   └── profile/          # User profile
├── components/
│   ├── layout/           # Header, Footer, BottomNav
│   └── ui/               # Button, Input, Avatar, Badge, Skeleton, Toast, ThemeToggle
├── hooks/                # useTheme, useToast
└── styles/               # globals.css, variables.css, animations.css
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm 9+

### Installation

```bash
git clone https://github.com/RahulBonala/Dosth-App.git
cd Dosth-App
npm install
```

### Environment Variables

Copy the example file and fill in values as needed:

```bash
cp .env.example .env.local
```

See `.env.example` for all available variables.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script            | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start development server           |
| `npm run build`   | Create production build            |
| `npm run start`   | Start production server            |
| `npm run lint`    | Run ESLint                         |
| `npm run lint:fix`| Run ESLint with auto-fix           |
| `npm run format`  | Format code with Prettier          |
| `npm run format:check` | Check formatting without changes |

## Deployment

This app is optimized for [Vercel](https://vercel.com/). Push to your GitHub repo and import it in the Vercel dashboard — zero-config deployment.

For other platforms, build and start the production server:

```bash
npm run build
npm run start
```

## Future Roadmap

- Real backend API integration (auth, database, payments)
- Error tracking with Sentry
- CI/CD pipeline via GitHub Actions
- End-to-end testing with Playwright
- PWA support with offline capabilities

## License

Private — All rights reserved.
