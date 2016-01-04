angular.module('starter.services', [])

.factory('Chats', function($http) {
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.'
  }];
  //var infoUrl = "http://localhost/istudy1.0/index.php/pushNotifications?callback=JSON_CALLBACK";
  //var chats;
  //$http.jsonp(infoUrl).
  //    success(function(res){
  //    console.log(res);
  //    chats = res.msg;
  //}).error(function() {
  //        console.log('error');
  //    });

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

    .service('dateCounter',function() {
        var dateList = [{
            title: "大创答辩",
            date: "2016-1-6"
        },{
            title: "春节放假",
            date: "2016-2-4"
        },{
            title: "元旦放假回来",
            date: "2016-1-3"
        }];
        return {
            all: function() {
                return dateList;
            },
            remove: function(date) {
                dateList.splice(dateList.indexOf(date),1);
            },
            add: function(date) {
                dateList.push(date);
            }
        }
    })

.service('todoList', function ($q) {
        var _db;
        var _data;

        return {
            initDB: function () {
                _db = new PouchDB('todoList', {adapter: 'websql'});
            },
            getAllItems: function () {
                    return $q.when(_db.allDocs({ include_docs: true}))
                        .then(function(docs) {

                            // Each row has a .doc object and we just want to send an
                            // array of birthday objects back to the calling controller,
                            // so let's map the array to contain just the .doc objects.
                            _data = docs.rows.map(function(row) {
                                // Dates are not automatically converted from a string.
                                row.doc.Date = new Date(row.doc.Date);
                                return row.doc;
                            });

                            // Listen for changes on the database.
                            _db.changes({ live: true, since: 'now', include_docs: true})
                                .on('change', onDatabaseChange);

                            return _data;
                        });
            },
            addItem: function (item) {
                return $q.when(_db.post(item));
            },
            updateItem: function(item) {
                return $q.when(_db.put(item));
            },
            removeItem: function (item) {
                return $q.when(_db.remove(item));
            }
        };
        function onDatabaseChange(change) {
            var index = findIndex(_data, change.id);
            var data = _data[index];

            if (change.deleted) {
                if (data) {
                    _data.splice(index, 1); // delete
                }
            } else {
                if (data && data._id === change.id) {
                    _data[index] = change.doc; // update
                } else {
                    _data.splice(index, 0, change.doc); // insert
                }
            }
        }

        function findIndex(array, id) {
            var low = 0, high = array.length, mid;
            while (low < high) {
                mid = (low + high) >>> 1;
                array[mid]._id < id ? low = mid + 1 : high = mid
            }
            return low;
        }
})

    .service('noteList', function ($q) {
        var _db;
        var _data;

        return {
            initDB: function () {
                _db = new PouchDB('noteList', {adapter: 'websql'});
            },
            getAllItems: function () {
                return $q.when(_db.allDocs({ include_docs: true}))
                    .then(function(docs) {
                        _data = docs.rows.map(function(row) {
                            // Dates are not automatically converted from a string.
                            row.doc.Date = new Date(row.doc.Date);
                            return row.doc;
                        });
                        // Listen for changes on the database.
                        _db.changes({ live: true, since: 'now', include_docs: true})
                            .on('change', onDatabaseChange);
                        return _data;
                    });
            },
            addItem: function (item) {
                return $q.when(_db.post(item));
            },
            updateItem: function(item) {
                return $q.when(_db.put(item));
            },
            removeItem: function (item) {
                return $q.when(_db.remove(item));
            }
        };
        function onDatabaseChange(change) {
            var index = findIndex(_data, change.id);
            var data = _data[index];

            if (change.deleted) {
                if (data) {
                    _data.splice(index, 1); // delete
                }
            } else {
                if (data && data._id === change.id) {
                    _data[index] = change.doc; // update
                } else {
                    _data.splice(index, 0, change.doc); // insert
                }
            }
        }
        function findIndex(array, id) {
            var low = 0, high = array.length, mid;
            while (low < high) {
                mid = (low + high) >>> 1;
                array[mid]._id < id ? low = mid + 1 : high = mid
            }
            return low;
        }
    })

.service('showMsgService',["$ionicLoading", function ($ionicLoading) {
    /**
     * 弹框提示
     * @param msg 提示信息
     */
    this.showMsg = function (msg) {
        $ionicLoading.show({
            template: '<span style="color: white">' + msg + '</span>',
            noBackdrop:true,
            duration: 1500
        });
    }

}]);
