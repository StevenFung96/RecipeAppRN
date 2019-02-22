import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Modal,
  TextInput,
  Alert,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import {Actions}from 'react-native-router-flux';
import { Button } from 'react-native-elements'
import firebase from './firebase';

const remote = 'http://l.rgbimg.com/cache1oCOq1/users/b/ba/ba1969/600/mxc1dae.jpg';

export default class RecipeDetails extends React.Component{

  constructor(props){
    super(props);
    this.state={

      modalVisible: false,
      itemTitle: this.props.title,
      itemIng: this.props.ing,
      itemSteps: this.props.steps,
      itemKey: this.props._key,
      itemType: this.props.types
    };
    
    this.vegeRef= this.getRef().child('Vegetarian');
    this.fastRef= this.getRef().child('Fast Food');
    this.hpRef = this.getRef().child('Healthy');
    this.vegeItemRef = this.vegeRef.child(this.state.itemKey);
    this.fastItemRef = this.fastRef.child(this.state.itemKey);
    this.hpItemRef = this.hpRef.child(this.state.itemKey);

  }


  setModalVisible(visible){
    this.setState({modalVisible:visible});
  }

  getRef(){
    return firebase.database().ref();
  }
  
  updateItem(){
    this.setModalVisible(true);
  }

  render(){

    return(
      <View style={styles.container}>
            <Modal
                visible={this.state.modalVisible}
                animationType={'fade'}
                onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
                presentationStyle={'formSheet'}
            >
            <KeyboardAvoidingView style={styles.modalBgColor} behavior="padding">
            <Text style={styles.modalTitle}>~Edit Recipe Details~</Text>
                  <View style={styles.inputTextContainer} >
                  <TextInput
                    style={styles.inputText}
                    placeholderTextColor="#ffffff"
                    underlineColorAndroid='transparent'
                    multiline = {true}
                    value={this.state.itemTitle}
                    onChangeText ={(itemTitle) => this.setState({itemTitle})}

                  />
                  </View>
                  <View style={styles.inputTextContainer} >
                  <TextInput
                    style={styles.inputText}
                    placeholderTextColor="#ffffff"
                    underlineColorAndroid='transparent'
                    multiline = {true}  
                    value={this.state.itemIng}
                    onChangeText ={(itemIng) => this.setState({itemIng})}
                    
                  />
                  </View>
                  <TextInput
                    style={styles.inputText}
                    placeholderTextColor="#ffffff"
                    underlineColorAndroid='transparent'
                    multiline = {true}
                    value={this.state.itemSteps}
                    onChangeText ={(itemSteps) => this.setState({itemSteps})}
                    
                  />

              <View style={styles.modalContainer}>
                
                  <Button backgroundColor ="#fb8c00" rounded onPress={() => {
                    if(this.state.itemTitle!=='' && this.state.itemIng!=='' && this.state.itemSteps!=='' )
                    {
                      if(this.state.itemType === 'Vege'){
                      
                        this.vegeItemRef.update({title:this.state.itemTitle, ing:this.state.itemIng, steps:this.state.itemSteps});
                        this.setModalVisible(!this.state.modalVisible)
                        Actions.pop();
                      }
                      if(this.state.itemType === 'Fast Food'){
                      
                        this.fastItemRef.update({title:this.state.itemTitle, ing:this.state.itemIng, steps:this.state.itemSteps});
                        this.setModalVisible(!this.state.modalVisible)
                        Actions.pop();
                      }
                      if(this.state.itemType === 'Healthy'){
                        
                        this.hpItemRef.update({title:this.state.itemTitle, ing:this.state.itemIng, steps:this.state.itemSteps});
                        this.setModalVisible(!this.state.modalVisible)
                        Actions.pop();
                      }
                    }
                    else
                    {
                      Alert.alert("Missing Information!\nPlease Enter All the Values.");
                    }  

                  }}
                      title="Save Recipe"
                  >
                  </Button>

                  <View style={styles.innerContainer}>
                  <Button
                      backgroundColor ="#f4511e" rounded
                      onPress={() => this.setModalVisible(!this.state.modalVisible)}
                      title="Cancel"
                  >
                  </Button>
                </View>
              </View>
              </KeyboardAvoidingView>
            </Modal>


            <ImageBackground
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingVertical: 35 
                
              }}
              source={{ uri: remote }}
            >
            <ScrollView style={styles.container2} showsVerticalScrollIndicator={false}>
                <Text style={styles.heading1}>
                  Ingredients
                </Text>
                <Text style={styles.heading2}>
                  {this.state.itemIng}
                </Text>

                <Text style={styles.heading1}>
                  Steps
                </Text>
                <Text style={styles.heading2}>
                  {this.state.itemSteps}
                </Text>
            </ScrollView>
            </ImageBackground>

        <View style={styles.action}>
              <TouchableHighlight
                underlayColor='#24ce84'
                onPress={this.updateItem.bind(this)}
              >
                <Text style = {styles.actionText}>Update Recipe</Text>
              </TouchableHighlight>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  container1: {
    flex:1,
    padding: 10,
  },
  container2: {
    paddingLeft: 22,
    paddingRight: 5
    
  },
  heading1: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  heading2: {
    padding: 20,
    fontFamily: "vincHand",
    fontSize: 18,
  },
  action: {
    backgroundColor: '#ffab40',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  actionText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  modalBgColor:{
    backgroundColor: '#006064',
    flex:1,
  },
  modalContainer: {
    flex: 1,
    paddingTop: 30,
  },
  innerContainer: {
    flex: 1,
    paddingTop: 15,
    
  },
  modalTitle:{
    fontSize: 25,
    color: '#fb8c00',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 15,
    paddingTop: 15
  },
  inputText:{
    borderColor: 'gray',
    borderWidth: 1, 
    color : "white",
    borderRadius: 10,
    padding : 10
  },
  inputTextContainer:{
    paddingBottom: 15,  
  }
});


/*
import { Scene, Router} from 'react-native-router-flux';

import UpdateRecipe from './UpdateRecipe';
import Details from './Details';

const TabIcon=({selected, title})=>{
  return(
    <Text style={{color:selected ? 'red':'black'}}>{title}</Text>
  );
};

export default class RecipeDetails extends React.Component{
    render(){
      return(
          <Router>
            <Scene key="root">
              <Scene
                key="tabbar"
                tabs={true}
                tabBarStyle={{backgroundColor:'#FFFFFF'}}
              >

                <Scene key="phase"title="phase"icon={TabIcon}>
                    <Scene key="details" component={Details} title="Details" initial />
                </Scene>

                <Scene key="phase2"title="phase2"icon={TabIcon}>
                    <Scene key="update" component={UpdateRecipe} title="Update"  />
                </Scene>

              </Scene>
            </Scene>
          </Router>
      );
    }
  }
/////////////////////////////////////////////////
  
                    this.vegeRef.once('value', function(snapshot){

                      if(snapshot.hasChild(this.state.itemKey)){

                        

                      }
                    });
               
  */

  