'use strict';
$(function() {
  
  // update unicorn location function
  // include UI updates/rerenders
  var unicorns = [];
  var url = 'http://localhost:3000/api/';

  // 3 possible <select> elements; a nice-to-have feature that means a unicorn being moved cannot be moved 
  // to a location it already occupies
  var moveChoicesFromTrails = '<select class="move-choices"><option value="stay">Move to...</option><option value="pasture">Pasture</option><option value="barn">Barn</option></select>';
  var moveChoicesFromPasture = '<select class="move-choices"><option value="stay">Move to...</option><option value="trails">Trail Ride</option><option value="barn">Barn</option></select>';
  var moveChoicesFromBarn = '<select class="move-choices"><option value="stay">Move to...</option><option value="trails">Trail Ride</option><option value="pasture">Pasture</option></select>';


  function renderLocationLists(array, currentLocation) {
    // for each item in the array
    for (var i = 0; i < array.length; i++) {
      // check item.location and only include the <select> element that does not contain the current location
      if (array[i].location === currentLocation) {
        if (array[i].location === "trails") {
          $('#location-' + currentLocation).append('<li><span class="unicorn-name">' + array[i].name + '</span> <span class="unicorn-food">Loves: ' + array[i].favoriteFood + '</span> <span class="move-tools">' + moveChoicesFromTrails + '</span></li>');
        } else if (array[i].location === "pasture") {
          $('#location-' + currentLocation).append('<li><span class="unicorn-name">' + array[i].name + '</span> <span class="unicorn-food">Loves: ' + array[i].favoriteFood + '</span> <span class="move-tools">' + moveChoicesFromPasture + '</span></li>');
        } else {
          $('#location-' + currentLocation).append('<li><span class="unicorn-name">' + array[i].name + '</span> <span class="unicorn-food">Loves: ' + array[i].favoriteFood + '</span> <span class="move-tools">' + moveChoicesFromBarn + '</span></li>');
        }
      }
    }
  }

  function renderMove($element) {
    // collect info about the Unicorn that was moved
    var name = $element.parent().siblings('.unicorn-name').text();
    var food = $element.parent().siblings('.unicorn-food').text();
    // pull current data for the unicorn to be moved out of the un-updated unicorns array 
    // that was built in the initial GET request
    var unicornToUpdate = {};
    unicorns.forEach(unicorn => {
      if (name === unicorn.name) {
        unicornToUpdate.name = unicorn.name;
        unicornToUpdate.favoriteFood = unicorn.favoriteFood;
        unicornToUpdate._id = unicorn._id;
        unicornToUpdate.location = unicorn.location;
      }
    });
    // check current location of unicorn to be moved and 
    // update the DOM to reflect the move by creating a new <li> with all the relevant info
    if ($element.val() === "pasture") {
      $('#location-' + $element.val()).append('<li><span class="unicorn-name">' + name + '</span> <span class="unicorn-food">Loves: ' + food + '</span> <span class="move-tools"> ' + moveChoicesFromPasture + '</span></li>');
    } else if ($element.val() === "trails") {
      $('#location-' + $element.val()).append('<li><span class="unicorn-name">' + name + '</span> <span class="unicorn-food">Loves: ' + food + '</span> <span class="move-tools"> ' + moveChoicesFromTrails + '</span></li>');
    } else {
      $('#location-' + $element.val()).append('<li><span class="unicorn-name">' + name + '</span> <span class="unicorn-food">Loves: ' + food + '</span> <span class="move-tools"> ' + moveChoicesFromBarn + '</span></li>');
    }
    // remove the <li> showing the unicorn's old location
    $element.parent().parent().remove();
    // update the unicorn's location in the local Unicorn object
    unicornToUpdate.location = $element.val();
    // update the unicorn's location in the database by passing in the unicorn object
    updateLocation(unicornToUpdate);
  }

  // ajax call to make the PUT request
  function updateLocation(unicornToUpdate) {
    $.ajax({
        url: url + "unicorns/update",
        type: 'PUT',    
        data: JSON.stringify(unicornToUpdate),
        contentType: 'application/json',
        success: function(result) {
            console.log("success?");
        }
    });
  }
  
  // call to teh database to fetch all Unicorns
  function getData() {
    $.getJSON(url + "unicorns", function( data ) {
      unicorns = [];
      for (var i = 0; i < data.length; i++) {
        unicorns.push(data[i]);
      }

      // display the unicorns to the DOM
      renderLocationLists(unicorns, "trails");
      renderLocationLists(unicorns, "barn");
      renderLocationLists(unicorns, "pasture");

      // listen for updates on unicorn locations
      $('.location').each(function() {
        $(this).on('change', function(e){
          // pass the <select> element that was used into renderMove
          renderMove($(e.target));
        })
      });

    });
  }

  getData();

// Time:
// I was not able to find a solid time block to work in.  I would say I spent 2 hours 
// actually coding (and much more than that pondering things).
// The biggest challenge was debugging the database disconnect and remembering how to 
// pass data between server and client without the help of a frameowkr like Angular  :)
// The thing I am most proud of is the selects/dropdowns - they only display the locations that the
// unicorn does not currently occupy

}());