var module = angular.module('srgApp', []);

// This name is what AngularJS uses to match to the `<srg-forms>` element.
module.component('srgForms', {
  templateUrl: 'srg-forms/srg-forms.template.html',
  controller: function SrgFormController($scope, $filter) {
    $scope.forms = {
      date: new Date(),
      time: new Date(2020, 09, 30, 9, 0, 0)
    };
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
      var date = $filter('date')($scope.forms.date, 'yyyy-MM-dd');
      var time = $filter('date')($scope.forms.time, 'h:mma');
      $scope.command = `/remind ${$scope.who} "${$scope.what}"`;
      if ($scope.reminderType == 'once') {
        $scope.command += ` on ${date} at ${time}`;
      } else if ($scope.reminderType == 'repeat') {
        $scope.command += ` on ${this.getRepeatDaysString()}`;
        $scope.command += ` at ${time}`;
      }
    };
    this.getRepeatDaysString = function() {
      function isArrayEqual(array1, array2) {
        array1 = array1.sort();
        array2 = array2.sort();
        return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
      }
      function getKeyByValue(object, value) {
        return Object.keys(object).filter(key => object[key] === value);
      }
      var days = getKeyByValue($scope.checkboxModel, true);
      if (days.length === 7) {
        return 'everyday';
      }
      if (isArrayEqual(days, ['sunday', 'saturday'])) {
        return 'every weekend';
      }
      if (isArrayEqual(days, ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'])) {
        return 'every weekday';
      }
      return 'every ' + days.join(', ');
    };
  }
});
