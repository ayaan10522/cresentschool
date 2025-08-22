// script.js

const firebaseConfig = {
  apiKey: "AIzaSyBBIG7IpuY8Hc3E0_zcEyon06an8ll6TGw",
  authDomain: "school-test-4b350.firebaseapp.com",
  projectId: "school-test-4b350",
  storageBucket: "school-test-4b350.firebasestorage.app",
  messagingSenderId: "557567714700",
  appId: "1:557567714700:web:be0df02162246ee5d5a2a9"
};

function loadFirebaseScripts(callback) {
  if (typeof firebase === 'undefined') {
    let script1 = document.createElement('script');
    script1.src = "https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js";
    document.head.appendChild(script1);
    script1.onload = () => {
      let script2 = document.createElement('script');
      script2.src = "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore-compat.js";
      document.head.appendChild(script2);
      script2.onload = callback;
    }
  } else {
    callback();
  }
}

function main() {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  const docRef = db.collection('schoolData').doc('main');

  // For index.html (user view) - listen for data changes and update display
  if (document.getElementById('displayData')) {
    docRef.onSnapshot(doc => {
      if (doc.exists) {
        const data = doc.data();
        document.getElementById('displayData').innerHTML = data.htmlContent || "<i>No content available</i>";
      } else {
        document.getElementById('displayData').innerHTML = "<i>No content available</i>";
      }
    });
  }

  // For admin.html (admin view) - set up update button and input syncing
  if (document.getElementById('updateBtn') && document.getElementById('updateInput')) {

    // Load existing content into input on page load
    docRef.get().then(doc => {
      if (doc.exists) {
        document.getElementById('updateInput').value = doc.data().htmlContent || "";
      }
    });

    // Update Firestore when admin clicks the update button
    document.getElementById('updateBtn').addEventListener('click', () => {
      const newContent = document.getElementById('updateInput').value;
      docRef.set({
        htmlContent: newContent
      }).then(() => {
        alert("Updated content saved!");
      }).catch(err => {
        console.error("Error updating content: ", err);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadFirebaseScripts(main);
});
