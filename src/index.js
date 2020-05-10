import '../public/reset.css';
import '../public/style.css';

import * as p5 from 'p5';

import PredeterminedAlgorith from "./PredeterminedAlgorithm"
import AStarAlgorithm from "./AStartAlgorithm"
import Map from "./Map"
import UI from "./UI"
 
new p5(( sk ) => {
    let ui = new UI(sk, 64, 64);

    let startCoordX = 1;
    let startCoordY = 8;

    let destinationCoordX = 6;
    let destinationCoordY = 2;

    let map = new Map();
    
    sk.preload = () => {
      ui.preload();
    }

    sk.setup = () => {
        ui.setup(map);

        sk.fill("green")
        sk.circle(
          ui.coordToCenteredPosition(destinationCoordX), 
          ui.coordToCenteredPosition(destinationCoordY), 24)        
    };

    let simulationEveryNthFrame = 10;
    let frameCounter = 0;
    let algoirthm = new AStarAlgorithm(startCoordX,startCoordY, destinationCoordX, destinationCoordY, probePositon,map);
    //let algoirthm = new PredeterminedAlgorith(probePositon);
  
    sk.draw = () => {

      if(frameCounter > simulationEveryNthFrame) {
        frameCounter = 0;
        algoirthm.work();
      }

      sk.fill("red");
      sk.circle(ui.coordToCenteredPosition(startCoordX), 
                ui.coordToCenteredPosition(startCoordY), 24)        
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
});
