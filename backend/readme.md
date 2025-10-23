# Smart Links - Backend

This is the **backend** of the Smart Links project, providing API endpoints for managing links, authentication, and integrations. It is built using **Node.js** and **Express**, with **PostgreSQL** (via **Neon**) as the database.

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Environment Variables](#environment-variables)
* [Getting Started](#getting-started)
* [Available Scripts](#available-scripts)
* [Project Structure](#project-structure)
* [API Endpoints](#api-endpoints)
* [Contributing](#contributing)
* [License](#license)

## Features

* User authentication using JWT
* CRUD operations for links
* Categorization of links
* Integration with Gemini and GROQ APIs
* Secure storage with PostgreSQL (Neon)

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL (Neon) with `pg`
* **Authentication:** JWT
* **External APIs:** Gemini, GROQ

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-jwt-secret>
GEMINI_API_KEY=<your-gemini-api-key>
GROQ_API_KEY=<your-groq-api-key>
PORT=5000
```

## Getting Started

### Prerequisites

* Node.js v20+
* npm or yarn
* PostgreSQL (Neon) database

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd smart-links-backend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create your `.env` file (see above)

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The server should now be running at [http://localhost:5000](http://localhost:5000).

## Available Scripts

The following scripts are available for running and managing the backend:

* `start` – Starts the server:

```bash
npm start
# or
yarn start
```

The server will run using `node index.js`.

* `init:db` – Initializes the database (e.g., creating tables, setting up schema):

```bash
npm run init:db
# or
yarn init:db
```

* `test` – Placeholder for running tests (currently not implemented):

```bash
npm test
# or
yarn test
```

> Note: You can expand the `test` script later when you add actual tests using Jest, Mocha, or another testing framework.


## Project Structure

```
smart-links-backend/
│
├─ src/
│   ├─ controllers/    # Route controllers
│   ├─ routes/         # API routes
│   ├─ models/         # Database models
│   ├─ db/             # Database tables
│   ├─ middleware/     # Middleware (auth)
│   └─ app.js          # Express
├─ index.js            # Entry point
├─ .env
├─ package.json
└─ README.md
```

## API Endpoints

Here are some example endpoints (adjust based on your implementation):

* `POST api/auth/login` – Login user and receive JWT
* `POST api/auth/signup` – Register new user
* `POST api/generate-description` – Generate AI description for site link
* `GET api/site-links` – Fetch all links
* `POST api/site-links` – Create a new link
* `PUT api/site-links/:id` – Update an existing link
* `DELETE api/site-links/:id` – Delete a link

## Authentication

Endpoints that require authentication expect a **JWT stored in a cookie** named `token`.

* When a user logs in, the server sets the `token` cookie.
* Protected routes read the JWT from `req.cookies.token` and verify it using your `JWT_SECRET`.
* If the token is missing, invalid, or expired, the server responds with an error:

  * `401 Unauthorized` – No token provided
  * `403 Forbidden` – Invalid or expired token
