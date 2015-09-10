angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

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

.service('todoList', function ($q) {
        var _db;
        var _data;

        //function dateFix(result) {
        //    var _data = [];
        //    result.forEach(function (each) {
        //        _data.push(each.doc);
        //    });
        //    _db.changes({ live: true, since: 'now', include_docs: true})
        //        .on('change', onDatabaseChange);
        //    return _data;
        //}

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

        return {
            initDB: function () {
                _db = new PouchDB('todoList', {adapter: 'websql'});
            },
            getAllItems: function () {
                if (!_data) {
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
                } else {
                    // Return cached data as a promise
                    return $q.when(_data);
                }
            },
            addItem: function (item) {
                return $q.when(_db.post(item));
            },
            removeItem: function (item) {
                return $q.when(_db.remove(item));
            }
        }
});
