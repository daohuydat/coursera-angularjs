(function () {
'use strict';
angular.module("LunchCheck", [])
.controller("LunchCheckController", LunchCheckController);

LunchCheckController.$inject = ["$scope"];
function LunchCheckController($scope) {
  $scope.textbox = "";
  $scope.message = "";
  $scope.info = "";

  $scope.docheck = function () {
    $scope.info = "";
    $scope.message = "";
    if ($scope.textbox) {
        var items = $scope.textbox.split(",");
        var count=0;
        for (var i = 0; i < items.length; i++) {
          if (items[i].trim()) {
            count++;
          }else {
            $scope.message = "(NOT consider and empty item)";
            $scope.style = "red";
            count = -1;
            break;
          }
        }

        if (count >= 0 && count <= 3) {
          $scope.message = "Enjoy!";
          $scope.style = "green";
        } else if(count > 3) {
          $scope.message = "Too much!";
          $scope.style = "green";
        }

    } else {
      $scope.message = "Please enter data first";
      $scope.style = "red";
    }

  };
}
})();
