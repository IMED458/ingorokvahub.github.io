import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDlke5mGKbvnUg4qe2knt5eIHUiOSh6BYM',
  authDomain: 'ingorokvahub.firebaseapp.com',
  projectId: 'ingorokvahub',
  storageBucket: 'ingorokvahub.firebasestorage.app',
  messagingSenderId: '444203895275',
  appId: '1:444203895275:web:87ddee89ec63fa4b2d31ae',
  measurementId: 'G-N7XTQGDPE3',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);

let analyticsPromise: Promise<Analytics | null> | null = null;

export function enableFirebaseAnalytics() {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  analyticsPromise ??= isSupported()
    .then((supported) => (supported ? getAnalytics(firebaseApp) : null))
    .catch(() => null);

  return analyticsPromise;
}
