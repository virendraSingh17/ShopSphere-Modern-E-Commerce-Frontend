# 🛒 ShopSphere — Final Year E-Commerce Frontend Project

<div align="center">

### A dynamic React e-commerce experience built for learning, demonstration and portfolio use.

**React.js · Vite · JavaScript · CSS · LocalStorage**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-ShopSphere-7c3aed?style=for-the-badge)](https://shopsphereweb.vercel.app/)

</div>

---

## 📌 Project Overview

ShopSphere is a **final-year-level frontend e-commerce project** created to demonstrate practical knowledge of React development, component-based architecture, client-side routing, state management, responsive UI design and browser persistence.

The application simulates a complete shopping journey — from discovering products and filtering the catalog to managing a wishlist, adding products to a cart, completing a demo checkout and viewing order history.

> **Note:** This is a frontend portfolio/academic project. Payments are simulated and no real transaction is processed.

## ✨ Key Features

- 🔎 Real-time product search
- 🗂️ Category filtering
- 💰 Price range filtering
- ↕️ Multiple sorting options
- 🔥 Trending, deals and top-rated product sections
- 🛍️ Product detail pages with related products
- ❤️ Wishlist with LocalStorage persistence
- 🛒 Shopping cart with quantity and stock controls
- 🔔 Interactive toast notifications
- 👤 Demo account/login flow
- 📦 Demo checkout with delivery and payment-method selection
- 🧾 Persistent order history
- 📊 Interactive admin/dashboard analytics
- 🌙 Dark/light theme
- 📱 Responsive mobile navigation
- 🖼️ Broken-image fallback handling
- ⚡ Loading/skeleton states
- ❌ 404 page and product error handling

## 🧠 Concepts Demonstrated

This project demonstrates practical frontend concepts including:

- React functional components
- React Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`)
- Context API for global state management
- React Router for client-side navigation
- URL search parameters
- Component reusability
- LocalStorage persistence
- Form validation
- Dynamic filtering and sorting
- Responsive CSS
- Error and empty states
- Derived application data and dashboard metrics

## 🛠️ Tech Stack

- **React.js**
- **Vite**
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**
- **React Router**
- **Lucide React**
- **LocalStorage API**

## 📂 Project Structure

```text
ShopSphere/
│
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── Toast.jsx
│   │
│   ├── context/
│   │   └── AppContext.jsx
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── pages/
│   │   ├── Admin.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── Orders.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Products.jsx
│   │   └── Wishlist.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles-modern.css
│
├── index.html
├── package.json
├── vercel.json
└── README.md
```

## ✅ Fixed in This Version

- Dark/light mode now uses the same `data-theme` system as the stylesheet.
- Removed the conflicting legacy stylesheet that was overriding product text colors.
- Product names, prices, original prices, discounts and ratings remain readable in dark mode.
- Trending section headings and product badges remain visible in both themes.
- Product images keep a clean light image surface in dark mode for better product visibility.
- Theme preference is still saved in LocalStorage.
- Broken product images fall back to a placeholder.
- The project uses one active stylesheet to avoid conflicting CSS rules.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/virendraSingh17/shopsphere.git
```

### 2. Open the Project

```bash
cd shopsphere
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

### 5. Create a Production Build

```bash
npm run build
```

### 6. Preview the Production Build

```bash
npm run preview
```

## 💾 Data & Persistence

ShopSphere uses browser **LocalStorage** to persist:

- Shopping cart
- Wishlist
- Demo user account
- Orders
- Theme preference

No backend database is required to run the project.

## 🎓 Why This Is a Final-Year Project

The project goes beyond a static e-commerce UI by implementing multiple connected application flows:

**Product Discovery → Search & Filters → Product Details → Wishlist → Cart → Checkout → Orders → Dashboard**

It also demonstrates reusable components, global state management, client-side routing, persistent browser data, validation, responsive design and error handling.

## 🔮 Future Scope

- Connect a real backend using Node.js and Express
- Add MongoDB or PostgreSQL database integration
- Implement JWT authentication
- Add real payment gateway integration
- Create a real admin product-management system
- Add product reviews and ratings
- Add backend APIs and server-side validation
- Add automated testing
- Deploy frontend and backend independently

## 👨‍💻 Developer

**Virendra Singh**  
BCA Student | Frontend Developer

- GitHub: [@virendraSingh17](https://github.com/virendraSingh17)
- LinkedIn: [Virendra Singh](https://www.linkedin.com/in/virendra-singh/)

---

<div align="center">

### 🛒 ShopSphere

**Learn · Build · Test · Improve**

⭐ Thanks for visiting the project!

</div>
