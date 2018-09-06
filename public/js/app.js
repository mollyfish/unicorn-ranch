'use strict';
$(function() {
  console.log("hi there");

  // update unicorn location function
  // include UI updates/rerenders
var unicorns = [
  { "_id" : "5b916ae5707a715449ee6ab0", "name" : "Sparkles", "location" : "barn", "favoriteFood" : "lucky charms" },
  { "_id" : "5b916b05707a715449ee6ab1", "name" : "Peaches", "location" : "pasture", "favoriteFood" : "spaghetti" },
  { "_id" : "5b916b1b707a715449ee6ab2", "name" : "Party Animal", "location" : "trails", "favoriteFood" : "apples" },
];

var $trailList = $("#location-trail");

function renderLocationLists(array, currentLocation) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].location === currentLocation) {
      $("#location-" + currentLocation).append("<li>" + array[i].name + "</li>");
    }
  }
}

renderLocationLists(unicorns, "trails");
renderLocationLists(unicorns, "barn");
renderLocationLists(unicorns, "pasture");

// START: git commit
// take 1-2 hours
// END: git commit

// end of day Sunday

// connect to database
// able to change location
// make it look awesome

}());