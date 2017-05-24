/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Button,
  Image
} from 'react-native';
import {StackNavigator} from 'react-navigation'; // Used to navigate between home and camera screens
import SortableListView from 'react-native-sortable-listview'; // Used to display Todo Item list
import Utils from './src/Utils'; // Importing functions from Utils.js
import TodoFunc from './src/TodoFunc'; // Importing functions from TodoFunc.js
import ListViewItem from './src/ListViewItem'; // importing ListViewItem from ListViewItem.js to represent todo item
import OmniBox from './src/OmniBox'; // importing Omnibox from Omnibox.js used for text inout
import CameraPage from './src/CameraPage'; // importing CameraPage from CameraPage.js used for cpaturing image

let dataList = TodoFunc.findAll();
var dataListOrder = getOrder(dataList);

// This function returns Object keys list
function getOrder(list) {
  return Object.keys(list);
}

//This fucntion that moves listitem from fromIndex to toIndex postion and refreshes the view
function moveOrderItem(listView, fromIndex, toIndex) {
  Utils.move(dataListOrder, parseInt(fromIndex), parseInt(toIndex));
  if (listView.forceUpdate) listView.forceUpdate();
}

//Class Declaration for HomeScreen
class HomeScreen extends Component {

//Settings for the navigation screen title and navigation bar in HomeScreen page
static navigationOptions = ({ navigation, screenProps }) => ({
       title: "ToDo List",
       headerTintColor: "#8B4513",
       headerStyle: {
         backgroundColor:"white"
       }
   });

  //Constructor
  constructor(props) {
    super(props);
    this.updateDataList = this.updateDataList.bind(this);
    this._onCompletedChange = this._onCompletedChange.bind(this);
    this._openCamera = this._openCamera.bind(this);
    this.state = {
      dataList: dataList
    };
  }

  //This function is invoked when the component is mounted
  componentDidMount () {
    this._onCompletedChange();
  }

  //This function is invoked when the component receives new
  componentWillReceiveProps(props) {
    this.setState({
      dataList: dataList
    })
  }
  
  //This function updates the datalist to input datalist
  updateDataList(dataList) {
    dataListOrder = getOrder(dataList);
    this.setState({
      dataList: dataList
    });
  }

  //This function does force render of the screen
  _onCompletedChange() {
    if (this.forceUpdate) this.forceUpdate();
  }

  // This function is called to navigate to Camera Screen
  _openCamera() {
    this.props.navigation.navigate('Second');
  }

  //Render function for HomeScreen
  render() {

    let listView = (<View></View>);
    if (this.state.dataList.length) {
      listView = (
       <SortableListView
          ref='listView'
          style={{flex: 1}}
          data={this.state.dataList}
          order={dataListOrder}
          onRowMoved={e => moveOrderItem(this, e.from, e.to)}
          renderRow={(dataItem, section, index) => <ListViewItem data={dataItem} onCompletedChange={this._onCompletedChange} updateDataList={this.updateDataList}/>}
        />
      );
    }

    return (
      <Image source={require('./src/icons/todo.png')} style = {styles.backgroundImage} blurRadius={5}>
        <View style={{flex: 1, marginLeft: 10, marginRight: 10, backgroundColor: 'transparent'}}>
          <OmniBox  
            data={Array.from(dataList)}
            updateDataList={this.updateDataList}/>
          <Button
            onPress = { () =>
              this._openCamera()
            }
            title = 'Select item(s) and Add Photo'
            style = {{backgroundColor: 'white', borderRadius: 1}}
            color='#99ff00'>
          </Button>
          {listView}
          <Button
            onPress = { () =>
              this._onCompletedChange()
            }
            title = 'Refresh'
            style = {{backgroundColor: 'white', borderRadius: 1}}
            color= '#99ff00'>
          </Button>
        </View>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
});

//Delcaring stack navigator for Homescreen and Camerapage screens
const ListToDo = StackNavigator({

  Home: {
    screen: HomeScreen
  },
  Second: {
    screen: CameraPage
  },
}, {
  mode: 'modal',
  tintColor: 'black'
});

AppRegistry.registerComponent('ListToDo', () => ListToDo);
