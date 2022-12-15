# Work Day Scheduler

## Description
The work day scheduler allows the user to enter events for each hour in the work day from 9am to 5pm. Events can be added and saved row by row, or saved all together using the 'Save All' button. Likewise data can be cleared from each event, row by row, or all together using the 'Clear All'. When events are saved the event data is stored in local storage so will be displayed till the event is cleared. All updates will update local storage when saved. The current date and time are displayed at the top of the scheduler. The time is updated every minute. Time slots in the scheduler are colour coded. Those in the past are grey, current are red and future are green. When text is entered in a row, the row border turns black. The border disappears when the row is saved so you can see what has been saved and what has not been saved.

The work day scheduler was developed using a combination of HTML, CSS and Javascript, JQuery, Bootstrap, Day.js and Google Fonts.

Noteworthy features are:
* Use of Day.js to format date/time
* Use of Day.js to compare times to establish past, current, future
* Event listeners and delegation
* Use of a timer - setInterval
* Use of local storage
* Use of Grid System in Bootstrap and Bootstrap utilities

The main challenges were displaying the time slots in the relevent colours and ensuring the events were stored and retrieved correctly as well as ensuring the user experience was intuitive and simple.

## Installation

N/A

## Usage

Please read the comments in script.js file to see the explanation of how the code works. Enter an event in a row and save the details by clicking on the save icon to the right of the event row. Clear a row by clicking the clear icon (X icon) to the right of the event row. When text has been entered or updated the border around the text are will turn black so you can see what has been saved. To save all or clear all rows at once use the 'Save All' or 'Clear All' buttons at the bottom of he screen. The rows are colour coded so you can see if the time slot is in the past, current or future.

Below is a screenshot of the webpage. 

![Image](./assets/images/work-day-scheduler.png?raw=true "Screenshot")



[To view the work day scheduler webpage click here.](https://helenelee.github.io/workday-scheduler/)


## Credits

Would like to thank the instructors at UWA Bootcamp. 

## License

Please refer to the license in the repo - MIT License

## How to Contribute

As this is a learning challenge for me I would appreciate any feedback, or ideas for improvement.

[Send feedback](mailto:helenelee3@outlook.com)
