 'use strict'
 
 import {Rectangle} from './Rectangle';

class Square extends Rectangle{
   constructor(side, color) {
       super();
       this.height = side;
       this.width = side;
       this.color = color;
   }
}

export {Square};
