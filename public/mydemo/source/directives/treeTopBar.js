(function () {
  'use strict';

  angular.module('ui.tree')
    .directive('treeTopBar', ['$window','UiTreeHelper',
      function ($window,UiTreeHelper) {
        return {
          restrict: 'A',
          scope: true,
          controller: 'TreeTopBarController',
          link: function (scope, element, attrs, ctrl) {

            /*
            scope.$watch('UiTreeHelper', function(val) {
                console.log("2333")
                scope.selectElementScope=val;
            },true);*/
          }
        };
      }
    ]);
})();
