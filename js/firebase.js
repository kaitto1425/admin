
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

 
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var storageRef;
  var firestore={};
  var firebasemessage;
(function(){
    var firebaseConfig = {
        apiKey: "AIzaSyDHUdSERHiPWdYyDQcOcS_k5tGx5U8rp4c",
        authDomain: "budgeting-a3d35.firebaseapp.com",
        databaseURL: "https://budgeting-a3d35-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "budgeting-a3d35",
        storageBucket: "budgeting-a3d35.appspot.com",
        messagingSenderId: "725888751469",
        appId: "1:725888751469:web:1ba321455060edb20dac64",
        measurementId: "G-16REKP4YJL"
      }
    
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      storageRef=firebase.storage();
      firestore=firebase.firestore();
      firebasemessage = firebase.messaging();

})();
 