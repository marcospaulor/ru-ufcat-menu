# RU Menu Management System - UFCAT Services

[![GitHub stars](https://img.shields.io/github/stars/marcospaulor/ru-ufcat-menu)](https://github.com/marcospaulor/ru-ufcat-menu/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/marcospaulor/ru-ufcat-menu)](https://github.com/marcospaulor/ru-ufcat-menu/issues)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

The **RU Menu Management System - UFCAT Services** is a web application designed to manage the menu of the University Restaurant (RU) at Universidade Federal de Catalão (UFCAT). Built with **Next.js** and **Firebase**, it enables menu updates and displays community feedback, seamlessly integrating with the **UFCAT Services** mobile app (developed with **Flutter** and **Firebase**). This project promotes transparency and engagement in UFCAT’s nutritional management.

---

## 🚀 Features

- Dynamic updates to the RU menu.
- Visualization of community feedback and evaluations.
- Integration with the UFCAT Services mobile app via Firebase.
- Intuitive and responsive interface for administrators.

---

## 🛠️ Technologies

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Firebase (Firestore, Authentication)
- **Styling**: Tailwind CSS
- **Tools**: Conventional Commits, ESLint, Prettier

---

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or Yarn
- Firebase account (for backend configuration)
- Git

---

## ⚙️ Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/marcospaulor/ru-ufcat-menu.git
   cd ru-ufcat-menu
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Firebase**:
   - Create a project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore and Authentication.
   - Copy the Firebase credentials and add them to a `.env.local` file:
     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🚀 Deployment

1. **Build the Application**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   - Use platforms like Vercel, Netlify, or Firebase Hosting.
   - Example for Vercel:
     ```bash
     vercel
     ```

---

## 📂 Project Structure

```
ru-ufcat-menu/
├── src/
│   ├── app/
│   │   ├── components/         # React components
│   │   │   ├── MenuForm.tsx    # Form for updating menus
│   │   │   ├── FeedbackList.tsx # List of feedback entries
│   │   ├── hooks/             # Custom hooks
│   │   │   ├── useMenu.ts     # Hook for menu management
│   │   │   ├── useFeedback.ts # Hook for feedback management
│   │   ├── interfaces/        # TypeScript interfaces
│   │   │   ├── IMenu.ts       # Interface for menus
│   │   │   ├── IFeedback.ts   # Interface for feedback
│   ├── pages/                 # Next.js pages
│   ├── public/                # Static assets
│   ├── styles/                # Global styles (e.g., Tailwind CSS)
├── .env.local                 # Environment variables
├── README.md                  # Project documentation
```

### Adding Components
- Create components in `src/app/components/`.
- Define properties with TypeScript:
  ```typescript
  export interface MenuFormProps {
    onSubmit: (data: IMenu) => void;
  }
  ```

### Adding Hooks
- Create hooks in `src/app/hooks/`.
- Example:
  ```typescript
  export interface UseMenuReturn {
    menus: IMenu[];
    addMenu: (menu: IMenu) => void;
  }
  ```

### Adding Interfaces
- Create interfaces in `src/app/interfaces/`.
- Each interface maps an entity or API route:
  ```typescript
  export interface IMenu {
    id: string;
    date: string;
    items: string[];
  }
  ```

---

## 📝 Conventional Commits

Follow the **Conventional Commits** standard for commit messages:

- `feat`: New features.
- `fix`: Bug fixes.
- `refactor`: Code refactoring.
- `style`: Styling changes (e.g., CSS).
- `test`: Adding tests.
- `docs`: Documentation updates.
- `chore`: Miscellaneous tasks not affecting code.

Example:
```bash
git commit -m "feat: add menu update form"
```

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/new-feature`).
3. Commit your changes using Conventional Commits.
4. Submit a pull request.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

For questions or suggestions, open an [issue](https://github.com/marcospaulor/ru-ufcat-menu/issues) or contact [dev.silva.marcos@gmail.com](mailto:dev.silva.marcos@gmail.com).

---

⭐ **Enjoying the project? Give it a star on GitHub!**
