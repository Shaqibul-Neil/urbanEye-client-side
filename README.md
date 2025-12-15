# URBANi🏢

URBANi is a modern web application designed for **reporting and managing public infrastructure issues**. Citizens can report issues like broken streetlights, potholes, water leakage, garbage overflow, or damaged footpaths. Admins and staff can track, verify, assign, and resolve issues efficiently, ensuring transparency and faster response in municipal services.

✍🏻 **Description**  
URBANi improves civic engagement by providing a centralised platform for citizens to report problems. The system ensures quick updates, allows premium citizens priority support, and keeps a detailed timeline of all actions taken on an issue.

## LIVE LINK <br/>

### Client Side: https://urban-i.netlify.app <br/>

### Server Side: https://urbaneye-server-side.vercel.app <br/>

<hr/>

## URBANi Features 🚀

URBANi is a full-stack public infrastructure issue reporting system. Here are the main features:

- **Role-Based Access:** Admin, Staff, and Citizen dashboards with role-specific permissions.
- **Issue Reporting:** Citizens can submit issues with title, description, photo, and location.
- **Upvote System:** Logged-in users can upvote issues; each user can upvote once. Boosted issues stay above normal issues.
- **Boosted Priority:** Citizens can boost issue priority via payment; boosted issues get higher visibility.
- **Timeline Tracking:** Every issue has a read-only timeline tracking creation, updates, staff assignment, status changes, boosts, and closure.
- **Premium Subscription:** Paid users can report unlimited issues and get priority support.
- **Payment Gateway:** Stripe (for boosting issues & premium subscriptions)
- **Issue Management:** Admin can assign staff, reject issues, and manage users/staff. Staff can update assigned issues, change status, and mark resolved.
- **Real-Time Updates:** React Query ensures UI updates instantly on actions like upvote, status change, or boost.
- **Responsive Design:** Fully responsive layout for mobile, tablet, and desktop.
- **Search & Filtering:** Issues can be searched and filtered by category, status, priority, and location.
- **Booste/Edit/Delete Own Issues:** Citizens can boost, edit or delete their pending issues.
- **Image Uploads:** Upload photos when reporting issues or registering
- **Notifications:** SweetAlert2 and React-Hot-Toast provide feedback for all actions.
- **Charts & Analytics:** Dashboards display stats like total issues, payments, resolved, pending, etc. with interactive Recharts.
- **Payments & Invoice PDF:** Citizens can pay to boost issues or subscribe; admins can view payments and download invoices in PDF.
- **Loader & Skeleton UI:** Shows loader states when fetching data for better UX.
- **Secure Environment:** Firebase & MongoDB secrets are hidden with environment variables.
- **Pagination:** Server-side pagination implemented for All-Issues page.
- **Private Routes:** Users stay logged in across page refresh; unauthorized access blocked.
- **Error Handling:** Friendly 404 pages and notifications for invalid actions.

URBANi ensures a transparent, efficient, and user-friendly system for citizens and municipal staff alike. 💡

## Technologies & Libraries 🛠️

The URBANi project leverages modern frontend tools and libraries to create a responsive, interactive, and performant web application. Here's what we used:

- **Frontend Framework:** React v19
- **Routing:** React Router v7
- **State Management & Effects:** React useState, useEffect, React Hook Form
- **Styling:** TailwindCSS v4, DaisyUI, Google Fonts
- **Payment Gateway:** Stripe
- **Data Fetching & Caching:** TanStack React Query v5
- **HTTP Requests:** Axios
- **Authentication & Database:** Firebase v12, MongoDB (secure with env variables)
- **Icons:** Lucide-React, React-Icons
- **Animations & Sliders:** Lottie-React for animations, Motion (Framer Motion alternative), Swiper.js for carousels and sliders
- **Charts & Analytics:** Recharts
- **Notifications & Toasts:** React-Hot-Toast, SweetAlert2
- **Loaders & Skeletons:** Custom Loader
- **PDF & Table Generation:** @react-pdf/renderer, @ag-media/react-pdf-table
- **Build & Tooling:** Vite with @tailwindcss/vite plugin

<hr/>

## devDependencies

```json
{
  "@eslint/js": "^9.39.1",
  "@types/react": "^19.2.5",
  "@types/react-dom": "^19.2.3",
  "@vitejs/plugin-react": "^5.1.1",
  "eslint": "^9.39.1",
  "eslint-plugin-react-hooks": "^7.0.1",
  "eslint-plugin-react-refresh": "^0.4.24",
  "globals": "^16.5.0",
  "vite": "^7.2.4"
}
```

## Dependencies

```json
{
  "@ag-media/react-pdf-table": "^2.0.3",
  "@react-pdf/renderer": "^4.3.1",
  "@tailwindcss/vite": "^4.1.17",
  "@tanstack/react-query": "^5.90.12",
  "axios": "^1.13.2",
  "daisyui": "^5.5.8",
  "firebase": "^12.6.0",
  "lottie-react": "^2.4.1",
  "lucide-react": "^0.556.0",
  "motion": "^12.23.26",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-hook-form": "^7.68.0",
  "react-hot-toast": "^2.6.0",
  "react-icons": "^5.5.0",
  "react-router": "^7.10.1",
  "react-tabs": "^6.1.0",
  "recharts": "^3.5.1",
  "sweetalert2": "^11.26.3",
  "swiper": "^12.0.3",
  "tailwindcss": "^4.1.17"
}
```

## Getting Started

Follow these steps to get your project up and running:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Shaqibul-Neil/urbanEye-client-side.git
   ```

2. **Navigate to the project folder:**

```
cd your-repository
```

3. **Install dependencies:**

```
npm install
```

4. **Configure environment variables:**
   Create a .env file in the project root and configure any necessary environment variables. For example:

```
VITE_apiKey= YOUR_API_KEY
VITE_authDomain= YOUR_DOMAIN
VITE_projectId= YOUR_PROJECTID
VITE_storageBucket= YOUR_STORAGEBUCKET
VITE_messagingSenderId= YOUR_MESSAGEING_SENDER_ID
VITE_appId= YOUR_APIID
VITE_image_host=IMAGE BB API
```

3. **Run the application:**

```
npm run dev
```

Your application should now be running at http://localhost:5173.

## 👨‍💻 Author

Developed by Shaqibul Neil

## 📄 License

© 2025 Shaqibul Neil
All rights reserved. You may not use, copy, modify, or distribute this project without explicit permission.
