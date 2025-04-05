'use client';

import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, onMessage, getToken as getTokenGlobal } from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQeGmCNjfDCq8H3bIu15GVbI2jqW_5lBM",
  authDomain: "public-website-sukoon.firebaseapp.com",
  projectId: "public-website-sukoon",
  storageBucket: "public-website-sukoon.appspot.com",
  messagingSenderId: "1068844616462",
  appId: "1:1068844616462:web:648664263f5855412e255f",
  measurementId: "G-6FZ8Y7KBSS",
};

const collectionName = 'public_website_content';

// Initialize Firebase app
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Firebase services
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
let analytics:any = {}
let messaging:any = {}

try {
  analytics = typeof window !== "undefined" ? getAnalytics(firebaseApp) : null;
  messaging = typeof window !== "undefined" ? getMessaging(firebaseApp) : null;
} catch (error) {
  
}


/**
 * Get FCM Token for messaging
 * @param {Function} setTokenFound - Callback to update token found status
 * @returns {Promise<void>}
 */
const getToken = async (setTokenFound:any) => {
  if (!messaging) {
    console.warn("Firebase Messaging is not initialized.");
    return;
  }

  try {
    const currentToken = await getTokenGlobal(messaging, { vapidKey: 'GENERATED_MESSAGING_KEY' });
    if (currentToken) {
      setTokenFound(true);
      console.log("FCM Token:", currentToken);
    } else {
      setTokenFound(false);
      console.warn("No registration token available. Request permission to generate one.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving token:", error);
    setTokenFound(false);
  }
};

/**
 * Write data to Firestore
 * @param {string} key - Document key
 * @param {Object} obj - Data object
 * @returns {Promise<void>}
 */
const write_data_to_firebase = async (key:string, obj:any) => {
  try {
    const docRef = doc(db, collectionName, key);
    await setDoc(docRef, obj);
    // console.log("Document written with key:", key);
  } catch (error) {
    console.error("Error adding document:", error);
  }
};

/**
 * Get data from Firestore
 * @param {string} doc_name - Document name
 * @returns {Promise<Object|null>} - Document data or null if not found
 */
const get_data_from_firebase = async (doc_name:string) => {
  try {
    const docRef = doc(db, collectionName, doc_name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.warn("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};

export const META_TEXT = "Call us @ +918660610849";

export {
  firebaseApp,
  storage,
  messaging,
  analytics,
  getToken,
  get_data_from_firebase,
  write_data_to_firebase,
  onMessage,
  db,
};
