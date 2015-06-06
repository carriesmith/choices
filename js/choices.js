var allOptions = [];

function createChoiceItem() {
}

function addChoiceItem(){
  if ($('input[name="item"]').val() !== ""){
    allOptions.push($('input[name="item"]').val());
    console.log(allOptions);
    drawChoiceItems(allOptions);
  }
  $('input[name="item"]').val("");
}

function drawChoiceItems(allOptions){
  // do not add if hit submit / enter on null string
  var taskText = $('input[name="item"]').val();
  
  $('.items li').remove();

  for (var iChoice in allOptions){
    console.log(allOptions[iChoice]);
    var li = '<li id="i-' + iChoice + '"><div class="input-group"> <div class="form-control form-control-static option-item" aria-describedby="basic-addon1">' + allOptions[iChoice] + '</div><span class="input-group-btn"><button class="btn btn-default go-away-button" type="button"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></span></span></div></li>';
    $('.items').append(li);
  }

}

// function getVals(selector) {
//   return $(selector).map(function() {
//           return($(this).text());
//       }).get();
// }


$(function(){
  // listen for when someone adds a todo item
  // when someone adds one, get the text out of the input, and put it into the ul

  $('.todo').on('submit', function(event){ 
    
    // prevent default form behaviour refresh page
    event.preventDefault();
    addChoiceItem();

  });

  $('#go-button').on('click', function(event){ 
    addChoiceItem();
  });

  // Append listener to li children of ul
  // EVENT DELEGATION to all future children of ul.items

  $('ul.items').on('click', '.go-away-button', function(){
    console.log($(this).prev('.option-item'));
    //$(this).parents('li').remove();
  });

  // make them sortable!! whoa.
  $('ul.items').sortable();
  
  $('ul.items').sortable({
      update: function (event, ui) {
          var newOrder = $(this).sortable('toArray');
          console.log(newOrder);
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
      }
  });


});