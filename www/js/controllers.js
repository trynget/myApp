angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicModal, $state, $rootScope) {
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
        $rootScope.shares = [{
            title: "来分享吧",
            content: "这里汇集了大家分享的有趣的东西，也欢迎你来贡献力量。"
        },{
            title: "习近平将赴法国出席气候变化巴黎大会",
            content: "新华社北京11月25日电　外交部发言人陆慷25日宣布，应法兰西共和国总统奥朗德和气候变化巴黎大会主席法比尤斯邀请，国家主席习近平将于11月29日至11月30日赴法国出席气候变化巴黎大会开幕活动。应津巴布韦共和国总统穆加贝邀请，国家主席习近平将于12月1日至2日对津巴布韦进行国事访问。应南非共和国总统祖马邀请，国家主席习近平将于12月2日至5日对南非进行国事访问，并赴约翰内斯堡主持中非合作论坛峰会。"
        }];

        /*** 到课表页**/
        $scope.toSchedule = function() {
            $state.go('schedule');
        };
        /*** 到笔记页**/
        $scope.toNote = function() {
            $state.go('tab.dash-note');
        };
        /*** 到日期计数页**/
        $scope.toDateCounter = function() {
            $state.go('tab.dash-dateCounter');
        };
        /*** 到分享页**/
        $scope.toShare = function() {
            $state.go('tab.dash-share');
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
    .controller('ShareCtrl',function($scope, $rootScope) {
        console.log($rootScope.shares)
    })

    .controller('ShareDetailCtrl',function($scope, $stateParams,$rootScope) {
        $scope.share = $rootScope.shares[$stateParams.shareId];
    })

    //时间提醒控制器
    .controller('DateCounterCtrl',function($scope, $rootScope, $ionicModal, dateCounter, showMsgService) {
        $rootScope.datelist = dateCounter.all();
        function getDateDiff(theDate){
            var startTime = new Date(theDate);
            var endTime = new Date();
            var days = (startTime - endTime)/(1000*60*60*24);
            return  Math.ceil(days);
        }
        $rootScope.datelist.forEach(function(data){
            data.remainDays = getDateDiff(data.date);
            console.log(data);
        });

        $scope.remove = function(index) {
            $rootScope.datelist.splice(index,1);
            console.log(index);
        };

        $ionicModal.fromTemplateUrl('add-or-edit-date.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.showAddItemModal = function() {
            $scope.newItem = {};
            $scope.modal.show();
        };
        $scope.saveItem = function() {
            if(!$scope.newItem.date || !$scope.newItem.title){
                showMsgService.showMsg("标题和内容不能为空");
                return;
            }
            $scope.newItem.remainDays = getDateDiff($scope.newItem.date);
            $rootScope.datelist.push($scope.newItem);
            $scope.newItem = {};
            $scope.modal.hide();
        };
        $scope.cancleItem = function() {
            $scope.newItem = {};
            $scope.modal.hide();
        };
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });


    })
    //时间提醒详情控制器
    .controller('DateCounterDetailCtrl',function($scope, $rootScope, $stateParams) {
        $scope.dataDetail = $rootScope.datelist[$stateParams.dataId];
        console.log($scope.dataDetail);
    })

    .controller('NoteCtrl',function($scope, $ionicModal, $rootScope, showMsgService, noteList) {
    noteList.getAllItems().then(function(data) {
        $scope.notes = data;
    });

    $scope.shareNote = function(note) {
        $rootScope.shares.push(note);
        showMsgService.showMsg("分享成功！");
    };

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
