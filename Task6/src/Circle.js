'use strict'

class Circle {
  constructor(radius, color) {
    this.radius = radius;
    this.color = color;
  }
  render(x, y){
     let canvas = document.getElementById("canvas");
     let ctx = canvas.getContext("2d");
     ctx.fillStyle = this.color;
     ctx.arc(x, y, this.radius, 0, 360, false);
     ctx.fill();
  }
  increase(times){
     this.radius*=times;
  }
  decrease(times){
     this.radius/=times;
  }
  getArea(){
     return "Площадь фигуры:"+Math.PI*Math.pow(this.radius,2);
  }

}

export {Circle}; 
