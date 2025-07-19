// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCL4QHF4K-Od4BxkijwueUq9TrEf4i3Zg0",
  authDomain: "pymsyn-chat.firebaseapp.com",
  projectId: "pymsyn-chat",
  storageBucket: "pymsyn-chat.firebasestorage.app",
  messagingSenderId: "1076035228884",
  appId: "1:1076035228884:web:242d04b1da1ee9ea3f5741",
  measurementId: "G-Q5FQ9FEHFD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firestore
const db = firebase.firestore();

// Get references to your HTML elements
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Send message when button is clicked
sendButton.addEventListener("click", () => {
  const message = userInput.value.trim();
  if (message !== "") {
    db.collection("messages").add({
      text: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    userInput.value = "";
  }
});

// Display messages in real-time
db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
  chatBox.innerHTML = "";
  snapshot.forEach(doc => {
    const p = document.createElement("p");
    p.textContent = doc.data().text;
    chatBox.appendChild(p);
  });
});
