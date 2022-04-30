// Variables for all rooms

var currentRoom = null;

var roomExample = { // An object to represent a room
  room_name : "example name", // the name of the room
  
  // Neighboring rooms
  
  roomUp : null,   // the room above/north/up
  roomDown : null, // the room below/south/down
  roomLeft : null, // the room to the left/west
  roomRight : null // the room to the right/east
};

var h1TitleScreen = "<h1 id='titleScreen'>The Woods</h1>";
var h2TitleScreen = "<h2 id='titleScreen'>Created by: Dean Wilson, Gianna McCardell, Sam Platt</h2>";
var imgTitleScreen = "<img src='https://greekreporter.com/wp-content/uploads/2021/08/Sun-parthenon-credit-Mstyslav-Chernov-wikimedia-commons.jpg' style='border: solid 1px black; width: 40vw; filter: grayscale(100%);' alt='image for title screen' />";

var startGameButton = "<a href='topdown.html'><button>Start New Game</button></a>";
// var returnToTitleScreenButton = "<button onclick='loadTitleScreen();'>Return to Title Screen</button>";

function loadTitleScreen() {
  var main = document.querySelector("main");
  var footer = document.querySelector("footer");

  main.innerHTML = h1TitleScreen + h2TitleScreen + imgTitleScreen;
  footer.innerHTML = startGameButton;
}