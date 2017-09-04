import * as firebase from 'firebase';
import firebaseui from 'firebaseui';

export const uiConfig = {
    signInSuccessUrl: '/profile',
    signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    {provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,requireDisplayName: true},
    { provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        type: 'image', // 'audio'
        size: 'normal', // 'invisible' or 'compact'
        badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
      },
      defaultCountry: 'US' // Set default country to the United Kingdom (+44).
    }
    ],
}

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

export default ui;