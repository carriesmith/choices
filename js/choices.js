var allOptions = [];
var allValues = [];

function addItem(array, inputText){
  if ( inputText !== ""){

    // Look for matching text
    var indexMatch = $.map(array, function(value){return value.toLowerCase()}).indexOf(inputText.toLowerCase());

    if( indexMatch === -1){
       array.unshift(inputText);      
    } else {
      array.splice(indexMatch, 1);
      array.unshift(inputText)
    }

  }
  return array;
}

function drawItems(whichList, array){
  
  console.log(whichList + ' .items li');
  $(whichList + ' .items li').remove();

  for (var i in array){
    var li = '<li id="i-' + i + '"><div class="input-group"> <div class="form-control form-control-static option-item" aria-describedby="basic-addon1">' + array[i] + '</div><span class="input-group-btn"><button class="btn btn-default go-away-button" type="button"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></span></span></div></li>';
    $(whichList + ' .items').append(li);
  }

}

$(function(){
  // listen for when someone adds an item
  // when someone adds one, get the text out of the input, and put it into the ul

  $('.option-form').on('submit', function(event){ 
    // prevent default form behaviour refresh page
    event.preventDefault();
    var inputText = $('.option-form input[name="item"]').val();
    allOptions = addItem(allOptions, inputText);
    drawItems('.options-list', allOptions);
    $('.option-form input[name="item"]').val("");
  });

  $('.option-form #go-button').on('click', function(event){ 
    var inputText = $('.option-form input[name="item"]').val();
    allOptions = addItem(allOptions, inputText);
    drawItems('.options-list', allOptions);
    $('.option-form input[name="item"]').val("");
  });

  // Append listener to li children of ul
  // EVENT DELEGATION to all future children of ul.items

  $('.options-list ul.items').on('click', '.go-away-button', function(){
    var textToRemove = $(this).parent().prev().text();

    // remove from the data array
    var index = allOptions.indexOf(textToRemove); 
    if (index !== -1) {
        allOptions.splice(index, 1);
    }
    drawItems('.options-list', allOptions);
  });

  // make them sortable!! whoa.
  $('ul.items').sortable();
  
  $('ul.items').sortable({
      update: function (event, ui) {
          var newOrder = $(this).sortable('toArray');
          // conver to numeric
          newOrder = newOrder.map(function(idText){
            return parseInt(idText.replace('i-',''));
          });

          var temp = [];
          for (var i in allOptions) {
            temp[i] = allOptions[newOrder[i]];
          }
          allOptions = temp;
          drawChoiceItems(allOptions);
          console.log(allOptions)
      }
  });

});