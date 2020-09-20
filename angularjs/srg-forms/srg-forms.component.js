var module = angular.module('srgApp', []);

// This name is what AngularJS uses to match to the `<srg-forms>` element.
module.component('srgForms', {
  templateUrl: 'srg-forms/srg-forms.template.html',
  controller: function SrgFormController($scope, $filter) {
    $scope.checkboxModel = {
      sunday: false,
      monday: true,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false
    };
    this.generateCommand = function () {
      var date = $filter('date')($scope.date, 'yyyy-MM-dd');
      var time = $filter('date')($scope.time, 'h:mma');
      console.log($scope);
      $scope.command = `/remind ${$scope.who} "${$scope.what}"`;
      if ($scope.reminderType == 'once') {
        $scope.command += ` on ${date} at ${time}`;
      } else if ($scope.reminderType == 'repeat') {
        var days = this.getKeyByValue($scope.checkboxModel, true).join(', ');
        $scope.command += ` on every ${days}`;
        $scope.command += ` at ${time}`;
      }
    };
    this.getKeyByValue = function(object, value) {
      return Object.keys(object).filter(key => object[key] === value);
    };
  }
});
