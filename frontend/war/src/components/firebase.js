// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAgYBL9q0ELW0fvY2DBx2onGxkyRHjfguU",
    authDomain: "pictureswar-563b6.firebaseapp.com",
    projectId: "pictureswar-563b6",
    storageBucket: "pictureswar-563b6.appspot.com",
    messagingSenderId: "441215289485",
    appId: "1:441215289485:web:23189f78e283afdfdd3ac4"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
