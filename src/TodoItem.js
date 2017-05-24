import React, {Component} from 'react';
import Utils from './Utils';

//Class Declaration for todo item
class TodoItem extends Component {
  constructor(title, completed) {
  	super();
    this.id = Utils.guid();
    this.title = title;
    this.completed = completed || false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.imageLoc = '';
    this.selected = false;
  }
}

module.exports = TodoItem;