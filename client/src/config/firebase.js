import * as firebase from 'firebase';
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC76udYV-SsFgyCI4mUSEMi1RXQpMG6VyI",
    authDomain: "copped-9a558.firebaseapp.com",
    databaseURL: "https://copped-9a558.firebaseio.com",
    projectId: "copped-9a558",
    storageBucket: "copped-9a558.appspot.com",
    messagingSenderId: "1094268024837"
	};
	
firebase.initializeApp(config);
export default firebase;