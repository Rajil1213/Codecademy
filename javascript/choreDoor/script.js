let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');

let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg"

let beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg"

let spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg"

let numClosedDoors = 3;
let opendoor1, opendoor2, opendoor3;

let currentPlaying = true;

let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg"

let startButton = document.getElementById('start')

const isBot = (door) => {
  if (door.src === botDoorPath){
    return true
  }
  return false
}

const isClicked = (door) => {
  if (door.src === closedDoorPath){
    return false
  }
  return true
}

const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0){
    gameOver("win");
  }
  else if (isBot(door)){
    gameOver();
  }
}

doorImage1.onclick = () => {
  if (!isClicked(doorImage1) && currentPlaying){
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
}

doorImage2.onclick = () => {
  if (!isClicked(doorImage2) && currentPlaying){
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
}

doorImage3.onclick = () => {
  if (!isClicked(doorImage3) && currentPlaying){
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
}

startButton.onclick = () => {
  if (!currentPlaying){
    startRound()
  }
}

const gameOver = (status) => {
  if (status === 'win'){
    startButton.innerHTML = 'You win! Play Again?'
  }
  else {
    startButton.innerHTML = 'Game Over! Play Again?'
  }
  currentPlaying = false;
}

const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;

  numClosedDoors = 3;

  startButton.innerHTML = "Good Luck!"

  currentPlaying = true
  
  let choreDoor = Math.floor(Math.random() * numClosedDoors)
  switch (choreDoor){
    case 0:
      openDoor1 = botDoorPath;
      openDoor2 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 1:
      openDoor2 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    default:
      openDoor3 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor2 = spaceDoorPath;
      break;
  }
}

startRound();