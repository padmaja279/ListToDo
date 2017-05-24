import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, View, Text, Image} from 'react-native';
import Camera from 'react-native-camera'; // Used for accessing native camera
import TodoFunc from './TodoFunc'; // importing functions from TodoFunc.js
import Utils from './Utils'; // importing functions from Utils.js
 
 //Class Declaration
class CameraPage extends Component{

  //Constructor
  constructor(props) {
    super(props);
    this.switchCamera = this.switchCamera.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.state = {
      path: 'null'
    };
  }

  //Settings for the navigation screen title and navigation bar in CameraPage Screen
   static navigationOptions = ({ navigation, screenProps }) => ({
       title: "Camera",
       headerTintColor: '#8B4513',
       headerStyle: {
         backgroundColor:"white"
       }
   });

  //This function helps to switch the camera mode to "Front Camera" or "Back Camera"
  switchCamera() {
    var state = this.state;
    state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(state);
  }
 
  //This function helps capturing a picture using native camera and update the imageLoc parameter for the todoList, which is later used to update the images on HomeScreen
  takePicture() {
    const options = {
      captureMode: Camera.constants.CaptureMode.still,
      captureTarget: Camera.constants.CaptureTarget.disk
    };
    this.camera.capture()
      .then((data) => {
        console.log(data);
        this.setState({ path: data.path })
        let dataSelected = TodoFunc.findSelected();
        console.log("state path is " + this.state.path)

        for (var i = 0; i < dataSelected.length; i++) {
          TodoFunc.updateImage(dataSelected[i], this.state.path);
          console.log ("i is "+ i + " imageloc is "+dataSelected[i].imageLoc);
        }
      })
      .catch(err => console.error(err));
  }
 
  //Render function for Camera Screen
  render() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.container}
        captureTarget={Camera.constants.CaptureTarget.disk}
        captureMode= {Camera.constants.CaptureMode.still}>
        <View style={styles.buttonBar}>
          <TouchableHighlight onPress={this.switchCamera}>
            <Image source={require('./icons/flip.png')} style = {{width: 60, height: 40}}/>
              </TouchableHighlight>
                <Text> text=""</Text>
              <TouchableHighlight onPress={this.takePicture}>
            <Image source={require('./icons/camera.png')} style = {{width: 30, height: 30}}/>
          </TouchableHighlight>
        </View>
      </Camera>
    );
  }
}
 
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    buttonBar: {
        flexDirection: "row",
        position: "absolute",
        bottom: 25,
        right: 0,
        left: 0,
        justifyContent: "center"
    }
});
 
module.exports = CameraPage;