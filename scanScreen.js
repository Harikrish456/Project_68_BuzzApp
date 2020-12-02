import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import {createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import InstagramScreen from './in';
import FaceBookScreen from './fb';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {

 constructor(){
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal'
     }
    }

    getCameraPermission = async() => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ 
        hasCameraPermissions: status === 'granted',
        buttonState: 'clicked',
        scanned: false
     })
    }

    handleBarcodeScanned = async({type, data}) => {
    this.setState({
        scannedData: data,
        scanned: true,
        buttonState: 'normal'
     })
    }  

   render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if(buttonState === 'clicked' && hasCameraPermissions === true){
     return (
        <BarCodeScanner 
        onBarCodeScanned = {
          scanned?undefined:this.handleBarcodeScanned
        }
        style = {StyleSheet.absoluteFillObject}
        />
  );
    }

    else if(buttonState === 'normal'){
        return(
          <View style = {styles.container}>
            <Text style = {styles.displayText}> {
              hasCameraPermissions === true?this.state.scannedData: 'request camera permission'
            } </Text>
  
            <TouchableOpacity
            onPress = {
              this.getCameraPermission
            }
            style = {styles.scannedButton}
            >
              <Text style = {styles.buttonText}> scan QR code </Text>
               </TouchableOpacity>
          </View>
        );
      }
}
}
const styles = StyleSheet.create({
    container: { 
      flex: 1, 
     justifyContent: 'center', 
     alignItems: 'center'
    }, 

     displayText:{ 
       fontSize: 15, 
     textDecorationLine: 'underline' 
   },
     scanButton:{ backgroundColor: '#2196F3',
     padding: 10, margin: 10 },

     buttonText:{ 
       fontSize: 20, 
     } });