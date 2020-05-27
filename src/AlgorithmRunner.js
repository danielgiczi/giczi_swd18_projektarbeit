import maps from "./Maps";
import AStarAlgorithm from "./AStarAlgorithm"
import DjikstraAlgorithm from './DjikstraAlgorithm';
import BreadthFirstSearchAlgorithm from './BreadthFirstSearchAlgorithm';
import DepthFirstSearchAlgorithm from "./DepthFirstSearchAlgorithm";

function AlgorithmRunner(app) {
    this.app = app;
    this.algorithm;
}

AlgorithmRunner.prototype.runCSharpAlgorithm = function () {
    let algDestX;
    let algDestY;

    if (this.app.simulationMode) {
        algDestX = this.app.map.destX;
        algDestY = this.app.map.destY;
    }
    else {
        algDestX = this.app.destX;
        algDestY = this.app.destY;
    }
    let mapData = maps[this.app.Interface.getSelectedMap()].data;
    return window.invokeCSharpAlgorithm(Number(this.app.selectedAlgorithmIndex), Number(this.app.map.startX), Number(this.app.map.startY), Number(algDestX), Number(algDestY), mapData)
}

AlgorithmRunner.prototype.initJsAlgorithm = function() {
    let algDestX;
    let algDestY;
    
    if (this.app.simulationMode) {
        algDestX = this.app.map.destX;
        algDestY = this.app.map.destY;
    }
    else {
        algDestX = this.app.destX;
        algDestY = this.app.destY;
    }

    switch (Number(this.app.selectedAlgorithmIndex)) {
        case 0:
            this.algorithm = new AStarAlgorithm(this.app.map.startX, this.app.map.startY, algDestX, algDestY, this.app.map);
            break;
        case 1:
            this.algorithm = new DjikstraAlgorithm(this.app.map.startX, this.app.map.startY, algDestX, algDestY, this.app.map);
            break;
        case 2:
            this.algorithm = new BreadthFirstSearchAlgorithm(this.app.map.startX, this.app.map.startY, algDestX, algDestY, this.app.map);
            break;
        case 3:
            this.algorithm = new DepthFirstSearchAlgorithm(this.app.map.startX, this.app.map.startY, algDestX, algDestY, this.app.map);
            break;
        default:
            console.error("Wrong algorithm index " + this.app.selectedAlgorithmIndex)
    }
}

AlgorithmRunner.prototype.runJSAlgorithm = function() {
    this.initJsAlgorithm();
    return this.algorithm.run();
}

AlgorithmRunner.prototype.benchmarkJSAlgorithm = function() {

    this.initJsAlgorithm();

    let times = [];

    let iterationBaseCount = 1000;
    if(this.app.selectedAlgorithmIndex == 1) iterationBaseCount = iterationBaseCount / 20;

    for(let inx = 0; inx < iterationBaseCount; inx++) {
        let startTime = performance.now();
        this.algorithm.run();
        let finishTime = performance.now();
        let executionTime = finishTime - startTime
        times.push(executionTime)
    }        
    times = times.sort((a,b) => a - b);
    let median = times[Math.round(times.length/2,0)]

    return median;
}

AlgorithmRunner.prototype.runPhpAlgorithm = function () {
    let algDestX;
    let algDestY;

    if (this.app.simulationMode) {
        algDestX = this.app.map.destX;
        algDestY = this.app.map.destY;
    }
    else {
        algDestX = this.app.destX;
        algDestY = this.app.destY;
    }

    let mapData = maps[this.app.Interface.getSelectedMap()].data;

    let live = document.location.href.indexOf("heroku") > -1;

    let url = "http://localhost/giczi_swd18_projektarbeit_php/api.php";
    if(live) {
        url = "https://giczi-swd18-projektarbeit-php.herokuapp.com/api.php";
    }

    return $.ajax({        
        url: url,
        type: "POST",
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        data: JSON.stringify({
            AlgorithmIndex: Number(this.app.selectedAlgorithmIndex),
            StartX: this.app.map.startX,
            StartY: this.app.map.startY,
            DestX:  Number(algDestX),
            DestY: Number(algDestY),
            MapData: mapData
        })
    })   
}

export default AlgorithmRunner;
