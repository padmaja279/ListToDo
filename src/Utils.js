let Utils = {

  //This function helps to generate unique IDs for each todoItem in the repository
  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  },

  // This function helps to move the items from fromIndex to toIndex positions
  move(array, fromIndex, toIndex) {
    return array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
  },

  // This function helps in searching for "todo" item in item list "todoList"
  findTodo(todo, todoList) {
    return todoList.find((item) => item.title.toLowerCase() === todo.title.toLowerCase());
  }
};

module.exports = Utils;