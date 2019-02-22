import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native';
import {Actions}from 'react-native-router-flux'
import { Button } from 'react-native-elements'
const remote = 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/3604355/910/923/m1/fpnw/wm1/bjoam9cdygtsufpxsqvyi1qufxiisvlcez5z6ct3ls2ktw6amxyl1hk1ccr4dewc-.jpg?1511163800&s=d98c8baee29b80a1e60d2c0823887dca';


export default class RecipeType extends React.Component{
  render(){

    const goToVege = () => Actions.listR({title: 'Vegetarian'});
    const goToFast = () => Actions.listR({title: 'Fast Food'});
    const goToHth = () => Actions.listR({title: 'Healthy'});
    

    return(

      <ImageBackground
            style={{
              flex: 1,
            }}
            source={{ uri: remote }}
          >
      <View style={styles.container}>
      
          <Button large backgroundColor="#f4511e" rounded fontSize = {20} fontWeight= 'bold' onPress={goToVege} title="VEGETARIAN"/>
          <Button large backgroundColor="#fb8c00" rounded fontSize = {20} fontWeight= 'bold' onPress={goToFast} title="FAST FOOD"/>
          <Button large backgroundColor="#ffb300" rounded fontSize = {20} fontWeight= 'bold' onPress={goToHth} title="HEALTHY"/>          
      </View>
      </ImageBackground>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"space-around",
    padding: 10,
  },
});
