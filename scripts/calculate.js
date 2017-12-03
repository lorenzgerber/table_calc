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
    var newCell = row.insertCell(-1);
    var textNode = document.createTextNode('');
    newCell.appendChild(textNode);
  }
}

function addFinalRow(){
  var numberOfCols = calculateCells();
  var table = document.getElementById('pricetable');
  var rowGrandTotal = table.insertRow(-1);
  rowGrandTotal.setAttribute('id', 'sumrow');
  for (var i = 0; i < numberOfCols; i++ ){
    var newCell = rowGrandTotal.insertCell(i);
    if (i > (numberOfCols - 3) ){
      var newTextNode = document.createTextNode('');
      newCell.appendChild(newTextNode);
    }
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
  calcTotalProducts();
  calcTotalAmount();
}

function calcRow(row){
  var sum = 0;
  var amount = parseInt(row.cells[4].firstChild.value);
  var price = parseInt(row.cells[3].firstChild.nodeValue);
  sum = amount * price;
  var sumCell = row.cells[5].firstChild;
  sumCell.nodeValue = sum;
}


function calcTotalProducts(){
  var totalSum  = 0;
  var table = document.getElementById('pricetable');
  var numberOfRows = table.rows.length - 1;
  for (var i = 1; i < numberOfRows; i++){
    var productSum = table.rows[i].cells[5].firstChild.nodeValue;
    totalSum += parseInt(productSum);
  }
  var totalSumCell = table.rows[numberOfRows].cells[5].firstChild;
  totalSumCell.nodeValue = totalSum;
}

function calcTotalAmount(){
  var totalAmount  = 0;
  var table = document.getElementById('pricetable');
  var numberOfRows = table.rows.length - 1;
  for (var i = 1; i < numberOfRows; i++){
    var amountSum = table.rows[i].cells[4].firstChild.value;
    totalAmount += parseInt(amountSum);
  }
  var totalAmountCell = table.rows[numberOfRows].cells[4].firstChild;
  totalAmountCell.nodeValue = totalAmount;

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
