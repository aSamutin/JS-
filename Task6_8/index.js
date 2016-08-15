'use strict'

import _ from "lodash";
import {saveData} from './saveData'
import {EmployeeWithFixedPayment, EmployeeWithTimePayment, Employee} from './employee';

var addFile = document.getElementById("myfileinput");
var saveInFile = document.getElementById("save");
var empList = document.querySelector('table.empList'); // таблицы
var topList = document.querySelector('table.topList');
var LastId = document.querySelector('table.LastId');
var employees = [];

addFile.addEventListener('change', function(e){

    var files = e.target.files;
    if (files[0].name.lastIndexOf(".json")!=-1){

        var reader = new FileReader();
        reader.readAsText(files[0]);

        reader.onloadend = function () {
            employees = JSON.parse(reader.result);

            for (var i = 0; i < employees.length; i++) {
                employees[i] = new Employee().create(employees[i].first_name,employees[i].last_name,employees[i].job, employees[i].rate,employees[i].typePayment);
            }

            let sortEmployees =_.sortBy(employees, function(emp) { return [1/(emp.getPayment()), emp.first_name ]; });

            for (var i = 0; i < sortEmployees.length; i++) {
                var tr = document.createElement('tr');
                tr.innerHTML = "<td>"+sortEmployees[i].id+"</td><td>"+sortEmployees[i].first_name+"</td><td>"+sortEmployees[i].getPayment()+"</td>";
                empList.appendChild(tr);

                if (i < 5) {
                    var tr2 = tr.cloneNode(true);
                    topList.appendChild(tr2);
                }

                if (i > sortEmployees.length-4){
                    var tr2 = tr.cloneNode(true);
                    tr2.innerHTML = "<tr>"+tr.cells[0].innerHTML+"</tr>"
                    LastId.appendChild(tr2);
                }
            }
        }
    } else {
      alert("Неверный формат файла!!!");
    }
});

saveInFile.addEventListener('click', function(e){
   saveData(employees, 'employees.json');
});
