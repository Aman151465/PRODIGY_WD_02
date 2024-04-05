let timer;
let running = false;
let startTime;
let laps = [];

function updateTime() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60)).toString().padStart(2, '0');
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000).toString().padStart(2, '0');
  document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
}

function startStop() {
  if (running) {
    clearInterval(timer);
    document.getElementById('startStop').textContent = 'Start';
    running = false;
  } else {
    startTime = new Date().getTime();
    timer = setInterval(updateTime, 1000);
    document.getElementById('startStop').textContent = 'Stop';
    running = true;
  }
}

function reset() {
  clearInterval(timer);
  document.getElementById('time').textContent = '00:00:00';
  document.getElementById('startStop').textContent = 'Start';
  running = false;
  laps = [];
  updateLapList();
}

function recordLap() {
  if (running) {
    const lapTime = document.getElementById('time').textContent;
    laps.push(lapTime);
    updateLapList();
  }
}

function updateLapList() {
  const lapList = document.getElementById('lapList');
  lapList.innerHTML = '';
  laps.forEach((lap, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Lap ${index + 1}: ${lap}`;
    lapList.appendChild(listItem);
  });
}





function deleteLap(index) {
  if (index >= 0 && index < laps.length) {
    laps.splice(index, 1); // Remove the lap at the specified index
    updateLapList(); // Update the lap list display
  }
}

function updateLapList() {
  var lapList = document.getElementById("lapList");
  lapList.innerHTML = ""; // Clear previous lap list

  laps.forEach(function(lap, index) {
    var li = document.createElement("li");
    li.textContent = lap + " ";
    
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove";
    deleteButton.style="margin-left:5em";
    deleteButton.onclick = function() {
      deleteLap(index);
    };
    
    li.appendChild(deleteButton);
    lapList.appendChild(li);
  });
}
