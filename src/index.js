import '../public/reset.css';
import '../public/style.css';

import PredeterminedAlgorith from "./PredeterminedAlgorithm"
import AStarAlgorithm from "./AStartAlgorithm"
import Map from "./Map"
import UI from "./UI"
 
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
  
    sk.draw = () => {

      if(frameCounter > simulationEveryNthFrame) {
        frameCounter = 0;
        algoirthm.work();
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
      sk.stroke("#00ff2b");
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
