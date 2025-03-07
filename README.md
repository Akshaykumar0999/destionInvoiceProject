# Ecommerce Inventory

A React-based inventory management system for eCommerce businesses, allowing users to manage invoices, track orders, and view transaction details efficiently.

## 🚀 Features

- 📄 **Invoice Management** – Create, store, and manage invoices easily.
- 📊 **Order Tracking** – Track orders with details like item name, quantity, price, and tax.
- 🔍 **Search & Filter** – Search invoices by date and item name.
- 📈 **Dynamic Totals** – Auto-calculates total price, including tax.
- 💻 **Responsive UI** – Built with Bootstrap for a mobile-friendly experience.
- 🔗 **API Integration** – Uses Axios to fetch and update invoices from a mock API.

## 🛠️ Tech Stack

- **React.js** – Frontend framework for building UI components.
- **React Router** – Manages navigation and routing.
- **Bootstrap** – Provides a clean and responsive UI design.
- **React Icons** – Used for UI enhancements and icons.
- **Axios** – Handles API requests and data fetching.

## 📌 Installation & Setup

Follow these steps to set up the project locally:

```sh
# Clone the repository
git clone https://github.com/your-username/ecommerce-inventory.git

# Navigate to the project directory
cd ecommerce-inventory

# Install dependencies
npm install

# Start the development server
npm start
```

The app will run on `http://localhost:3000/`.

## 📂 Project Structure

```
📦 ecommerce-inventory
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 InvoiceList.js
 ┃ ┃ ┣ 📜 InvoiceDetails.js
 ┃ ┃ ┗ 📜 Navbar.js
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 Home.js
 ┃ ┃ ┗ 📜 NotFound.js
 ┃ ┣ 📜 App.js
 ┃ ┣ 📜 index.js
 ┗ 📜 package.json
```

## 🛠️ API Endpoints

The project uses a mock API for handling invoice data:

- **GET** `/invoices` – Fetch all invoices.
- **POST** `/invoices` – Add a new invoice.

Example API URL: `https://mock-apis-wjjq.onrender.com/invoices`

## 🚀 Contribution Guide

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m "Added new feature"`
4. Push changes: `git push origin feature-name`
5. Open a pull request.

## 📜 License

This project is licensed under the **MIT License**.

---


