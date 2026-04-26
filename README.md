# Travel Blog - Share Your Journey

A full-stack React web application that allows users to share their travel experiences, discover new places, and interact with other travelers. 

## Features

* **User Authentication:** Secure sign-up and login process.
* **Create & Edit Posts:** Users can publish travel stories with images, locations, and descriptions.
* **Interactive Feed:** Hover effect on a post with a travel destination image.
* **Live Search & Filtering:** Instantly search destinations by city or country.
* **Dark/Light Theme:** Fully integrated theme toggling for better UX.
* **Responsive Design:** Optimized for both desktop and mobile devices.

## Tech Stack

* **Frontend:** React 18, React Router v6
* **State Management:** Redux Toolkit (RTK), RTK Query for data fetching & caching
* **Styling & UI:** Material UI (MUI), CSS Modules
* **Backend & Database:** Firebase Authentication, Cloud Firestore
* **Forms & Validation:** React Hook Form, Yup
* **Build Tool:** Vite

## Architecture

This project follows the **Feature-Sliced Design (FSD)** architectural methodology to ensure code modularity, scalability, and maintainability:
* `app/` - Global routing, theme providers, and main layout.
* `pages/` - Routable page components.
* `widgets/` - Independent composition blocks (Header, Footer, PostList).
* `features/` - User interactions that bring business value (Search, Authentication).
* `entities/` - Business entities (User, Post).
* `shared/` - Reusable components, UI kits, and utility functions.

## Performance Optimizations

* **Lazy Loading:** Implemented Route-based code splitting using `React.lazy` and `Suspense` to reduce the initial bundle size.
* **Image Optimization:** Implemented lazy loading for images.

https://github.com/DmitriyBihun