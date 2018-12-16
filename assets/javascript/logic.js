// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Calculation time of the next train time

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
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var first_time = childSnapshot.val().first_time;
    var frequency = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(first_time);
    console.log(frequency);

    // 4. Time Calculation
    
    console.log(first_time);
    var first_timeConverted = moment(first_time, "HH:mm").subtract(1, "years");
    console.log("first_timeConverted=="+first_timeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(first_timeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log("tRemainder=="+tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));  
    //var nextTrainTime = moment(nextTrain).format("hh:mm");
    var nextTrainTime = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");     
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrainTime),
      $("<td>").text(tMinutesTillTrain)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  