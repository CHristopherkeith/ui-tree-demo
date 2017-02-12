(function () {
  'use strict';

  angular.module('ui.tree')

    .controller('TreeTopBarController', ['$scope', '$element','UiTreeHelper',
      function ($scope, $element,UiTreeHelper) {
        //$scope.service = UiTreeHelper.selectElement;
        
        /*
        $scope.$watch('service', function(newVal, oldVal) {
          console.log(newVal)
          console.log(oldVal)
          if (newVal !== oldVal) {
            console.log("2ffffffff")
          }
        },true);*/


        $scope.addSiblingNode = function () {
          if(!UiTreeHelper.selectElementScope){
            return;
          }
          var parentData={},
              addNodeData={};
          if(UiTreeHelper.selectElementScope.$parentNodeScope){
            parentData = UiTreeHelper.selectElementScope.$parentNodeScope.$modelValue;
              addNodeData={
                id:parentData.id * 10 + parentData.nodes.length,
                title: parentData.title + '.' + (parentData.nodes.length + 1),
                nodes:[]
              }
              parentData.nodes.push(addNodeData);
          }
          else{
            parentData = UiTreeHelper.selectElementScope.$parentNodesScope.$modelValue;
              console.log(parentData);
              addNodeData={
                id:parentData.length,
                title: "node"+(parentData.length+1),
                nodes:[]
              }
              parentData.push(addNodeData);

          }
        }

        

        $scope.addChildNode = function () {
          if(!UiTreeHelper.selectElementScope){
            return;
          }
          var nodeData = UiTreeHelper.selectElementScope.$modelValue;
          nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            nodes: []
          });
        };

        

        $scope.deleteNode=function(){
          if(!UiTreeHelper.selectElementScope){
            return;
          }
          UiTreeHelper.selectElementScope.remove();
          UiTreeHelper.selectElementScope = null;
          UiTreeHelper.selectElement = null;
        }

        $scope.copyNode=function(){
          if(!UiTreeHelper.selectElementScope){
            return;
          }
          var copyNodeData={},
              parentData={},
              noHashNodeData={};
          copyNodeData = UiTreeHelper.selectElementScope.$modelValue;
          noHashNodeData = angular.copy(copyNodeData);
          if(UiTreeHelper.selectElementScope.$parentNodeScope){
            parentData = UiTreeHelper.selectElementScope.$parentNodeScope.$modelValue;
              parentData.nodes.push(noHashNodeData);
          }
          else{
            parentData = UiTreeHelper.selectElementScope.$parentNodesScope.$modelValue;
              parentData.push(noHashNodeData);
          }
        }

        $scope.moveUp=function(){
          if(!UiTreeHelper.selectElementScope){
            return;
          }
          var parentData={},
              moveUpData={},
              index;
          moveUpData = UiTreeHelper.selectElementScope.$modelValue;
          if(UiTreeHelper.selectElementScope.$parentNodeScope){
            parentData = UiTreeHelper.selectElementScope.$parentNodeScope.$modelValue;
            index = parentData.nodes.indexOf(moveUpData);
            if(index>0){
              $scope.deleteNode();
              parentData.nodes.splice(index-1,0,moveUpData);
            }
          }
          else{
            parentData = UiTreeHelper.selectElementScope.$parentNodesScope.$modelValue;
            index = parentData.indexOf(moveUpData);
            if(index>0){
              $scope.deleteNode();
              parentData.splice(index-1,0,moveUpData);
            }
          }

        }

        $scope.moveDown=function(){
          if(!UiTreeHelper.selectElementScope){
            return;
          }
          var parentData={},
              moveDownData={},
              index;
          moveDownData = UiTreeHelper.selectElementScope.$modelValue;
          if(UiTreeHelper.selectElementScope.$parentNodeScope){
            parentData = UiTreeHelper.selectElementScope.$parentNodeScope.$modelValue;
            index = parentData.nodes.indexOf(moveDownData);
            if(index<parentData.nodes.length-1){
              $scope.deleteNode();
              parentData.nodes.splice(index+1,0,moveDownData);
            }
          }
          else{
            parentData = UiTreeHelper.selectElementScope.$parentNodesScope.$modelValue;
            index = parentData.indexOf(moveDownData);
            if(index<parentData.length-1){
              $scope.deleteNode();
              parentData.splice(index+1,0,moveDownData);
            }
          }

        }


      }
    ]);
})();
