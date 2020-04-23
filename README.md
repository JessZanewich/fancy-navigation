# fancy-navigation
If you would like to see the code in action, I have a [Code Sandbox](https://llexl.csb.app/) that is using my API keys.

My keys are only committed here because this a purely front end project, and the Google Maps browser API keys require them to be exposed.
However, the keys have been heavily restricted. If you would like to play around with your own keys on Code Sandbox, feel free to fork my project and use your own! If you see a `REQUEST_DENIED` error message, it is because of the google api key restrictions. 

This is a simple navigation bar that loads a list of cities, and has a floating indicator bar to show the current selection. On resize of window, it recalculates the position to continue to show the current selection.
When a city is selected, it will show the current time in that location!
