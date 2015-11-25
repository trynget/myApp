angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicModal, $state) {
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

        $scope.showInforms = function() {
            $state.go('tab.dash-inform');
        };

        /*** 到课表页**/
        $scope.toSchedule = function() {
            $state.go('schedule');
        };
        /*** 到笔记页**/
        $scope.toNote = function() {
            $state.go('tab.dash-note');
        };
    })

.controller('TodoCtrl', function($scope, $ionicModal, showMsgService, todoList) {
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
                    showMsgService.showMsg("请先输入事务");
                    return;
                }
                todoList.addItem($scope.newItem);
                $scope.newItem = {};
            } else {
                if(!$scope.newItem.content){
                    showMsgService.showMsg("请先输入事务");
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
    .controller('InformCtrl', function($scope, Chats) {
        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
    })

.controller('InformDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ScheduleCtrl',function($scope) {
    $scope.items = [{
        content: "15-16学年1201班级课表" ,
        scheduleImg: "img/surfing.jpg"
    },{
        content: "15-16学年1203班级课表",
        scheduleImg: "img/surfing.jpg"
    }];
    $scope.showSchedule = function(index) {
        var pswpElement = document.querySelectorAll('.pswp')[0];
        // build items array
        var itemImgs = $scope.items[index].scheduleImg;
        var items = [], item;
        setTimeout(function(){
            item = {
                src : itemImgs,
                w : 1000,
                h : 664
            };
            items.push(item);
            // define options (if needed)
            var options = {
                history: false,
                focus: false,
                tapToClose: true,
                preload: [1,1],
                showAnimationDuration: 0,
                hideAnimationDuration: 0
            };
            var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        },300);
    };

    $scope.toDash = function() {
        history.back();
    }
})
.controller('NoteCtrl',function($scope, $ionicModal, showMsgService, noteList) {
    noteList.getAllItems().then(function(data) {
        $scope.notes = data;
    });

    $ionicModal.fromTemplateUrl('add-or-edit-note.html', {
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
        $scope.rawTitle = item.title;
        $scope.rawContent = item.content;
        $scope.action = '编辑';
        $scope.isAdd = false;
        $scope.modal.show();
    };

    $scope.saveItem = function() {
        if ($scope.isAdd) {
            if(!$scope.newItem.content || !$scope.newItem.title){
                showMsgService.showMsg("标题和内容不能为空");
                return;
            }
            noteList.addItem($scope.newItem);
            $scope.newItem = {};
        } else {
            if(!$scope.newItem.content || !$scope.newItem.title){
                showMsgService.showMsg("标题和内容不能为空");
                return;
            }
            noteList.updateItem($scope.newItem);
            $scope.newItem = {};
        }
        $scope.modal.hide();
    };

    $scope.deleteItem = function() {
        noteList.removeItem($scope.newItem);
        $scope.modal.hide();
    };

    $scope.cancleItem = function() {
        $scope.newItem.title = $scope.rawTitle;
        $scope.newItem.content = $scope.rawContent;
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
});
