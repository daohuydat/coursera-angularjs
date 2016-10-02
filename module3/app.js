(function () {
'use strict';
angular.module("NarrowItDownApp", [])
.controller("NarrowItDownController", NarrowItDownController)
.service("MenuSearchService", MenuSearchService)
.directive("foundItems", FoundItemsDirective)
.constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  return {
    templateUrl : 'foundItems.html',
    scope: {
      items: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs : 'menu',
    bindToController: true
  }
}
/**/
NarrowItDownController.$inject = ["MenuSearchService"];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.title = "Menu search app result";
  menu.founds = [];

  menu.narrow = function () {
    menu.founds = [];
    menu.title = "Menu search app (processing...)";
    MenuSearchService.getMatchedMenuItems(menu.name)
    .then(function (response) {
      menu.founds = response;
      menu.title = "Menu search app result ("+menu.founds.length+" items found)." ;
    }, function (response) {
      console.log(response);
    });
  }
  menu.removeItem = function (index) {
    MenuSearchService.removeItem(index);
    menu.title = "Menu search app result ("+menu.founds.length+" items display)." ;
  }
  menu.isEmptyList = function () {
    return MenuSearchService.isEmptyList();
  }
}

/**/
MenuSearchService.$inject = ["$http", "ApiBasePath"];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function (searchTerm) {
      foundItems = [];
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (response) {
        if (searchTerm) {
          var result = response.data.menu_items;
          console.log(result.length);
          for (var i = 0; i < result.length; i++) {
            if (result[i].description.indexOf(searchTerm)>=0) {
              foundItems.push({
                name: result[i].name,
                short_name: result[i].short_name,
                description: result[i].description
              });
            }
          }
        }
        return foundItems;
      });

  }
  service.removeItem = function (index) {
    foundItems.splice(index,1);
  }
  service.isEmptyList = function () {
    return foundItems.length === 0;
  }
}

})();
