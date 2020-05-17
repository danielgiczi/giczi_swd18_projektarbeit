import '../public/reset.css';
import '../public/style.css';

import AStarAlgorithm from "./AStarAlgorithm"
import Map from "./Map"
import UI from "./UI"
import maps from "./Maps";
import DjikstraAlgorithm from './DjikstraAlgorithm';
import BreadthFirstSearchAlgorithm from './BreadthFirstSearchAlgorithm';

let simulationMode = true;
let simulationStarted = false;

$("#toggle-mode").click(function () {
  simulationStarted = false;
  simulationMode = !simulationMode;
  showHideControls()
  init(mapData, Number($("#algorithms select").val()));
})

$("#controls .reset-simulation").click(function () {
  simulationStarted = false;
  init(mapData, Number($("#algorithms select").val()));
})

$("#controls .reset-game").click(function () {
  init(mapData, Number($("#algorithms select").val()));
})

$(document).keydown(function(e){
  if(e.which == 82) {
    //R-Key was pressed
    init(mapData, Number($("#algorithms select").val()));
  }
});

function showHideControls() {
  $("body").removeClass("meta-show-simulation-controls");
  $("body").removeClass("meta-show-game-controls");
  if (simulationMode) {
    $("body").addClass("meta-show-simulation-controls");
  }
  else {
    $("body").addClass("meta-show-game-controls");
  }
}

$(document).ready(function () {
  showHideControls();
})

maps.forEach(function (map, inx) {
  $("#maps select").append(`<option value='${inx}'>${map.title}</option>`)
})

$("#maps select").change(function () {
  changeMap();
})

let mapData;
function changeMap() {
  simulationStarted = false;
  mapData = maps[$("#maps select").val()];
  init(mapData, Number($("#algorithms select").val()));
}

$("#algorithms select").change(function () {
  changeAlgorithm();
})

function changeAlgorithm() {
  simulationStarted = false;
  init(mapData, Number($("#algorithms select").val()));
}

changeAlgorithm();

//$("#maps select").val(3);

changeMap();

function init(mapData, algorithmIndex) {
  if (!mapData) return;

  let map = new Map(mapData.data);

  $("#wrapper canvas").remove();

  let destX = -1;
  let destY = -1;

  let highlightX = -1;
  let highlightY = -1;

  let imgSize = 28;

  new p5((sk) => {
    let ui = new UI(sk, imgSize);

    if (simulationMode) {
      destX = map.destX;
      destY = map.destY;
    }

    sk.preload = () => {
      ui.preload();
    }

    let algorithm;
    let pg;
    let benchmarkStarted = false;

    function initAlgorithm() {
      let algDestX;
      let algDestY;

      if (simulationMode) {
        algDestX = map.destX;
        algDestY = map.destY;
      }
      else {
        algDestX = destX;
        algDestY = destY;
      }
      switch (Number(algorithmIndex)) {
        case 0:     
          algorithm = new AStarAlgorithm(map.startX, map.startY, algDestX, algDestY, probePositon, setCalculated, map);
          break;
        case 1:
          algorithm = new DjikstraAlgorithm(map.startX, map.startY, algDestX, algDestY, probePositon, setCalculated, map);
          break;
          case 2:
          algorithm = new BreadthFirstSearchAlgorithm(map.startX, map.startY, algDestX, algDestY, map);
          break;
      }
    }

    sk.setup = () => {
      var res = ui.setup(map);
      pg = res.pg;
      let canvas = res.canvas;

      initAlgorithm();

      if (!simulationMode) {
        canvas.mouseClicked(mouseClicked)
      }

      let self = this
      $("#controls .start-simulation").click(function () {
       runAlgorithm();
      })
    };

    function runAlgorithm() {
      var result = algorithm.run();
      probes = result.probes;
      paths = result.paths;
      probeIndex = 0;

      handleGameFinished(result.found);
    }

    let started = false;

    let gameFinished = false;
    let destFound = false;

    let startTime;
    let finishTime;

    sk.draw = () => {
      sk.clear();
      sk.image(pg, 0, 0, ui.width, ui.height);

      if (!simulationMode) {
        mouseOver();
      }

      drawProbes();
      drawCalculated();

      if (!simulationMode && destX == -1 && destY == -1) {
        renderHighlight();
      }

      renderDestination();

      renderStart();

      if (!!gameFinished) {
        moveStart();
      }
    };

    function handleGameFinished(found) {
      finishTime = performance.now();
      $("#controls .game-controls").addClass("finish");
      gameFinished = true;
      destFound = found;

      let html = `<span class='coords'>(${destX},${destY})</span>`
      html += `<div class='result'>        
          <span class='lang'>JS</span>
          <span class='time'>${Math.round(finishTime - startTime, 5)} ms</span>
      </div>`

      $("#controls .game-controls .results").html("");
      $("#controls .game-controls .results").append(html)

      gameX = ui.coordToCenteredPosition(map.startX);
      gameY = ui.coordToCenteredPosition(map.startY);
    }

    let moveInx = 0;
    let speed = 10;

    let gameX;
    let gameY;

    function moveStart() {
      if (paths.length == 0) {
        return;
      }

      let nextPosition = paths[paths.length - 1 - moveInx];

      if (!nextPosition) {
        nextPosition = paths[0];
      }

      let moveToX = ui.coordToCenteredPosition(nextPosition.currentX);
      let moveToY = ui.coordToCenteredPosition(nextPosition.currentY);

      let moveSpeed = speed;

      let xDiff = moveToX - gameX
      if (Math.abs(xDiff) < speed && xDiff != 0) {
        moveSpeed = Math.abs(xDiff)
      }

      let yDiff = moveToY - gameY
      if (Math.abs(yDiff) < speed && yDiff != 0) {
        moveSpeed = Math.abs(yDiff)
      }

      if (moveToX > gameX) {
        gameX += moveSpeed;
        //console.log("right");
      }
      else if (moveToX < gameX) {
        gameX -= moveSpeed;
        //console.log("left");
      }
      else if (moveToY > gameY) {
        gameY += moveSpeed;
        //console.log("down");
      }
      else if (moveToY < gameY) {
        gameY -= moveSpeed;
        //console.log("up");
      }
      else {
        moveInx++;
      }
    }

    function renderStart() {
      let renderX;
      let renderY;

      if (gameFinished && gameX && gameY) {
        renderX = gameX;
        renderY = gameY;
      }
      else {
        renderX = ui.coordToCenteredPosition(map.startX);
        renderY = ui.coordToCenteredPosition(map.startY);
      }

      sk.fill("red");
      sk.circle(renderX, renderY, 24)
    }

    function mouseOver() {
      highlightX = ui.mouseCoordToCenteredPosition(sk.mouseX)
      highlightY = ui.mouseCoordToCenteredPosition(sk.mouseY)
    }

    function mouseClicked() {
      if (gameFinished) return;
      if (highlightX < 0 || highlightY < 0) return;
      if (map.getCoordCost(highlightX, highlightY) == 8) {
        console.log("wall clicked");
        return;
      }

      destX = highlightX;
      destY = highlightY;
      initAlgorithm();
      benchmarkStarted = true;
      startTime = performance.now();
      runAlgorithm();
    }

    function renderHighlight() {
      if (highlightX == -1 || highlightY == -1) return;

      sk.fill(0, 128, 0, 50)
      sk.rect(
        ui.coordToPosition(highlightX),
        ui.coordToPosition(highlightY), imgSize)
    }

    function renderDestination() {
      if (destX == -1 || destY == -1) return;
      sk.fill("green")
      sk.circle(
        ui.coordToCenteredPosition(destX),
        ui.coordToCenteredPosition(destY), 24)
    }

    let probes = []
    let paths = []

    let probeIndex = 0;
    function drawProbes() {
      sk.stroke("#eee");
      sk.strokeWeight(2);

      for(let index = 0; index < probes.length; index++){
        if(index == probeIndex) break;
        let probe = probes[index];
        if (!destFound && probeIndex >= probes.length) {
          sk.fill("red")
        }
        else {
          sk.fill("#343c3c")
        }

        sk.rect(
          ui.coordToPosition(probe.x),
          ui.coordToPosition(probe.y), imgSize)
      }

      sk.stroke("#000");
      sk.strokeWeight(1)


      probeIndex += Math.round(probes.length / 100);
      if(probeIndex > probes.length) {
        probeIndex = probes.length ;
      }
    }

    function drawCalculated() {
      if (paths.length == 0 || probeIndex < probes.length) return;
      sk.stroke("#fff");
      sk.strokeWeight(8);

      for(let index = 0; index < paths.length; index++){
        let path = paths[index];
        let prevPath = paths[index -1];
        if(!prevPath) {
          prevPath = { x: path.x, y: path.y}
        }
        sk.line(
          ui.coordToCenteredPosition(prevPath.x),
          ui.coordToCenteredPosition(prevPath.y),
          ui.coordToCenteredPosition(path.x),
          ui.coordToCenteredPosition(path.y)
        )
      }
      sk.stroke("#000");
      sk.strokeWeight(1)
    }
  });
}