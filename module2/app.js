(function () {
'use strict';
angular.module("ShoppingListCheckOff", [])
.controller("ToBuyShoppingController", ToBuyShoppingController)
.controller("AlreadyBoughtShoppingController", AlreadyBoughtShoppingController)
.service("ShoppingListCheckOffService", ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ["ShoppingListCheckOffService"];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

  toBuy.buy = function (index) {
    ShoppingListCheckOffService.buy(index);
  };
}
AlreadyBoughtShoppingController.$inject = ["ShoppingListCheckOffService"];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var alreadyBought = this;
  alreadyBought.alreadyBoughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;
  var toBuyItems = [
    {name: "cookies", quantity: 10},
    {name: "chocolates", quantity: 15},
    {name: "coca cola", quantity: 2},
    {name: "coffee", quantity: 1},
    {name: "milks", quantity: 25},
    {name: "sugar", quantity: 1}
  ];
  var alreadyBoughtItems = [];

  service.buy = function (index) {
    alreadyBoughtItems.push(toBuyItems[index]);
    toBuyItems.splice(index,1);
  }
  service.getToBuyItems = function () {
    return toBuyItems;
  }
  service.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  }
}

})();
