
# Project Name :

## PlanMate - Task Management Application

A fully responsive Task Management App where users can add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are organized into To-Do, In Progress, and Done categories, with real-time updates and instant database persistence. The app features a clean, minimalistic UI optimized for both desktop and mobile users, showcasing seamless frontend interactivity, efficient backend data handling, and real-time synchronization. 🚀

#  🌟  Live Site URL
     https://task-manager-b3d83.web.app/
  

## 📦 Dependencies

This project uses the following major dependencies:

| Package                   | Version   | Description                                 |
|---------------------------|-----------|---------------------------------------------|
| [@hello-pangea/dnd](https://www.npmjs.com/package/@hello-pangea/dnd) | ^18.0.1  | Drag-and-drop library for React             |
| [@tailwindcss/vite](https://www.npmjs.com/package/@tailwindcss/vite) | ^4.0.7  | Tailwind CSS integration for Vite           |
| [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query) | ^5.66.8  | Powerful data-fetching library for React    |
| [axios](https://www.npmjs.com/package/axios)                 | ^1.7.9   | Promise-based HTTP client                   |
| [firebase](https://www.npmjs.com/package/firebase)           | ^11.3.1  | Backend-as-a-Service (BaaS) for authentication and database |
| [react](https://www.npmjs.com/package/react)                 | ^19.0.0  | JavaScript library for building user interfaces |
| [react-dom](https://www.npmjs.com/package/react-dom)         | ^19.0.0  | DOM-specific methods for React              |
| [react-hook-form](https://www.npmjs.com/package/react-hook-form) | ^7.54.2 | Performant form management for React        |
| [react-icons](https://www.npmjs.com/package/react-icons)     | ^5.5.0   | Popular icons as React components           |
| [react-router](https://www.npmjs.com/package/react-router)   | ^7.2.0   | Declarative routing for React               |
| [tailwindcss](https://www.npmjs.com/package/tailwindcss)     | ^4.0.7   | Utility-first CSS framework                 |

## 📦 Installation steps

```sh
npm install
```

If using **Yarn**, run:  

```sh
yarn install
```
### **3️⃣ Configure Environment Variables**  
Create a **`.env`** file in the root of the project and add the required credentials:  

```sh
# Firebase Config
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Stripe Config
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Backend API URL
VITE_BACKEND_URL=http://localhost:5000
```

### **4️⃣ Start the Development Server**  
Once dependencies are installed and environment variables are set, start the app:  

```sh
npm run dev
```

> The app should now be running on **http://localhost:5173/** (or as specified in your terminal).  

---

## 🚀 Technologies Used :

 * React.Js 
 * React router
 * Tailwind
 * Daisy UI
 * Express.js 
 * MongoDB