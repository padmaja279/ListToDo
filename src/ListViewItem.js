import React, {Component} from 'react';
import {TouchableHighlight, View, Text, Image} from 'react-native';
import Swipeout from 'react-native-swipe-out'; // Used to delete todo item
import DoubleClick from 'react-native-double-click'; // used to change complete status
import TodoFunc from './TodoFunc'; // importing todo functions
import CheckBox from 'react-native-check-box'; // checkbox for selecting todo items for updating image

//Class Declaration
class ListViewItem extends Component {

  //constructor
  constructor(props) {
    super(props);
    this.completeNote = this.completeNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.state = {
      data: this.props.data
    };
  }

  // This function is invoked when the component receives new props
  componentWillReceiveProps(props) {
    this.setState({
      data: props.data
    })
  }

  //This function toggles completed state of ToDo Item and is initiated after a doubleclick on a ListItem
  completeNote() {
    var data = this.state.data;
    TodoFunc.update(data, () => {
      data.completed = !data.completed;
    });
    this.setState({
       data: data
    });
    this.props.onCompletedChange();
  }

  //This function deletes the ToDo Item from the repository and rerender is initiated on Homescreen for updating the UI
  deleteNote() {
    var data = this.state.data;
  //  alert(data.imageLoc);
    TodoFunc.delete(data);

    let dataList = TodoFunc.findAll();
    this.props.updateDataList(dataList);
  }

  //This function is initiated when a checkbox for a ToDo item is selected i.e., updates the selected parameter to 'true' 
  //This is used later to update image of all the selected, when capture is taken
  selectNote() {
    var data = this.state.data;
    TodoFunc.select(data, () => {
      data.selected = !data.selected;
    });
    this.setState({
       data: data
    });
    //alert(this.state.data.imageLoc)
    this.props.onCompletedChange();
    }

  //Render function for each ListView Item
  render() {
    let data = this.props.data;
    let color = data.completed ? '#C5C8C9' : '#000';
    let textDecorationLine = data.completed ? 'line-through' : 'none';
    let swipeBtns = [{ 
      text: 'Delete', 
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 1, 0.6)',
      onPress: () => {this.deleteNote()}
    }];

    return (
    <Swipeout right={swipeBtns}
      autoClose = {true}
      backgroundColor= 'white'
      style = {{borderWidth: 0.5, marginTop: 5, borderRadius: 10}}>
        <DoubleClick onClick={this.completeNote}>
            <Text style={{fontSize:12, marginLeft: 10}}>{data.updatedAt.toLocaleString()}</Text>
            <View style={{ flexDirection: 'row'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <CheckBox style={{ paddingRight: 10, marginLeft: 10}} defaultChecked={false} onClick = {this.selectNote}/>
                <Text style={{fontSize:18, textDecorationLine: textDecorationLine}}>{data.title}</Text>
              </View>
              <View>
                <TouchableHighlight>
                  <Image source={{uri:data.imageLoc}} style = {{width: 50, height: 50, marginRight: 10, marginBottom: 10}}/>
                </TouchableHighlight>
              </View>
            </View>
        </DoubleClick>
    </Swipeout>
    )
  }
}

module.exports = ListViewItem;