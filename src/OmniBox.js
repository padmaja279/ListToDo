import React, { Component } from 'react';
import { TextInput,StyleSheet, Dimensions, View} from 'react-native';
import TodoFunc from './TodoFunc';
import TodoItem from './TodoItem';
import Utils from './Utils';

//class declaration for the Text Input area
class OmniBox extends Component {
  //constructor
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  //This function is invoked when the component is mounted
  componentWillMount() {
    this.setState({
      newValue: ''
    });
  }

  //This function helps in filtering the Item list based on the input entered in textInput
  onChange(event){
    var title = event.nativeEvent.text;
    var dataList = this.props.data.filter((item) => item.title.match(new RegExp('.*' + title +'.*', 'gi')));

    this.setState({
      newValue: title
    });
    this.props.updateDataList(dataList);
  }

  // This function adds the entered todo item to the list and is called when the user uses the 'return' button 
  onKeyPress(event){
    if (event.nativeEvent.key == 'Enter' && this.state.newValue) {
      var newDataItem = new TodoItem(this.state.newValue);

      var dataList = this.props.data;
      var dataItem = Utils.findTodo(newDataItem, dataList);
      if(dataItem) {
        Utils.move(dataList, (dataList.indexOf(dataItem)), 0);

        this.setState({
          newValue: ''
        });
        this.props.updateDataList(dataList);
        return;
      }

      dataList.unshift(newDataItem);
      TodoFunc.save(newDataItem);

      this.setState({
        newValue: ''
      });
      this.props.updateDataList(dataList);
    }
  }

  //Render function for the Text Input Area
  render() {
    return (
      <View>
        <TextInput style={styles.input}
          placeholder='Add a todo or Search'
          blurOnSubmit={false}
          value={this.state.newValue}
          onKeyPress={this.onKeyPress}
          onChange={this.onChange}>
        </TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 36, 
    padding: 4, 
    marginBottom: 1, 
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: '#eee', 
    borderRadius: 8, 
    backgroundColor: '#fff',
    marginTop: 10
  }
});

module.exports = OmniBox;