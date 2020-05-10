import '../public/reset.css';
import '../public/style.css';

import PredeterminedAlgorith from "./PredeterminedAlgorithm"
import AStarAlgorithm from "./AStartAlgorithm"
import Map from "./Map"
import UI from "./UI"

let simulationMode = true;

$("#toggle-mode").click(function(){
  simulationMode = !simulationMode;
  showHideControls()
})

$("#controls .start-simulation").click(function(){
  simulationStarted=true;
})

function showHideControls() {
  $("body").removeClass("meta-show-simulation-controls");
  $("body").removeClass("meta-show-game-controls");
  if(simulationMode) {
    $("body").addClass("meta-show-simulation-controls");
  }
  else{
    $("body").addClass("meta-show-game-controls");
  }
}

$(document).ready(function(){
  showHideControls();
})

let simulationStarted = false;
let benchmarkStarted = false;
 
new p5(( sk ) => {
    let ui = new UI(sk, 64, 64);

    let map = new Map();
    
    sk.preload = () => {
      ui.preload();
    }

    sk.setup = () => {
        ui.setup(map);     
    };

    let simulationEveryNthFrame = 10;
    let frameCounter = 0;
    let algoirthm = new AStarAlgorithm(map.startX,map.startY, map.destX, map.destY, probePositon, drawCalculated,map);
    //let algoirthm = new PredeterminedAlgorith(probePositon);
  
    let started = false;

    sk.draw = () => {
      if(!simulationMode) {
        if(!started && benchmarkStarted) {
          started = true;      
          do {
            var finished = algoirthm.work();
            if(finished) break;
          }while(true);
        }
      }
      else {
        if(simulationStarted) {
          if(frameCounter > simulationEveryNthFrame) {
            frameCounter = 0;
            algoirthm.work();
          }
        }
      }
      
      sk.fill("red");
      sk.circle(ui.coordToCenteredPosition(map.startX), 
                ui.coordToCenteredPosition(map.startY), 24)        

      sk.fill("green")
      sk.circle(
        ui.coordToCenteredPosition(map.destX), 
        ui.coordToCenteredPosition(map.destY), 24)   

      frameCounter++;
    };

    function probePositon(currentX, currentY, probeX, probeY) {
      sk.stroke("#00ffff");
      sk.strokeWeight(8);
      sk.line(
        ui.coordToCenteredPosition(currentX), 
        ui.coordToCenteredPosition(currentY),
        ui.coordToCenteredPosition(probeX),
        ui.coordToCenteredPosition(probeY));
      sk.stroke("#000");
      sk.strokeWeight(1)
    }

    function drawCalculated(currentX, currentY, probeX, probeY) {
      sk.stroke("#31bd48");
      sk.strokeWeight(8);
      sk.line(
        ui.coordToCenteredPosition(currentX), 
        ui.coordToCenteredPosition(currentY),
        ui.coordToCenteredPosition(probeX),
        ui.coordToCenteredPosition(probeY));
      sk.stroke("#000");
      sk.strokeWeight(1)
    }
});
