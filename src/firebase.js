// Import Firebase core
import { initializeApp } from "firebase/app";


import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5cZmAcKAdNpNVX7JMScHI_TZ4KmslR1Y",
  authDomain: "synvex-auth.firebaseapp.com",
  projectId: "synvex-auth",
  storageBucket: "synvex-auth.firebasestorage.app",
  messagingSenderId: "596398658222",
  appId: "1:596398658222:web:d3e1ba37550ac2149e933f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth
export const auth = getAuth(app);
