import maps from "./Maps";
import AStarAlgorithm from "./AStarAlgorithm"
import DjikstraAlgorithm from './DjikstraAlgorithm';
import BreadthFirstSearchAlgorithm from './BreadthFirstSearchAlgorithm';
import Map from "./Map"
import Interface from "./Interface"
import Canvas from "./Canvas"
import DepthFirstSearchAlgorithm from "./DepthFirstSearchAlgorithm";

function ApplicationInstance(sk) {
    this.Interface = new Interface();
    this.Canvas = new Canvas(sk, 28, this.destinationSet.bind(this));

    //Props
    this.selectedMapIndex = 0;
    this.selectedAlgorithmIndex = 2;
    this.simulationMode = true;
    this.gameFinished = false;
    this.destX = -1;
    this.destY = -1;

    this.gameX = -1;
    this.gameY = -1;
    this.gameMoveInx = 0;

    //Events
    this.Interface.handleToggleSimulationMode(this.toggleSimulationMode.bind(this));
    this.Interface.handleResetGame(this.resetGame.bind(this));
    this.Interface.handleResetSimulation(this.resetSimulation.bind(this));
    this.Interface.handleMapChanged(this.mapChanged.bind(this));
    this.Interface.handleAlgorithmChanged(this.algorithmChanged.bind(this));
    this.Interface.handleRunAlgorithm(this.runAlgorithm.bind(this));

    let self = this
    maps.forEach(function (map, inx) {
        self.Interface.addMapToSelection(inx, map.title);
    })

    this.Interface.setSelectedMap(this.selectedMapIndex);
    this.Interface.setSelectedAlgorithm(this.selectedAlgorithmIndex)
}

ApplicationInstance.prototype.init = function () {
    //Props
    this.algorithm = null;
    this.gameFinished = false;

    this.probes = [];
    this.paths = []

    let mapData = maps[this.Interface.getSelectedMap()].data;
    this.map = new Map(mapData);

    this.gameX = -1;
    this.gameY = -1;
    this.gameMoveInx = 0;

    let algDestX;
    let algDestY;

    if (this.simulationMode) {
        algDestX = this.map.destX;
        algDestY = this.map.destY;
    }
    else {
        algDestX = this.destX;
        algDestY = this.destY;
    }

    switch (Number(this.selectedAlgorithmIndex)) {
        case 0:
            this.algorithm = new AStarAlgorithm(this.map.startX, this.map.startY, algDestX, algDestY, this.map);
            break;
        case 1:
            this.algorithm = new DjikstraAlgorithm(this.map.startX, this.map.startY, algDestX, algDestY, this.map);
            break;
        case 2:
            this.algorithm = new BreadthFirstSearchAlgorithm(this.map.startX, this.map.startY, algDestX, algDestY, this.map);
            break;
        case 3:
            this.algorithm = new DepthFirstSearchAlgorithm(this.map.startX, this.map.startY, algDestX, algDestY, this.map);
            break;
    }

    this.Interface.refreshControls(this.simulationMode);

    this.Canvas.setup(this.map);
}

ApplicationInstance.prototype.runCSharpAlgorithm = function () {
    let algDestX;
    let algDestY;

    if (this.simulationMode) {
        algDestX = this.map.destX;
        algDestY = this.map.destY;
    }
    else {
        algDestX = this.destX;
        algDestY = this.destY;
    }
    let mapData = maps[this.Interface.getSelectedMap()].data;
    return window.invokeCSharpAlgorithm(Number(this.selectedAlgorithmIndex), Number(this.map.startX), Number(this.map.startY), Number(algDestX), Number(algDestY), mapData)
}

ApplicationInstance.prototype.benchmarkJSAlgorithm = function() {
    let times = [];

    let iterationBaseCount = 1000;
    if(this.selectedAlgorithmIndex == 1) iterationBaseCount = iterationBaseCount / 20;

    for(let inx = 0; inx < iterationBaseCount; inx++) {
        let startTime = performance.now();
        let result = this.algorithm.run();
        let finishTime = performance.now();
        let executionTime = finishTime - startTime
        times.push(executionTime)
    }        
    times = times.sort((a,b) => a - b);
    let median = times[Math.round(times.length/2,0)]

    return median;
}

ApplicationInstance.prototype.benchmarkCSharpAlgorithm = async function() {
    let times = [];
    let selfTimes = [];

    let iterationBaseCount = 5;

    for(let inx = 0; inx < iterationBaseCount; inx++) {
        let startTime = performance.now();
        let result = await this.runCSharpAlgorithm();
        selfTimes.push(result.ms);
        let finishTime = performance.now();
        let executionTime = finishTime - startTime
        times.push(executionTime)
    }        
    times = times.sort((a,b) => a - b);
    let median = times[Math.round(times.length/2,0)]

    selfTimes = selfTimes.sort((a,b) => a - b);
    let selfMedian = selfTimes[Math.round(selfTimes.length/2,0)]

    return { median: median, selfMedian: selfMedian};
}

ApplicationInstance.prototype.runAlgorithm = async function () {
    this.init();

    let result;

    //JS
    result = this.algorithm.run();

    //C#
    //result = await this.runCSharpAlgorithm();

    let medianJS;
    let medianCSharp;
    let medianCSharpSelf;

    if(!this.simulationMode) {
        medianJS = this.benchmarkJSAlgorithm()
        var res = await this.benchmarkCSharpAlgorithm();
        medianCSharp = res.median;
        medianCSharpSelf = res.selfMedian;
    }

    this.probes = result.probes;

    this.paths = result.paths;
    
    $("#controls .game-controls").addClass("finish");
    if(!this.simulationMode) {
        this.gameFinished = true;
        this.gameX = this.Canvas.coordToCenteredPosition(this.map.startX);
        this.gameY  = this.Canvas.coordToCenteredPosition(this.map.startY);
    }

    let html = "";

    if(!this.simulationMode) {
        html += `<span class='coords'>(${this.destX},${this.destY})</span>`
        html += `<div class='result'><span class='lang'>JS</span><span class='time'>${medianJS.toFixed(6)} ms</span></div>`
        html += `<div class='result'><span class='lang'>C# WASM</span><span class='time'>${medianCSharp.toFixed(6)}|${medianCSharpSelf.toFixed(6)} ms</span></div>`
    }

    $("#controls .game-controls .results").html(html);
}

ApplicationInstance.prototype.destinationSet = function(destX, destY) {
    if(this.simulationMode) return;
    if (this.gameFinished) {
        return;
    }

    this.destX = destX;
    this.destY = destY;

    this.init();
    
    this.runAlgorithm();
}   

ApplicationInstance.prototype.toggleSimulationMode = function () {
    this.simulationMode = !this.simulationMode;
    this.init();
}

ApplicationInstance.prototype.resetSimulation = function () {
    this.init();
}

ApplicationInstance.prototype.resetGame = function () {
    this.destX = -1;
    this.destY = -1;
    this.init();
}

ApplicationInstance.prototype.mapChanged = function (index) {
    if(!this.simulationMode) {
        this.destX = -1;
        this.destY = -1;
    }
    this.selectedMapIndex = index;
    this.init();
}

ApplicationInstance.prototype.algorithmChanged = function (index) {
    if(!this.simulationMode) {
        this.destX = -1;
        this.destY = -1;
    }

    this.selectedAlgorithmIndex = index;
    this.init();
}

ApplicationInstance.prototype.preload = function () {
    this.Canvas.preload();
}

ApplicationInstance.prototype.setup = function () {
    this.init();
}

ApplicationInstance.prototype.draw = function() {

    let algDestX;
    let algDestY;

    if (this.simulationMode) {
        algDestX = this.map.destX;
        algDestY = this.map.destY;
    }
    else {
        algDestX = this.destX;
        algDestY = this.destY;
        this.moveStart();
    }

    let renderX;
    let renderY;

    if (this.gameFinished) {
        renderX = this.gameX;
        renderY = this.gameY;
    }
    else {
        renderX = this.Canvas.coordToCenteredPosition(this.map.startX);
        renderY = this.Canvas.coordToCenteredPosition(this.map.startY);
    }

    this.Canvas.draw(this.simulationMode, this.gameFinished, algDestX, algDestY, this.probes, this.paths, renderX, renderY);
}

ApplicationInstance.prototype.moveStart = function () {
    const speed = 10;
    if (this.paths.length == 0) {
        return;
    }

    let nextPosition = this.paths[this.paths.length - 1 - this.gameMoveInx];

    if (!nextPosition) {
        nextPosition = this.paths[0];
    }

    let moveToX = this.Canvas.coordToCenteredPosition(nextPosition.x);
    let moveToY = this.Canvas.coordToCenteredPosition(nextPosition.y);

    let moveSpeed = speed;

    let xDiff = moveToX - this.gameX
    if (Math.abs(xDiff) < speed && xDiff != 0) {
        moveSpeed = Math.abs(xDiff)
    }

    let yDiff = moveToY - this.gameY
    if (Math.abs(yDiff) < speed && yDiff != 0) {
        moveSpeed = Math.abs(yDiff)
    }

    if (moveToX > this.gameX) {
        this.gameX += moveSpeed;
    }
    else if (moveToX < this.gameX) {
        this.gameX -= moveSpeed;
    }
    else if (moveToY > this.gameY) {
        this.gameY += moveSpeed;
    }
    else if (moveToY < this.gameY) {
        this.gameY -= moveSpeed;
    }
    else {
        this.gameMoveInx++;
    }
}


export default ApplicationInstance;