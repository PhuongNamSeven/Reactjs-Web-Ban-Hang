import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBePGUL5YzeJpHNvQSCEhL9Sbw5qQSwTuw",
  authDomain: "webbanhang2-fd5bc.firebaseapp.com",
  databaseURL: "https://webbanhang2-fd5bc.firebaseio.com",
  projectId: "webbanhang2-fd5bc",
  storageBucket: "webbanhang2-fd5bc.appspot.com",
  messagingSenderId: "217581905916",
  appId: "1:217581905916:web:21e95da594e20fe39fb479",
  measurementId: "G-6V0XB7P2DW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const storage = firebase.storage() // bien lưu trữ
export {
  storage, firebase as default
}