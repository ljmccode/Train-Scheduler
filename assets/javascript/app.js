  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC_YLx5K1pGi8dkQpHSEiSs8n6E6uWRy7A",
    authDomain: "trilogy-db.firebaseapp.com",
    databaseURL: "https://trilogy-db.firebaseio.com",
    projectId: "trilogy-db",
    storageBucket: "trilogy-db.appspot.com",
    messagingSenderId: "314521738848"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  $('#add-train-btn').on('click', function (event) {
      event.preventDefault();

    var trainName = $('#train-name-input').val().trim();
    var trainDestination = $('#destination-input').val().trim();
    var firstTrainTime = $('#first-train-input').val().trim();
    var trainFrequency = $('#frequency-input').val().trim();

    
    var newTrain = {
        train: trainName,
        destination: trainDestination,
        firstTrain: firstTrainTime,
        frequency: trainFrequency
    };
    database.ref().push(newTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

  });

  database.ref().on("child_added", function (childSnapshot) {
        var trainName = childSnapshot.val().train;
        var trainDestination = childSnapshot.val().destination;
        var firstTrainTime = childSnapshot.val().firstTrain;
        var trainFrequency = childSnapshot.val().frequency

        // First time pushed back 1 year (makes sure it comes before current time)
        var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");

        // Difference in time in minutes
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // Time apart remainder
        var remainder = diffTime % trainFrequency;

        // Minutes until train
        var minutesAway = trainFrequency - remainder;

        // Next Train Time
        var nextTrain = moment().add(minutesAway, "minutes");

        var nameCell = $("<td>").text(trainName);
        var destinationCell = $("<td>").text(trainDestination)
        var frequencyCell = $("<td>").text(trainFrequency);
        var nextCell = $("<td>").text(moment(nextTrain).format("hh:mm A"));
        var mintuesAwayCell = $("<td>").text(minutesAway);

        var newRow = $("<tr>").append(nameCell, destinationCell, frequencyCell, nextCell, mintuesAwayCell);
        $("tbody").append(newRow);

  });