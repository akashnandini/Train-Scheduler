// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.



// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyA8rBvHTLR2WnEguDc6WwBnpE13gsyPUrY",
    authDomain: "nandinifirst-db18c.firebaseapp.com",
    databaseURL: "https://nandinifirst-db18c.firebaseio.com",
    projectId: "nandinifirst-db18c",
    storageBucket: "nandinifirst-db18c.appspot.com",
    messagingSenderId: "1068988482314"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var first_time = $("#first-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
        trainName: trainName,
        destination: destination,
        first_time: first_time,
        frequency: frequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs train to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.first_time);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var first_time = childSnapshot.val().first_time;
    var frequency = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(first_time);
    console.log(frequency);
  
    
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(first_time),
      $("<td>").text(frequency),
      $("<td>").text(frequency)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  