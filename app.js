// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCL4QHF4K-Od4BxkijwueUq9TrEf4i3Zg0",
  authDomain: "pymsyn-chat.firebaseapp.com",
  projectId: "pymsyn-chat",
  storageBucket: "pymsyn-chat.appspot.com",
  messagingSenderId: "1076035228884",
  appId: "1:1076035228884:web:242d04b1da1ee9ea3f5741",
  measurementId: "G-Q5FQ9FEHFD"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

// UI Elements
const chatWindow = document.getElementById('chat-window');
const form = document.getElementById('message-form');
const input = document.getElementById('message-input');

// Render message
function renderMessage(doc) {
  const div = document.createElement('div');
  div.textContent = doc.data().text;
  chatWindow.appendChild(div);
}

// Load messages
db.collection("messages").orderBy("timestamp")
  .onSnapshot(snapshot => {
    chatWindow.innerHTML = "";
    snapshot.docs.forEach(doc => renderMessage(doc));
  });

// Send message
form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  db.collection("messages").add({
    text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  input.value = "";
});
