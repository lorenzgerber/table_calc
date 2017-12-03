/* addLoadEvent and insertAfter
   from 'DOM Scripting', Jeremy Keith &
   Jeffery Sambells. friendsofED (2010)
*/

addLoadEvent(addColumn);
addLoadEvent(addFinalRow);
addLoadEvent(addCalcButton);

function addColumn(){
  var table = document.getElementById('pricetable');
  var headRow = table.tHead.children[0];
  var columnSum = document.createElement('th');
  var textSum = document.createTextNode('Summa');
  columnSum.appendChild(textSum);
  headRow.appendChild(columnSum);
  var numberOfRows = table.rows.length;
  for(var i = 1, row; i < numberOfRows ; i++ ){
    row = table.rows[i];
    row.insertCell(-1);
  }

}

function addFinalRow(){
  var numberOfCols = calculateCells();
  var table = document.getElementById('pricetable');
  var rowGrandTotal = table.insertRow(-1);
  rowGrandTotal.setAttribute('id', 'sumrow');
  for (var i = 0; i < numberOfCols; i++ ){
    rowGrandTotal.insertCell(i);
  }
}

function calculateCells(){
  var table = document.getElementById('pricetable');
  var max = 0;
  for (var i = 0; i < table.rows.length; i++){
    if (max < table.rows[i].cells.length) {
      max = table.rows[i].cells.length;
    }
  }
  return max;
}

function addCalcButton(){
  var calcButton = document.createElement('input');
  var table = document.getElementById('pricetable');
  calcButton.setAttribute('type', 'button');
  calcButton.setAttribute('value', 'Beräkna Pris');
  calcButton.setAttribute('onclick', 'update()');
  insertAfter(calcButton, table);
}

function update(){
  var table = document.getElementById('pricetable');
  for (var i = 1; i < table.rows.length -1; i++){
    calcRow(table.rows[i]);
  }

}

function calcRow(row){
  var sum = 0;
  var amount = parseInt(row.cells[4].firstChild.value);
  var price = parseInt(row.cells[3].firstChild.nodeValue);
  sum = amount * price;
  var sumText = document.createTextNode(sum);
  row.cells[5].appendChild = sumText;

}

function calcTotalProducts(){

}

function calcTotalValue(){

}

// taken from 'DOM Scripting', Jeremy Keith &
// Jeffery Sambells. friendsofED (2010)
function insertAfter(newElement, targetElement){
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

// taken from 'DOM Scripting', Jeremy Keith &
// Jeffery Sambells. friendsofED (2010)
function addLoadEvent(func){
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}
