# Challenge App

A modern Next.js app with Chakra UI, user onboarding, persistent profile, and live data from multiple GraphQL APIs.

---

## ✨ Key Features

- **User Onboarding Modal**: Collects username and job title, blocks app until completed.
- **Persistent User Data**: Stores user info in localStorage, editable in profile.
- **Profile Page**: Edit user info, reset data with double-confirmation dialog.
- **Information Page**: Paginated list of Rick & Morty characters (GraphQL, deep-linking).
- **React Finland Page**: Live conference/session data from the React Finland GraphQL API.
- **Reusable Components**: Cards, modals, navigation, sticky header/footer.
- **Chakra UI**: Modern, accessible design system.
- **Prettier**: Enforced code formatting.
- **CSS Modules**: Scoped, maintainable styles for each page/component.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

### 3. Format code with Prettier
```bash
npm run format
```

### 4. Lint code
```bash
npm run lint
```

---

## 🗂️ Project Structure

```
challenge/
├── public/                  # Static assets (SVGs, favicon, etc.)
├── src/
│   ├── app/                 # Next.js app directory (routing, pages, layout)
│   │   ├── information/     # Information page (paginated, GraphQL)
│   │   ├── profile/         # Profile page (edit user info)
│   │   ├── react-finland/   # React Finland conference data page
│   │   ├── layout.tsx       # App layout
│   │   ├── page.tsx         # Dashboard/home
│   │   └── providers.tsx    # ChakraProvider and other providers
│   ├── components/          # Reusable UI components (cards, modals, nav, etc.)
│   ├── graphql/
│   │   └── queries/         # Centralized GraphQL queries (Rick & Morty, AniList, React Finland)
│   ├── lib/                 # API clients, localStorage utils
│   └── types/               # TypeScript types
├── package.json
├── .prettierrc              # Prettier config
├── .prettierignore
├── tsconfig.json
└── README.md
```

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)

---

## 🤝 Contributing

1. Fork the repo and create your branch from `main`.
2. Make your changes and commit with clear messages.
3. Run `npm run format` and `npm run lint` before pushing.
4. Open a Pull Request.

---

## 📄 License

MIT

---

## 📢 Notes

- Uses live data from [Rick & Morty GraphQL API](https://rickandmortyapi.com/graphql) and [React Finland GraphQL API](https://api.react-finland.fi/graphql).
- To reset onboarding, clear localStorage or use the "Reset User Data" button on the profile page.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Challenge
