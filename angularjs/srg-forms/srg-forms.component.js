var module = angular.module('srgApp', []);

// This name is what AngularJS uses to match to the `<srg-forms>` element.
module.component('srgForms', {
  templateUrl: 'srg-forms/srg-forms.template.html',
  controller: function SrgFormController($scope, $filter) {
    this.generateCommand = function () {
      console.log($scope);
      var date = $filter('date')($scope.date, 'yyyy-MM-dd');
      var time = $filter('date')($scope.time, 'h:mma');
      $scope.command = '/remind '+$scope.who+' "'+$scope.what+'" on '+date+' at '+time;
    };
  }
});
