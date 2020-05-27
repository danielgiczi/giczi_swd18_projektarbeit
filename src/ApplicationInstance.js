import maps from "./Maps";
import Map from "./Map"
import Interface from "./Interface"
import Canvas from "./Canvas"
import AlgorithmRunner from "./AlgorithmRunner";

function ApplicationInstance(sk) {
    this.Interface = new Interface();
    this.runner = new AlgorithmRunner(this)

    let imgSize = 26;
    document.documentElement.style.setProperty('--tile-size', imgSize + "px");
    this.Canvas = new Canvas(sk, imgSize, this.destinationSet.bind(this));

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
    this.Interface.handleRunAlgorithm(this.handleRunAlgorithm.bind(this));

    let self = this
    maps.forEach(function (map, inx) {
        self.Interface.addMapToSelection(inx, map.title);
    })

    this.Interface.setSelectedMap(this.selectedMapIndex);
    this.Interface.setSelectedAlgorithm(this.selectedAlgorithmIndex)
}

ApplicationInstance.prototype.init = function () {
    this.gameFinished = false;

    this.running = false;

    this.probes = [];
    this.paths = []

    let mapData = maps[this.Interface.getSelectedMap()].data;
    this.map = new Map(mapData);

    this.gameX = -1;
    this.gameY = -1;
    this.gameMoveInx = 0;

    this.Interface.refreshControls(this.simulationMode);

    this.Canvas.setup(this.map);
}

ApplicationInstance.prototype.handleRunAlgorithm = function() {
    if(this.running) return;

    if(!this.simulationMode) return;

    this.running = true;
    this.runAlgorithm();
    this.running = false;
}

ApplicationInstance.prototype.runAlgorithm = async function () {
    this.init();

    //JS
    let result = this.runner.runJSAlgorithm();

    //PHP
    //let result = await this.runPhpAlgorithm(false);

    //C#
    //let result = await this.runCSharpAlgorithm();

    let timeJS;
    let timeCSharp
    let timePHP;

    if(!this.simulationMode) {
        timeJS = this.runner.benchmarkJSAlgorithm();
        try {
            var res = await this.runner.runCSharpAlgorithm();
            timeCSharp = res.ms;
        }
        catch(e) {
            console.error("error running C# code", e)
        }
        try {
            var res = await this.runner.runPhpAlgorithm();
            timePHP = res.ms;
        }
        catch(e) {
            console.error("error running php code", e)
        }
    }

    this.probes = result.probes;
    this.paths = result.paths;
    
    if(!this.simulationMode) {
        this.gameFinished = true;
        this.gameX = this.Canvas.coordToCenteredPosition(this.map.startX);
        this.gameY  = this.Canvas.coordToCenteredPosition(this.map.startY);
    }

    this.Interface.renderBenchmarkResult(this.simulationMode, timeJS, timePHP, timeCSharp)
}

ApplicationInstance.prototype.destinationSet = function(destX, destY) {
    if (this.gameFinished || this.simulationMode) {
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