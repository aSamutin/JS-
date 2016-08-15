"use strict"

class Figure {
  create(type, color){
    if (type == 'Square') {
        return new Square(100, color);
    } else if (type == 'Circle') {
        return new Circle(100, color);
    } else if (type == 'Rectangle'){
        return new Rectangle(100, 200, color);
    }
  }
}

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

class Square extends Rectangle{
   constructor(side, color) {
       super();
       this.height = side;
       this.width = side;
       this.color = color;
   }
}

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

export {Square, Rectangle, Circle, Figure};
