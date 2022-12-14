var calendarContainerX = document.getElementById("calendar-container");
var calendarContainer = $('#calendar-container');
var saveAll = $('#save-all');
var clearAll = $('#clear-all');

//get ordinal number suffix for any number
const nth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

  function setTime() {
    timeInterval = setInterval(function () {
      //get current time
      //print to span
      var today = dayjs();
      //use ## as placeholder for ordinal number on date
      //get format for todays date
      let tempDate = today.format('dddd, MMMM D[##] YYYY, hh:mm a');
      //get numeric number for todays date
      let todaysDay = today.format('D');
      //replace placeholder ## with ordinal number suffix
      tempDate = tempDate.replace("##", nth(todaysDay) );
      //write date to html element
    $('#time-display').text(tempDate);
    }, 1000);
  }

  //pass id of textarea and text in textarea
  function saveToStorage(eventID, eventText) {
    
    //console.log("saveToStorage - " + eventID + "/" + eventText);
    let storedEvents = localStorage.getItem("events");
    let arrayEvents;
    //check if first time to store to local storage
    //create blank array and add element in correct position
    if (storedEvents == null){
        arrayEvents = Array(8).fill("");
       // arrayEvents = Array.from(Array(8).keys())
        arrayEvents[eventID] = eventText;
        //arrayEvents = [eventText];
    } else {
       //already have saved events so update array with new event
        arrayEvents = JSON.parse(storedEvents);
        arrayEvents[eventID] = eventText;
    }
    localStorage.setItem("events", JSON.stringify(arrayEvents));
    //print updated text back to screen
    //printEvents()
  }

  function printEvents() {
    //console.log('printEvents');
    let storedEvents = localStorage.getItem("events");
    let arrayEvents;
    //check if there is anything in local storage
    if (storedEvents != null){
        //convert from string to array
        arrayEvents = JSON.parse(storedEvents);
        //loop through all rows in scheduler and set value
        for (let i=0; i<arrayEvents.length; i++){
            let eventId = "textarea#event-" + i;
            $(eventId).val(arrayEvents[i]);
            $(eventId).attr("style", "border: none");
        }
    } else {
        //set all values to blank
        for (let i=0; i<9; i++){
            let eventId = "textarea#event-" + i;
            $(eventId).val('');
            $(eventId).attr("style", "border: none");
        }
    }

  }

  //set colours on each time block depending on whether in past, present or future
  function setTimeblockColours() {
    let today = dayjs();

    for (let i = 0; i<9; i++){
        //get div that holds time
        let currentId = "#time-"+ i;
        //XXX changed this
        let currentTime = document.getElementById("time-" + i);
        //let currentTime = $(currentId);

        if (currentTime){
           //extract the data-time value from the div
           //this indicates the time in 24 hour clock
            let currentHour = currentTime.dataset.time;
            //create new time using hour from dataset (24 hour clock)
            //this is formatted as a string that can be used to create a new time with Day.js
            let tempDateString = today.format('MM/DD/YYYY ') + currentHour + ":00:00";
            let tempDate = dayjs(tempDateString);
            //check if tempDate is before current time based on minutes
            let isBefore = tempDate.isBefore(today, 'minute');
            //check if tempDate is same as current time based on hour
            let isSame = tempDate.isSame(today, 'hour');
            //set class based on before/same
            if (isSame) {
                $('#event-' + i).toggleClass("current");
                $('#row-' + i).toggleClass("current");
            } else if (isBefore) {
                $('#event-' + i).toggleClass("past");
                $('#row-' + i).toggleClass("past");
            } 
        }
        
    }
  }
  //get value associated with row where save was clicked
  function updateEventHandler(event) {
    event.preventDefault();
    let eventText;
    //fid out which save icon was clicked
    let saveClicked = $(event.target);
    //id in the format save-img-1 - split out into array
    let arrayID = event.target.id.split("-"); 
    let elementAction = arrayID[0]; //see if it was a save or clear
    let saveId = arrayID[2];        //get which row/id
    let eventId = "textarea#event-" + saveId;
   // console.log(elementAction);
    if(elementAction === "save") {
       // alert('save');
        eventText =  $(eventId).val(); //save request so get value of textarea in that row
    } else {
       // alert('clear');
       $(eventId).val('');
        eventText = ""; //clear request so will set textarea to blank
    }
    //actualy save to local storage
    //alert(saveId);
    $(eventId).attr("style", "border: none");
    saveToStorage(saveId, eventText);
    
  }
  
  function saveAllHandler(event) {
    event.preventDefault();
    //alert(document.getElementById("event-" + 4).value);
    localStorage.clear("events");
    for (let i=0; i<9; i++){
        let eventId = "textarea#event-" + i;
        var eventText = $(eventId).val();
        //var eventText = document.getElementById("event-" + i).value;
        console.log("event text for " + "event-" + i + "/" + eventText);
        //console.log("saving - " + i + "/" + $(eventText).val());
        
        //console.log("EVENTID + " + $(eventId).val());
        $(eventId).attr("style", "border: none");
        //saveToStorage(i, $(eventId).val());
        saveToStorage(i, eventText);
    }
  }

  function saveAllHandlerxx(event) {
    event.preventDefault();
    //alert(document.getElementById("event-" + 4).value);
    localStorage.clear("events");
    for (let i=0; i<9; i++){
      //XX Changed this
        //var eventText = document.getElementById("event-" + i).value;
        //let eventId = "#event-" + i;
        var eventText = document.getElementById("event-" + i).value;
        console.log("event text for " + "event-" + i + "/" + eventText);
        //console.log("saving - " + i + "/" + $(eventText).val());
        let eventId = "textarea#event-" + i;
        console.log($(eventId).val());
        //saveToStorage(i, $(eventId).val());
        saveToStorage(i, eventText);
    }
  }

  function clearAllHandler(event) {
    event.preventDefault();
    localStorage.clear("events");
    printEvents();
  }

  function keyPressHandler(event) {
    event.currentTarget.setAttribute(
      "style", "border: solid 5px black"
    );
  
  }
  //add event listeners to celendar-container but specify selector 
  //to ensure event delegation to calendar-save class
  calendarContainer.on('click', '.calendar-save', updateEventHandler);

  //when user enters any text in text area make border black so they know they
  //have not saved it. The border is cleared on save
  calendarContainer.on('keypress', '.calendar-event', keyPressHandler);
  
  saveAll.on('click', saveAllHandler);
  clearAll.on('click', clearAllHandler);

  setTime();
  printEvents();
  setTimeblockColours();

  
  /*
   
localStorage.clear();
  let stored = localStorage.getItem("events");
  for (let j=0; j<stored.length; j++){
    console.log("stored " + j + " = " +stored[j]);
  }
  */