import Node from "./Node"

function AStarAlgorithm(startX, startY, goalX, goalY, probePosition, map) {
    this.P = new Node(startX, startY);
    this.G = new Node(goalX, goalY);
    this.probePositon = probePosition;
    this.map = map;
    this.f = this.P;
    this.g = this.P;
    this.h = this.P;
    this.OpenList = [this.P];
    this.B = {};
    this.C = {};
}

//Page 108 AI Programmin wisdom Manhattan Distance
AStarAlgorithm.prototype.getCostFromStartToNode = function (node) {
    return Math.abs(node.x - this.P.x) + Math.abs(node.y - this.P.y);
}

AStarAlgorithm.prototype.getEstimatedCostFromNodeToGoal = function (node) {
    return this.map.getCoordCost(node.x, node.y);
}

AStarAlgorithm.prototype.calculateCostsForNode = function (node) {
    this.g = this.getConnectedNode(node);
    this.h = this.getEstimatedCostFromNodeToGoal(node);
    this.f = this.g + this.f;
}

AStarAlgorithm.prototype.work = function () {
    this.B = this.getBestNodeInOpenList();
    if (this.B.equals(this.G)) {
        console.log("goal has been found");
        return;
    }

    this.C = this.getConnectedNode(this.B);
    this.f = this.C;
    //this.g = this.
  
}

AStarAlgorithm.prototype.getBestNodeInOpenList = function () {
    return this.OpenList[0];
}

AStarAlgorithm.prototype.getConnectedNode = function (point) {

}

export default AStarAlgorithm;