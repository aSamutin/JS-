'use strict' 

import {Circle} from './Circle';
import {Rectangle} from './Rectangle';
import {Square} from './Square';

var FigureFactory = {
  create: function(type, color){
      if (type == 'Square') {
        return new Square(100, color);
    } else if (type == 'Circle') {
        return new Circle(100, color);
    } else if (type == 'Rectangle'){
        return new Rectangle(100, 200, color);
    }
  }
}

export {FigureFactory};