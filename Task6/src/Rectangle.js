'use strict'

class Rectangle {
  constructor(height, width, color) {
    this.height = height;
    this.width = width;
    this.color = color;
  }
  render(x, y){
     let canvas = document.getElementById("canvas");
     let ctx = canvas.getContext("2d");
     ctx.fillStyle = this.color;
     ctx.fillRect(x, y, this.width, this.height);
  }
  increase(times){
     this.height*=times;
     this.width*=times;
  }
  decrease(times){
     this.height/=times;
     this.width/=times;
  }
  getArea(){
     return "Площадь фигуры:"+this.height*this.width;
  }

}

export {Rectangle};
