# React API Data Fetch & UI Replication Task
### Project Overview

This project is a React-based web application built as part of a company assignment.
The objective is to fetch data from a provided API endpoint and replicate a given reference UI layout using React and Tailwind CSS (or any other modern styling approach).

### Task Requirements

- Fetch and parse data from the provided API endpoint.

- Display the fetched data by replicating the layout and design from the given reference UI.

- Maintain a clean, modular folder structure with reusable components.

- Ensure the page is responsive and visually matches the provided design.

🧩 Tech Stack

- React (Vite) – Frontend framework

-Tailwind CSS – Styling and responsiveness

- Fetch / Axios – API data fetching

- JavaScript (ES6+) – Logic and interactivity

📁 Folder Structure
   ```
task-project/
│
├── public/                      # Static assets
├── src/
│   ├── assets/                  # Images, icons, etc.
│   ├── Components/              # Reusable components
│   │   ├── Cart.jsx
│   │   ├── Filters.jsx
│   │   ├── MenuItem.jsx
│   │   └── RestaurantCard.jsx
│   ├── pages/                   # Page-level components
│   │   └── Home.jsx
│   ├── App.jsx                  # Root component
│   ├── main.jsx                 # Entry point
│   ├── App.css                  # Global CSS
│   ├── index.css                # Tailwind setup
│
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```
⚙️ Installation & Setup
1️⃣ Clone the Repository
```
git clone https://github.com/Fahimraj12/Task-Demo.git
cd Task-Demo
```
2️⃣ Install Dependencies
```
npm install
```
3️⃣ Run the Development Server
```
npm run dev
```

- Now open http://localhost:5173/ in your browser.

🌐 API Integration

- Endpoint: <insert provided API endpoint here>

- Fetch the data using:
```
useEffect(() => {
  fetch("<API_URL>")
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.error("Error fetching data:", err));
}, []);
```

- Render the fetched results dynamically using reusable components.

### Components Overview
-Component	Description
```
RestaurantCard.jsx	Displays restaurant name, image, rating, cuisine, and location
MenuItem.jsx	Renders individual food items from API data
Filters.jsx	Handles filtering or sorting logic
Cart.jsx	Manages cart items (if applicable)
Home.jsx	Main page displaying fetched data and UI layout
```
### 👨‍💻 Author
- [Mo Fahim Raj](https://www.linkedin.com/in/mo-fahim-raj-175b9b304/)
- 📧 [mofahimraj@gmail.com]
- 🔗 [GitHub Profile](https://github.com/Fahimraj12)
