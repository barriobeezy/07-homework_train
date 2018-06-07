var config = {
    apiKey: "AIzaSyBUfohz8F5ijOu_abz7qdSZlCDlW9xT9UE",
    authDomain: "time-sheet-48bec.firebaseapp.com",
    databaseURL: "https://time-sheet-48bec.firebaseio.com",
    projectId: "time-sheet-48bec",
    storageBucket: "time-sheet-48bec.appspot.com",
    messagingSenderId: "650764467382"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-data").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var trainDest = $("#train-dest").val().trim();
    var trainFreq = $("#train-freq").val().trim();
    var firstTrain = $("#first-train").val().trim();
    console.log(firstTrain);

    var convertedTime = moment(firstTrain, "HH:mm").subtract(1, "y");
        // console.log(convertedTime);
    var timeDiff = moment().diff(moment(convertedTime), "m");
        // console.log(timeDiff);
    var timeRemainder = timeDiff % trainFreq;
        // console.log(timeRem);
    var timeLeft = trainFreq - timeRemainder;
        // console.log(timeLeft);
    var nextArrival = moment().add(timeLeft, "m").format("HH:mm");
        // console.log(nextArrival);
        
    database .ref().push({
        trainName: trainName,
        trainDest: trainDest,
        trainFreq: trainFreq,
        timeLeft: timeLeft,
        nextArrival: nextArrival,
    });

});

database.ref().on("child_added", function(childSnapshot) {

    $("#name-output").append(childSnapshot.val().trainName + "<br>" + "<hr/>");
    $("#dest-output").append(childSnapshot.val().trainDest + "<br>" + "<hr/>");
    $("#freq-output").append(childSnapshot.val().trainFreq + " mins" + "<br>" + "<hr/>");
    $("#next-output").append(childSnapshot.val().nextArrival + "<br>" + "<hr/>")
    $("#arival-output").append(childSnapshot.val().timeLeft + "<br>" + "<hr/>");

});
