import '../public/reset.css';
import '../public/style.css';

import ApplicationInstance from "./ApplicationInstance"

$(document).ready(function() {
  new p5((sk) => {
    let app = new ApplicationInstance(sk);
    sk.preload = () => {
      app.preload();
    } 
    sk.setup = () => {
      app.setup();
    }
    sk.draw = () => {
      app.draw();
    } 
  });
})