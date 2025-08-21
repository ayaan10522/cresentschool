// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBBIG7IpuY8Hc3E0_zcEyon06an8ll6TGw",
  authDomain: "school-test-4b350.firebaseapp.com",
  projectId: "school-test-4b350",
  storageBucket: "school-test-4b350.firebasestorage.app",
  messagingSenderId: "557567714700",
  appId: "1:557567714700:web:be0df02162246ee5d5a2a9"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Elements
const loginPage = document.getElementById("loginPage");
const studentPage = document.getElementById("studentPage");
const adminPage = document.getElementById("adminPage");
const errorMsg = document.getElementById("errorMsg");

// MPIN Login
window.checkMpin = function() {
  const mpin = document.getElementById("mpinInput").value;
  if (mpin === "123456") {
    loginPage.classList.add("hidden");
    studentPage.classList.remove("hidden");
    loadStudentData();
  } else if (mpin === "654321") {
    loginPage.classList.add("hidden");
    adminPage.classList.remove("hidden");
    loadAdminData();
  } else {
    errorMsg.classList.remove("hidden");
  }
};

// Load Student Data
function loadStudentData() {
  const updatesList = document.getElementById("updatesList");
  const noticesList = document.getElementById("noticesList");
  const calendarList = document.getElementById("calendarList");
  const galleryGrid = document.getElementById("galleryGrid");

  onSnapshot(collection(db, "updates"), snapshot => {
    updatesList.innerHTML = "";
    snapshot.forEach(doc => {
      updatesList.innerHTML += `<li class="bg-green-100 p-2 rounded">${doc.data().text}</li>`;
    });
  });

  onSnapshot(collection(db, "notices"), snapshot => {
    noticesList.innerHTML = "";
    snapshot.forEach(doc => {
      noticesList.innerHTML += `<li class="bg-yellow-100 p-2 rounded">${doc.data().text}</li>`;
    });
  });

  onSnapshot(collection(db, "gallery"), snapshot => {
    galleryGrid.innerHTML = "";
    snapshot.forEach(doc => {
      galleryGrid.innerHTML += `<img src="${doc.data().url}" class="rounded shadow"/>`;
    });
  });
}

// Load Admin Data with Delete Option
function loadAdminData() {
  const adminUpdatesList = document.getElementById("adminUpdatesList");
  const adminNoticesList = document.getElementById("adminNoticesList");
  const adminGalleryList = document.getElementById("adminGalleryList");

  onSnapshot(collection(db, "updates"), snapshot => {
    adminUpdatesList.innerHTML = "";
    snapshot.forEach(docItem => {
      adminUpdatesList.innerHTML += `
        <li class="flex justify-between items-center bg-green-100 p-2 rounded">
          ${docItem.data().text}
          <button onclick="deleteUpdate('${docItem.id}')" class="text-red-500">❌</button>
        </li>`;
    });
  });

  onSnapshot(collection(db, "notices"), snapshot => {
    adminNoticesList.innerHTML = "";
    snapshot.forEach(docItem => {
      adminNoticesList.innerHTML += `
        <li class="flex justify-between items-center bg-yellow-100 p-2 rounded">
          ${docItem.data().text}
          <button onclick="deleteNotice('${docItem.id}')" class="text-red-500">❌</button>
        </li>`;
    });
  });

  onSnapshot(collection(db, "gallery"), snapshot => {
    adminGalleryList.innerHTML = "";
    snapshot.forEach(docItem => {
      adminGalleryList.innerHTML += `
        <div class="relative">
          <img src="${docItem.data().url}" class="rounded shadow"/>
          <button onclick="deleteGallery('${docItem.id}')" class="absolute top-1 right-1 bg-red-600 text-white px-1 rounded">X</button>
        </div>`;
    });
  });
}

// Admin Add Functions
window.addUpdate = async function() {
  const text = document.getElementById("updateInput").value;
  if (text) await addDoc(collection(db, "updates"), { text });
};

window.addNotice = async function() {
  const text = document.getElementById("noticeInput").value;
  if (text) await addDoc(collection(db, "notices"), { text });
};

window.addGallery = async function() {
  const url = document.getElementById("galleryInput").value;
  if (url) await addDoc(collection(db, "gallery"), { url });
};

// Delete Functions
window.deleteUpdate = async function(id) {
  await deleteDoc(doc(db, "updates", id));
};

window.deleteNotice = async function(id) {
  await deleteDoc(doc(db, "notices", id));
};

window.deleteGallery = async function(id) {
  await deleteDoc(doc(db, "gallery", id));
};
