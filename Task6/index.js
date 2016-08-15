import $ from "jquery";
import {Square, Rectangle, Circle, Figure} from "./figure";

var figure;
var canvas = document.getElementById("canvas");

$(document).ready(function(){

    $('input[name="clear"]').hide();
    $('input[name="increase"]').hide();
    $('input[name="decrease"]').hide();
    $('input[name="getArea"]').hide();

    $('div').on('click','input[name="clear"]', function(){
      $('.figure').fadeIn();
      $('.color').fadeIn();
      $('input[name="addFigure"]').fadeIn();

      $('input[name="clear"]').hide();
      $('input[name="increase"]').hide();
      $('input[name="decrease"]').hide();
      $('input[name="getArea"]').hide();

      canvas.width = canvas.width;
    });

    $('div').on('click','input[name="addFigure"]', function(){
      $('.figure').hide();
      $('.color').hide();
      $('input[name="addFigure"]').hide();

      $('input[name="clear"]').fadeIn();
      $('input[name="increase"]').fadeIn();
      $('input[name="decrease"]').fadeIn();
      $('input[name="getArea"]').fadeIn();

      canvas.width = canvas.width;
      figure = (new Figure).create($('.figure').val(), $('.color').val());;
      figure.render(200,200);
    });
    
    $('div').on('click','input[name="increase"]', function(){
      canvas.width = canvas.width;
      figure.increase(1.1);
      figure.render(200,200);
    });

    $('div').on('click','input[name="decrease"]', function(){
      canvas.width = canvas.width;
      figure.decrease(1.1);
      figure.render(200,200);
    });

    $('div').on('click','input[name="getArea"]', function(){
      alert(figure.getArea());
    });
});
