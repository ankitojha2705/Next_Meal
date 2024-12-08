# NextMeal Frontend

This repository contains the frontend code for the **Next Meal** application, which connects users to restaurants, allows reservations, helps users with their queries with AI assistant, and provides user authentication via **Keycloak**.

---

## 🛠️ **Features**
- **Keycloak Integration**: Secure authentication and user management.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Dynamic Pages**: User-friendly interface for managing profiles, viewing restaurants, and booking reservations.
- **Modern Frontend Stack**: Built with React, TailwindCSS, and Vite for fast and efficient development.

---

## 🏗️ **Project Structure**
```plaintext
src/
├── assets/       # Images and static assets
├── components/   # Reusable UI components
├── contexts/     # Context API logic
├── pages/        # Application pages (e.g., Home, Profile, Login)
├── store/        # State management
├── App.css       # Global styles
├── App.jsx       # Main app component
├── keycloak.js   # Keycloak setup and configuration
├── main.jsx      # React app entry point

````

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18 or higher  
- **npm**: v8 or higher  
- **Keycloak Server**: Configured backend for authentication  

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/ankitojha2705/Next_Meal.git
   ````
   
### Running the Application
1. Start the development server:
   -      npm run dev

## 🧰 Built With

- **[React](https://reactjs.org/)**: Frontend framework  
- **[TailwindCSS](https://tailwindcss.com/)**: Styling  
- **[Vite](https://vitejs.dev/)**: Fast build tool  
- **[Keycloak](https://www.keycloak.org/)**: Authentication and SSO  
- **[ESLint](https://eslint.org/)**: Linting and code style  


## 📜 Keycloak Configuration

To enable authentication:

1. Configure a client in Keycloak:
   - **Client ID**: `nextmeal-client`
   - **Valid Redirect URIs**: `http://localhost:5173/*`
   - **Web Origins**: `http://localhost:5173`
2. Set environment variables for the Keycloak server in the `keycloak.js` file.

---

## 📝 Scripts

- `npm run dev` - Start the development server  
- `npm run build` - Build the application for production  
- `npm run preview` - Preview the production build  
- `npm run lint` - Lint the project  
- `npm run test` - Run tests  


## 📂 Deployment

### Steps to Deploy:
1. **Build the project**:
   ```bash
   npm run build
   ```

---

## 🎉 Acknowledgments

- Thanks to the **Keycloak** team for the robust authentication solution.  
- Special thanks to **contributors** for enhancing the app functionality.



