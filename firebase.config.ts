import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDrBA0xEg0ev5NuhWl-OmCtZYYEbUkDeRo",
    authDomain: "cs125-proj.firebaseapp.com",
    projectId: "cs125-proj",
    storageBucket: "cs125-proj.appspot.com",
    messagingSenderId: "497960266909",
    appId: "1:497960266909:web:2e142b6ef3dc028645f874"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  export default app;