import firebase from 'firebase/app'
import 'firebase/firestore'
import Vue from 'vue'
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)

const firebaseConfig = {
  apiKey: 'AIzaSyCGk8QVOELGBsShGTlLfZ8EGLcOFggTfEY',
  authDomain: 'kweezeen-8817f.firebaseapp.com',
  databaseURL: 'https://kweezeen-8817f.firebaseio.com',
  projectId: 'kweezeen-8817f',
  storageBucket: '',
  messagingSenderId: '597233240196',
  appId: '1:597233240196:web:0fed72f08e5c78c8c25ad1',
}

export default firebase.initializeApp(firebaseConfig).firestore()
