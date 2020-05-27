import '../public/reset.css';
import '../public/style.css';

import ApplicationInstance from "./ApplicationInstance"

$(document).ready(function() {
  new p5((sk) => {
    let app = new ApplicationInstance(sk);
    sk.preload = () => {
      //window.imgTile = sk.loadImage("public/tiles/tilemap_v1_09.png")
      window.imgTile = sk.loadImage("public/tiles/tilemap_v1_11.png")
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
})