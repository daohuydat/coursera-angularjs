(function () {
'use strict';
angular.module("ServiceApp", [])
.controller("ViewController", ViewController)
.controller("AddController", AddController)
.service("ShoppingService", ShoppingService);

/**/
ViewController.$inject = ["ShoppingService"];
function ViewController(ShoppingService) {
  var itemViewer = this;
  itemViewer.items = ShoppingService.getItems();

  itemViewer.remove = function (index) {
    ShoppingService.removeItem(index);
  };
}
/**/
AddController.$inject = ["ShoppingService"];
function AddController(ShoppingService) {
  var itemAdder = this;
  itemAdder.name = "";
  itemAdder.quantity = "";

  itemAdder.addItem = function () {
    ShoppingService.addItem(itemAdder.name, itemAdder.quantity);
  };
}
/**/
function ShoppingService() {
  var service = this;

  var items = [];

  service.addItem = function (name, quantity) {
    items.push({name:name, quantity:quantity});
  }

  service.removeItem = function (index) {
    items.splice(index,1);
  }
  service.getItems = function () {
    return items;
  }
}

})();
