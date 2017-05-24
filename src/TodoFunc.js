import Realm from 'realm';
import TodoItem from './TodoItem';

//Realm DB Schema Definition
let TodoSchema = {
  name: 'Todo',
  primaryKey: 'id',
  properties: {
      id: {type: 'string', indexed: true},
      title: 'string',
      completed: 'bool',
      createdAt: 'date',
      updatedAt: 'date',
      imageLoc: 'string',
      selected: 'bool',
  }
}

// Migration function used as the 'selected' parameter is newly added to the Real DB
let repository = new Realm({
    schema: [TodoSchema],
    schemaVersion: 2,
    migration(oldRealm, newRealm)  {
      if (oldRealm.schemaVersion < 1) {
        var oldObjects = oldRealm.objects('Todo');
        var newObjects = newRealm.objects('Todo');

        for (var i = 0; i < oldObjects.length; i++) {
          newObjects[i].selected = false;
        }
      }
    }
});

let TodoFunc = {
  //This function helps us to sort the todoList display, The First sorting is done based on completion/non-completion and second parameter used for sorting is update time
  findAll: function(sortBy) {
    if (!sortBy) sortBy = [['completed', false], ['updatedAt', true]];
    var objList = repository.objects('Todo').sorted(sortBy);

    for (var i = 0; i < objList.length; i++) {
      if (objList[i].selected) {
        repository.write (() => {
          objList[i].selected = false;
        })
      } 
    }
    return objList;
  },

  //This function helps to filter the todolist Items that are currently selected on HomeScreen
  findSelected: function() {
    return (repository.objects('Todo').filtered("selected = true"));
  },

  //This function helps us to update the create a new todolist Item incase it doesnot exist before
  save: function(todo) {
    if (repository.objects('Todo').filtered("title = '" + todo.title + "'").length) return;

    repository.write(() => {
      todo.updatedAt = new Date();
      repository.create('Todo', todo);
    })
  },

  //This function helps us to update realm DB parameter and also updates the updateAt parameter to current time
  update: function(todo, callback) {
    if (!callback) return;
    repository.write(() => {
      callback();
      todo.updatedAt = new Date();
    })
  },

  // This function sets DB parameter without updating the time, this is used for setting select parameter 
  select: function(todo, callback) {
    if (!callback) return;
    repository.write(() => {
      callback();
    })
  },

  // This function helps to delete a todo item in repository
  delete: function(todo) {
    let result = repository.objects('Todo').find(row=>{
      return row.title==todo.title
    })
    repository.write(()=>{
      repository.delete(result)
    })
  },

  //This function helps in updating the imageUri parameter while updating the updateAt time
  updateImage: function(todo, imageUri) {
    repository.write(()=>{
      todo.imageLoc = imageUri;
      todo.updatedAt = new Date();
    })
  }

};

module.exports = TodoFunc;