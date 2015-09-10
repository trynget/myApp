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

.controller('TodoCtrl', function($scope, todoList) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  //$scope.chats = Chats.all();
  //$scope.remove = function(chat) {
  //  Chats.remove(chat);
  //};
        $scope.items = [];
        $scope.init = function() {
            todoList.getAllItems(function(data) {
                console.log(data);
                $scope.items = data;
            })
        };
        $scope.init();

        $scope.newItem = {};
        $scope.postItem = function() {
            console.log($scope.newItem);
            if(!$scope.newItem.content){
                alert("请先输入事务");
                return;
            }
            todoList.addItem($scope.newItem);
            $scope.newItem = {};
        };
        $scope.deleteItem = function(item) {
            $scope.item = item;
            todoList.removeItem($scope.item);
        }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
