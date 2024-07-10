const conf = {
    appwriteUrl: "https://cloud.appwrite.io/v1",
    appwriteProjectId: "666cf36c00216e405dbc",
    appwriteDatabaseId: "666cf539003c1b371cd7",
    appwriteCollectionId: "666cf5790002d2488542",
    appwriteBucketId: "666cfab00025670f02ed",
    firebaseApiKey: "AIzaSyDdYdg62rFlhrHw9quAH6sPTj2pskr3AyU",
    firebaseAuthDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
    firebaseProjectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
    firebaseStorageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
    firebaseMessagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
    firebaseAppId: String(import.meta.env.VITE_FIREBASE_APP_ID),
    tinymceApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY),
}

export default conf;
