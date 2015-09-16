angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicModal) {
        $ionicModal.fromTemplateUrl("account.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.account = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we are done with it!
        $scope.$on("$destroy", function() {
            $scope.modal.remove();
        });
    })

.controller('TodoCtrl', function($scope, $ionicModal, todoList) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

        todoList.getAllItems().then(function(data) {
            $scope.items = data;
        });

        $ionicModal.fromTemplateUrl('add-or-edit-item.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.showAddItemModal = function() {
            $scope.newItem = {};
            $scope.action = '添加';
            $scope.isAdd = true;
            $scope.modal.show();
        };

        $scope.showEditItemModal = function(item) {
            $scope.newItem = item;
            $scope.rawContent = item.content;
            $scope.action = '编辑';
            $scope.isAdd = false;
            $scope.modal.show();
        };

        $scope.saveItem = function() {
            if ($scope.isAdd) {
                if(!$scope.newItem.content){
                    alert("请先输入事务");
                    return;
                }
                todoList.addItem($scope.newItem);
                $scope.newItem = {};
            } else {
                if(!$scope.newItem.content){
                    alert("请先输入事务");
                    return;
                }
                todoList.updateItem($scope.newItem);
                $scope.newItem = {};
            }
            $scope.modal.hide();
        };

        $scope.deleteItem = function() {
            todoList.removeItem($scope.newItem);
            $scope.modal.hide();
        };

        $scope.cancleItem = function() {
            $scope.newItem.content = $scope.rawContent;
            $scope.modal.hide();
        };

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
