# codvid-app-pntwari

## Purpose
This is a specially-built app for the unprecendented times the world is experiencing. 
The app gives a map that has can display covid-19 cases and deaths by country. In addition, the app gives the worldwide cases and deaths. 

## Environment
The app is built using react-native, the framework developped by Facebook. It is built for Android, using a combination of Android Studio and Node.js. 
The screenshots of the results shown below are through an Android emulator from Android Studio.
The specific emulator is the Pixel 3 XL., running on Android 9. 

## Prior to running
It is assumed that react-native and packages are installed correctly on a Windows computer.
Ensure an emulator is intalled in Android Studio. react-native uses Android Pie 
Ensure the node.js command prompt is installed
The app uses Google Maps; therefore, a working API key is required. 

## How to run
Download the packages included in this repository
Open Android Studio
Within Tools, open AVD manager and run an emulator that meets Android Pie requirements
Open two node.js command prompts
In both command prompts, navigate to the base folder for the project
run 'npm run android' in one cmd prompt
run 'npx react-native start' in the other
After several minutes which may range from 0 to 30, the map will display on the emulator that was opened earlier. 
The initial display should be centered around the Equator in the Western Hesmisphere. 

## Functionality
The app opens with the Equatorial region in the Western Hesmisphere. There should be nothing else displayed on the screen upon opening. 
The user may rotate as they wish. They may also zoom in and out.
The app is able to read from the 'covid19api.com' API and display some statistics. 
To trigger this, the user must press on the country for which the statistics are needed. This will also show the worldwide statistics

## Results
Thi is what should be seen after clicking on one of the countries.
 ![After_Press](https://github.com/BUEC500C1/codvid-app-pntwari/blob/master/images/worldwide_map.JPG)


### EARLIER STEPS
The above is the final product. However, many in-between steps led to this moment, and are thus documented below, mostly in the form of images. 

The initial step was to display an app with hello world. 
 ![helloworld](https://github.com/BUEC500C1/codvid-app-pntwari/blob/master/images/starting_app.JPG)
 
The next step was to display a map centered around Boston.
 ![boston](https://github.com/BUEC500C1/codvid-app-pntwari/blob/master/images/boston_map_southend.JPG)
 
 After this, a map centered around the Americas was displayed, with modified zoom values for effectiveness.
 ![americas](https://github.com/BUEC500C1/codvid-app-pntwari/blob/master/images/americas_map.JPG)
 
 With respect to Covid-19 data, there was a step to simply fetch API data and display on screen without a map. 
 ![covid](https://github.com/BUEC500C1/codvid-app-pntwari/blob/master/images/safrica_covid.JPG)
 
 The Covid-19 data overal on the map took several steps as well. The first was with the country cases displayed in a scroll at the bottom of the display, but these displays could not change with input form the user.
 ![static](https://github.com/BUEC500C1/codvid-app-pntwari/blob/master/images/world_map_rona_initial.JPG)
 
 Finally, functionality was added for onPress, and when the event is recognized, the return is a rendered text box with the country and world data. 
