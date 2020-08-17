import '../public/reset.css';
import '../public/style.css';

import ApplicationInstance from "./ApplicationInstance"
import ComparisonContainer from './ComparisonContainer';

$(document).ready(function () {

  if (document.location.search.indexOf("comparison=true") > -1) {
    let app = new ComparisonContainer();
  }
  else {
    var comparisonAlgorithm = -1;
    var comparisonView = -1;
    if (document.location.search.indexOf("comparison-view") > -1) {
      comparisonAlgorithm = document.location.search.split("&")[1].split("=")[1];
      comparisonView = document.location.search.split("&")[0].split("=")[1];
    }
    else {
      $.getScript("/_framework/blazor.webassembly.js");
      $.getScript("/_framework/wasm/dotnet.3.2.0.js");
    }
    new p5((sk) => {
      let app = new ApplicationInstance(sk, comparisonAlgorithm, comparisonView);
      sk.preload = () => {
        if(comparisonAlgorithm > -1) {
          window.imgTile = sk.loadImage("public/tiles/tilemap_v1_13.png")
        }
        else {
          window.imgTile = sk.loadImage("public/tiles/tilemap_v1_11.png")
        }
        window.imgWall = sk.loadImage("public/tiles/tilemap_v1_10.png")
        window.imgM5 = sk.loadImage("public/tiles/tilemap_v1_05.png")
      }
      sk.setup = () => {
        app.setup();
      }
      sk.draw = () => {
        app.draw();
      }
    });

  }
})