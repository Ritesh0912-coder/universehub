# UniverseHub

**UniverseHub** is a next-generation space exploration platform that aggregates real-time space news, tracks global rocket launches, and provides immersive 3D solar system visualizations. Built with the latest modern web technologies, it offers a premium, glassmorphism-inspired interface for space enthusiasts.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan)

## 🚀 Key Features

### 🌌 Space News Aggregator
- **Real-time Updates**: Automatically fetches and deduplicates the latest articles from multiple space news sources.
- **Smart Filtering**: Removes blacklisted or irrelevant content to ensure high-quality news feeds.
- **Archives**: Browse past articles to catch up on history.
- **Interactive Grid**: Beautiful glass-card layout with high-quality thumbnails.

### 🌍 Immersive 3D Visualizations
- **Interactive Earth**: High-fidelity 3D Earth model with atmospheric scattering, day/night cycles, and cloud layers using `Three.js` and `React Three Fiber`.
- **Solar System Exploration**: Navigate through planets with realistic textures and physics integration.
- **Particle Effects**: Dynamic star fields and particle backgrounds for a deep-space atmosphere.

### 🚀 Launch Tracker
- **Global Schedule**: Track upcoming rocket launches from SpaceX, NASA, ESA, review mission details, and watch live streams.
- **Countdown Timers**: Precision countdowns to the next big launch.

### 🖼️ Digital Gallery
- **APOD Integration**: Daily "Astronomy Picture of the Day" from NASA.
- **Curated Collections**: High-resolution space photography sourced from Unsplash and other premium providers.

### 👤 User System & Admin
- **Authentication**: Secure login/signup via NextAuth (Email/Password & Google).
- **Dashboard**: User profile management and saved favorites (News/Missions).
- **Admin Panel**: customized CMS to manage news, blacklist articles, and view system logs.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Database**: [MongoDB](https://www.mongodb.com/) (via [Prisma ORM](https://www.prisma.io/))
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)

---

## ⚙️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js 18+ installed
- MongoDB Database (Local or Atlas)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/universe-hub.git
    cd universe-hub
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    bun install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory based on `.env.example`:
    ```env
    # Database
    DATABASE_URL="mongodb+srv://..."

    # Auth
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="your-super-secret-key"

4.  **Database Setup**
    Push the schema to your MongoDB instance:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run Development Server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📂 Project Structure

```bash
├── src/
│   ├── app/             # Application routes (Next.js App Router)
│   ├── components/      # Reusable UI components (Glass cards, 3D models)
│   ├── lib/             # Utility functions, API clients (NASA, SpaceX)
│   └── types/           # TypeScript definitions
├── public/              # Static assets (images, fonts)
├── prisma/              # Database schema
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📄 License

This project is open-sourced under the MIT License.
