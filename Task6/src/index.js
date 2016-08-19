import $ from "jquery";
import {FigureFactory} from "./FigureFactory";

var figure;
var canvas = document.getElementById("canvas");

$(document.body).on('click','input[name="clear"]', function(){
    $('.job').addClass('hide');
    $('.create').removeClass('hide');
    canvas.width = canvas.width;
});

$(document.body).on('click','input[name="addFigure"]', function(){
    $('.create').addClass('hide');
    $('.job').removeClass('hide');
    canvas.width = canvas.width;
    figure = FigureFactory.create($('.figure').val(), $('.color').val());
    figure.render(200,200);
});
    
$(document.body).on('click','input[name="increase"]', function(){
    canvas.width = canvas.width;
    figure.increase(1.1);
    figure.render(200,200);
});

$(document.body).on('click','input[name="decrease"]', function(){
    canvas.width = canvas.width;
    figure.decrease(1.1);
    figure.render(200,200);
});

$(document.body).on('click','input[name="getArea"]', function(){
    alert(figure.getArea());
});

