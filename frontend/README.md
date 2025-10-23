# Smart Links - Frontend

This is the **frontend** of the Smart Links project, a web application built using **Next.js 16** and **styled-components** for a modern, responsive, and maintainable interface.

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Available Scripts](#available-scripts)
* [Project Structure](#project-structure)

## Features

* Add, edit, and delete links
* Categorize links for easy access
* Responsive design for desktop and mobile
* Smooth navigation and interactive UI components
* Authentication

## Tech Stack

* **Framework:** Next.js 16
* **Styling:** styled-components
* **Language:** TypeScript
* **State Management:** Redux Toolkit
* **Routing:** Next.js built-in router

## Getting Started

Follow these steps to run the project locally:

### Prerequisites

* Node.js v20+
* npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <>
cd smart-links-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file for environment variables:

```env
NEXT_PUBLIC_BASE_URL=<your-backend-api-url>
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The app should now be running at [http://localhost:3000](http://localhost:3000).

## Available Scripts

* `dev` – Runs the app in development mode
* `build` – Builds the app for production
* `start` – Starts the production server
* `lint` – Runs linter (if configured)

## Project Structure

```
smart-links-frontend/
│
├─ pages/           # Next.js pages
├─ components/      # Reusable UI components
├─ store/           # Redux store
├─ types            # TypeScript types
├─ public/          # Static assets
└─ package.json
```
