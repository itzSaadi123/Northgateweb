/* ============================================================
   NorthGate Visa Service Center — Google Sign-In (Firebase Auth)
   ============================================================
   SETUP STEPS (one-time, takes ~5 minutes):
   1. Go to https://console.firebase.google.com and create a free project.
   2. In the project, go to Build > Authentication > Get Started >
      Sign-in method > enable "Google".
   3. Go to Project Settings (gear icon) > General > scroll to
      "Your apps" > click the Web icon (</>) > register the app.
   4. Firebase will show you a firebaseConfig object. Copy those
      values into the firebaseConfig object below.
   5. Still in Authentication > Settings > Authorized domains,
      add your live domain, e.g. northgatevisaservices.com
      (localhost is already allowed by default for testing).
   That's it — every page that includes this file will get a
   working "Sign in with Google" button automatically.
   ============================================================ */

const firebaseConfig = {
  apiKey: "AIzaSyBLNOJ4KA9ingOLJXBpyEOF6auIoBpTHbs",
  authDomain: "northgate-7904b.firebaseapp.com",
  projectId: "northgate-7904b",
  storageBucket: "northgate-7904b.firebasestorage.app",
  messagingSenderId: "677518711425",
  appId: "1:677518711425:web:c400e633bd3117a65d4b80"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

function signInWithGoogle() {
  if (isMobileDevice()) {
    // Popups are unreliable on mobile browsers — use redirect flow instead
    auth.signInWithRedirect(googleProvider);
    return;
  }
  auth.signInWithPopup(googleProvider).catch((error) => {
    console.error("Sign-in error:", error);
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
      // Fallback: if the popup got blocked, try redirect instead
      auth.signInWithRedirect(googleProvider);
    } else if (error.code !== 'auth/popup-closed-by-user') {
      alert("Sign in failed. Please try again.");
    }
  });
}

// Required to complete the sign-in after returning from a redirect (mobile flow)
auth.getRedirectResult().catch((error) => {
  console.error("Redirect sign-in error:", error);
});

function signOutUser() {
  auth.signOut();
}

function signUpWithEmail(name, email, password) {
  return auth.createUserWithEmailAndPassword(email, password).then((result) => {
    if (name) {
      return result.user.updateProfile({ displayName: name }).then(() => result);
    }
    return result;
  });
}

function signInWithEmail(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

function resetPassword(email) {
  return auth.sendPasswordResetEmail(email);
}

function getInitial(name) {
  return name ? name.charAt(0).toUpperCase() : "U";
}

function renderAuthUI(user) {
  const desktopSlot = document.getElementById('authSlot');
  const mobileSlot = document.getElementById('authSlotMobile');

  if (user) {
    const firstName = user.displayName ? user.displayName.split(' ')[0] : 'Account';
    const fallbackAvatar = `https://placehold.co/64x64/e11d3f/white?text=${getInitial(firstName)}`;
    const photo = user.photoURL || fallbackAvatar;

    const desktopHTML = `
      <div class="flex items-center gap-2">
        <img src="${photo}" alt="${firstName}" class="w-8 h-8 rounded-full border border-red-200 object-cover" referrerpolicy="no-referrer" onerror="this.src='${fallbackAvatar}'">
        <span class="text-sm font-semibold text-gray-700 hidden lg:inline max-w-[90px] truncate">${firstName}</span>
        <button onclick="signOutUser()" class="text-xs font-bold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 rounded-full px-3 py-1.5 transition-all" aria-label="Logout">
          <i class="fa-solid fa-right-from-bracket"></i>
          <span class="hidden sm:inline">Logout</span>
        </button>
      </div>`;

    const mobileHTML = `
      <div class="flex items-center justify-between py-2 px-3 rounded-xl bg-red-50 mb-2">
        <div class="flex items-center gap-2 min-w-0">
          <img src="${photo}" alt="${firstName}" class="w-7 h-7 rounded-full object-cover flex-shrink-0" referrerpolicy="no-referrer" onerror="this.src='${fallbackAvatar}'">
          <span class="text-sm font-semibold text-gray-700 truncate">${firstName}</span>
        </div>
        <button onclick="signOutUser()" class="text-xs font-bold text-red-600 flex items-center gap-1 flex-shrink-0">
          <i class="fa-solid fa-right-from-bracket"></i> Logout
        </button>
      </div>`;

    if (desktopSlot) desktopSlot.innerHTML = desktopHTML;
    if (mobileSlot) mobileSlot.innerHTML = mobileHTML;
  } else {
    const desktopBtnHTML = `
      <a href="login.html" onclick="saveReturnUrl()" class="flex items-center gap-2 bg-gradient-to-r from-red-600 to-blue-800 hover:from-red-700 hover:to-blue-900 text-white text-sm font-bold px-4 py-2 rounded-full shadow-md transition-all" aria-label="Sign in">
        <i class="fa-solid fa-user text-xs"></i>
        <span class="hidden sm:inline">Sign in</span>
      </a>`;

    const mobileBtnHTML = `
      <a href="login.html" onclick="saveReturnUrl()" class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-blue-800 text-white font-bold py-2.5 px-3 rounded-xl mb-2 text-sm">
        <i class="fa-solid fa-user"></i> Sign In / Create Account
      </a>`;

    if (desktopSlot) desktopSlot.innerHTML = desktopBtnHTML;
    if (mobileSlot) mobileSlot.innerHTML = mobileBtnHTML;
  }
}

function saveReturnUrl() {
  try {
    if (!window.location.pathname.endsWith('login.html')) {
      sessionStorage.setItem('ngReturnTo', window.location.href);
    }
  } catch (e) {}
}

auth.onAuthStateChanged((user) => {
  renderAuthUI(user);
});
