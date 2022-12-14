//get main container for scheduler
var calendarContainer = $('#calendar-container');
//get save all button element
var saveAll = $('#save-all');
//get clear all button element
var clearAll = $('#clear-all');

//get ordinal number suffix for any number
//usd when printing date at top of scheduler
const nth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}
//write date/time to top of scheduler
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

  //save to storage - pass id of textarea and text value in textarea
  //storage is an array which holds the event text for each time slot 
  //0 indexed array with first slot holding the 9am text value
  function saveToStorage(eventID, eventText) {
    let storedEvents = localStorage.getItem("events");
    let arrayEvents;
    //check if first time to store to local storage
    //create blank array and add element in correct position
    if (storedEvents == null){
      //create blank array
        arrayEvents = Array(8).fill("");
        //add text to correct place in array
        arrayEvents[eventID] = eventText;

    } else {
       //already have saved events so update array with new event
        arrayEvents = JSON.parse(storedEvents);
        arrayEvents[eventID] = eventText;
    }
    localStorage.setItem("events", JSON.stringify(arrayEvents));
    
  }

  function printEvents() {
    let storedEvents = localStorage.getItem("events");
    let arrayEvents;
    //check if there is anything in local storage
    if (storedEvents != null){
        //convert from string to array
        arrayEvents = JSON.parse(storedEvents);
        //loop through all rows in scheduler and set value to text area
        for (let i=0; i<arrayEvents.length; i++){
            let eventId = "textarea#event-" + i;
            $(eventId).val(arrayEvents[i]);
            //ensure border is not shown - border is black when there is unsaved text in textarea
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
    //find out which save icon was clicked
    let saveClicked = $(event.target);
    //id in the format save-img-1 - split out into array
    let arrayID = event.target.id.split("-"); 
    let elementAction = arrayID[0]; //see if it was a save or clear
    let saveId = arrayID[2];        //get which row/id
    let eventId = "textarea#event-" + saveId;
   
    if(elementAction === "save") {
        eventText =  $(eventId).val(); //save request so get value of textarea in that row
    } else {
       $(eventId).val('');
        eventText = ""; //clear request so will set textarea to blank
    }
    //actualy save to local storage
    //clear border to indicate its saved
    $(eventId).attr("style", "border: none");
    saveToStorage(saveId, eventText);
    
  }
  //save all text area values
  function saveAllHandler(event) {
    event.preventDefault();
    //remove anything thats there already
    localStorage.clear("events");
    for (let i=0; i<9; i++){
        let eventId = "textarea#event-" + i;
        //get value from text area
        var eventText = $(eventId).val();
        //clear border - indicates its been saved
        $(eventId).attr("style", "border: none");
        //actually store
        saveToStorage(i, eventText);
    }
  }

  //clear all values from text areas
  function clearAllHandler(event) {
    event.preventDefault();
    localStorage.clear("events");
    //reprint values to screen
    printEvents();
  }

  //sets border around text are as soon as text is entered
  //so you can see whats not saved yet
  function keyPressHandler(event) {
    event.currentTarget.setAttribute(
      "style", "border: solid 5px black"
    );
  
  }
  //add event listeners to calendar-container but specify selector 
  //to ensure event delegation to calendar-save class
  calendarContainer.on('click', '.calendar-save', updateEventHandler);

  //when user enters any text in text area make border black so they know they
  //have not saved it. The border is cleared on save
  calendarContainer.on('keypress', '.calendar-event', keyPressHandler);
  
  //add event handlers for save all and clear all
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