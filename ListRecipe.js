import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Modal,
  TextInput,
  ImageBackground,
  Alert,
} from 'react-native';
import {Actions}from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';
import { Button } from 'react-native-elements'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Makiko } from 'react-native-textinput-effects';
import firebase from './firebase';

const remote = 'http://l.rgbimg.com/cache1oCOq1/users/b/ba/ba1969/600/mxc1dae.jpg';

export default class ListRecipe extends React.Component{

    constructor(){
      super();
      let ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
      this.state={
        text:'',
        ingText:'',
        stepsText:'',
        vegeItemDataSource: ds,
        fastItemDataSource: ds,
        hpItemDataSource: ds,
        modalVisible: false
      }
      
      this.vegeRef = this.getRef().child('Vegetarian');
      this.fastRef = this.getRef().child('Fast Food');
      this.hpRef = this.getRef().child('Healthy');

      this.vegeRenderRow = this.vegeRenderRow.bind(this);
      this.fastRenderRow = this.fastRenderRow.bind(this);
      this.hpRenderRow = this.hpRenderRow.bind(this);
      this.pressRow = this.pressRow.bind(this);
    }
    

    setModalVisible(visible){
      this.setState({modalVisible:visible});
    }

    getRef(){
      return firebase.database().ref();
    }

    componentWillMount(){

      this.getVegeItems(this.vegeRef);
      this.getFastItems(this.fastRef);
      this.getHpItems(this.hpRef);
 
    }
    componentDidMount(){

      this.getVegeItems(this.vegeRef);
      this.getFastItems(this.fastRef);
      this.getHpItems(this.hpRef);

    }

    getVegeItems(vegeRef){
      //let items = [{title:'Item One'},{title:'Item Two'}];
      vegeRef.on('value',(snap) =>{
        let vegeItems =[];
        snap.forEach((child) => {
          vegeItems.push({
            title: child.val().title,
            ing:child.val().ing,
            steps:child.val().steps,
            types:child.val().types,
            _key:child.key,
            
          });
        });
        this.setState({
          vegeItemDataSource: this.state.vegeItemDataSource.cloneWithRows(vegeItems)
        });
      });
    }

    getFastItems(fastRef){
      
      fastRef.on('value',(snap) =>{
        let fastItems =[];
        snap.forEach((child) => {
          fastItems.push({
            title: child.val().title,
            ing:child.val().ing,
            steps:child.val().steps,
            types:child.val().types,
            _key:child.key,
            
          });
        });
        this.setState({
          fastItemDataSource: this.state.fastItemDataSource.cloneWithRows(fastItems)
        });
      });
    }

    getHpItems(hpRef){
      
      hpRef.on('value',(snap) =>{
        let hpItems =[];
        snap.forEach((child) => {
          hpItems.push({
            title: child.val().title,
            ing:child.val().ing,
            steps:child.val().steps,
            types:child.val().types,
            _key:child.key,
            
          });
        });
        this.setState({
          hpItemDataSource: this.state.hpItemDataSource.cloneWithRows(hpItems)
        });
      });
    }

    pressRow(item){
      Actions.recipeD(item);
    }


    /////////////////////////////////////////VEGETARIAN ROW ITEMS/////////////////////////////////////////////////////////////////

    vegeRenderRow(item){
      let swipeBtns =[
      {
        text:'Delete',
        backgroundColor:'red',
        underlayColor:'rgba(0,0,0,1,0.6)',
        onPress:()=>{this.vegeRef.child(item._key).remove()}
      },
      {
        text:'View',
        backgroundColor:'blue',
        underlayColor:'rgba(0,0,0,1,0.6)',
        onPress:()=>{this.pressRow(item)}
      }
    ];

      return(
        <Swipeout right={swipeBtns}
          autoClose={true}
          backgroundColor='transparent'>
          <TouchableHighlight onPress={() => {
              this.pressRow(item);
          }}>
            <View style={styles.li}>
              <Text style= {styles.liText}>
                {item.title}
              </Text>
            </View>
          </TouchableHighlight>
        </Swipeout>
      );
    }

    /////////////////////////////////////////FAST FOOD ROW ITEMS/////////////////////////////////////////////////////////////////

    fastRenderRow(item){
      let swipeBtns =[
      {
        text:'Delete',
        backgroundColor:'red',
        underlayColor:'rgba(0,0,0,1,0.6)',
        onPress:()=>{this.fastRef.child(item._key).remove()}
      },
      {
        text:'View',
        backgroundColor:'blue',
        underlayColor:'rgba(0,0,0,1,0.6)',
        onPress:()=>{this.pressRow(item)}
      }
    ];

      return(
        <Swipeout right={swipeBtns}
          autoClose={true}
          backgroundColor='transparent'>
          <TouchableHighlight onPress={() => {
              this.pressRow(item);
          }}>
            <View style={styles.li}>
              <Text style= {styles.liText}>
                {item.title}
              </Text>
            </View>
          </TouchableHighlight>
        </Swipeout>
      );
    }

    /////////////////////////////////////////HEALTHY ROW ITEMS/////////////////////////////////////////////////////////////////

    hpRenderRow(item){
      let swipeBtns =[
      {
        text:'Delete',
        backgroundColor:'red',
        underlayColor:'rgba(0,0,0,1,0.6)',
        onPress:()=>{this.hpRef.child(item._key).remove()}
      },
      {
        text:'View',
        backgroundColor:'blue',
        underlayColor:'rgba(0,0,0,1,0.6)',
        onPress:()=>{this.pressRow(item)}
      }
    ];

      return(
        <Swipeout right={swipeBtns}
          autoClose={true}
          backgroundColor='transparent'>
          <TouchableHighlight onPress={() => {
              this.pressRow(item);
          }}>
            <View style={styles.li}>
              <Text style= {styles.liText}>
                {item.title}
              </Text>
            </View>
          </TouchableHighlight>
        </Swipeout>
      );
    }

    addItem(){
      this.setModalVisible(true);

    }


    render(){
      
    /////////////////////////////////////////VEGETARIAN//////////////////////////////////////////////////////////////////////

      if(this.props.title === 'Vegetarian'){

      return(
        
          <View style={styles.container}>
            <Modal
                visible={this.state.modalVisible}
                animationType={'slide'}
                onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
            >
            <View style={styles.modalBgColor} >
            <Text style={styles.modalTitle}>~Create A Vegetarian Recipe~</Text>
                  <View style={styles.inputTextContainer} >
                  <Makiko
                    label={'Title...'}
                    iconClass={FontAwesomeIcon}
                    iconName={'comment'}
                    iconColor={'white'}
                    inputStyle={{ color: 'green' }}
                    multiline = {true}
                    underlineColorAndroid='transparent'
                    onChangeText ={(text) => this.setState({text})}
                    value={this.state.text}
                    
                  />
                  </View> 
                  <View style={styles.inputTextContainer} >
                  <Makiko
                    label={'Ingredients...'}
                    iconClass={FontAwesomeIcon}
                    iconName={'comment'}
                    iconColor={'white'}
                    inputStyle={{ color: 'green' }}
                    multiline = {true}
                    underlineColorAndroid='transparent'
                    onChangeText ={(ingText) => this.setState({ingText})}
                    value={this.state.ingText}
                  />
                  </View>
                  <Makiko
                    label={'Steps...'}
                    iconClass={FontAwesomeIcon}
                    iconName={'comment'}
                    iconColor={'white'}
                    inputStyle={{ color: 'green' }}
                    multiline = {true}
                    underlineColorAndroid='transparent'
                    onChangeText ={(stepsText) => this.setState({stepsText})}
                    value={this.state.stepsText}
                  />
                  
              <View style={styles.modalContainer}>
                
                  <Button backgroundColor ="#fb8c00" rounded onPress={() => {

                    if(this.state.text!=='' && this.state.ingText!=='' && this.state.stepsText!=='' )
                    {
                      this.vegeRef.push({title:this.state.text, ing:this.state.ingText, steps:this.state.stepsText, types:'Vege'});
                      this.setState({text:'', ingText:'', stepsText:''})
                      this.setModalVisible(!this.state.modalVisible)
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
              </View>
            </Modal>

            <ImageBackground
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  paddingVertical:33
                }}
                source={{ uri: remote }}
              >
            <ListView 
              dataSource={this.state.vegeItemDataSource}
              renderRow={this.vegeRenderRow}
            />
            </ImageBackground>

            <View style={styles.action}>
              <TouchableHighlight
                underlayColor='#24ce84'
                onPress={this.addItem.bind(this)}
              >
                <Text style = {styles.actionText}>Add Recipe</Text>
              </TouchableHighlight>
            </View>

          </View>
          
      );
    }

    /////////////////////////////////////////FAST FOOD//////////////////////////////////////////////////////////////////////

    if(this.props.title === 'Fast Food'){

      return(
          <View style={styles.container}>
            <Modal
                visible={this.state.modalVisible}
                animationType={'slide'}
                onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
            >
            <View style={styles.modalBgColor} >
            <Text style={styles.modalTitle}>~Create A Fast Food Recipe~</Text>
                  <View style={styles.inputTextContainer} >
                  <Makiko
                    label={'Title...'}
                    iconClass={FontAwesomeIcon}
                    iconName={'comment'}
                    iconColor={'white'}
                    inputStyle={{ color: 'green' }}
                    multiline = {true}
                    underlineColorAndroid='transparent'
                    onChangeText ={(text) => this.setState({text})}
                  />
                  </View>
                  <View style={styles.inputTextContainer} >
                  <Makiko
                    label={'Ingredients...'}
                    iconClass={FontAwesomeIcon}
                    iconName={'comment'}
                    iconColor={'white'}
                    inputStyle={{ color: 'green' }}
                    multiline = {true}
                    underlineColorAndroid='transparent'
                    onChangeText ={(ingText) => this.setState({ingText})}
                  />
                  </View>
                  <Makiko
                    label={'Steps...'}
                    iconClass={FontAwesomeIcon}
                    iconName={'comment'}
                    iconColor={'white'}
                    inputStyle={{ color: 'green' }}
                    multiline = {true}
                    underlineColorAndroid='transparent'
                    onChangeText ={(stepsText) => this.setState({stepsText})}
                  />
              <View style={styles.modalContainer}>
                
                  <Button backgroundColor ="#fb8c00" rounded onPress={() => {

                    if(this.state.text!=='' && this.state.ingText!=='' && this.state.stepsText!=='' )
                    {
                      this.fastRef.push({title:this.state.text, ing:this.state.ingText, steps:this.state.stepsText,types:'Fast Food'});
                      this.setState({text:'', ingText:'', stepsText:''})
                      this.setModalVisible(!this.state.modalVisible)
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
              </View>
            </Modal>

            <ImageBackground
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  paddingVertical:33
                }}
                source={{ uri: remote }}
              >
            <ListView
              dataSource={this.state.fastItemDataSource}
              renderRow={this.fastRenderRow}
            />
            </ImageBackground>

            <View style={styles.action}>
              <TouchableHighlight
                underlayColor='#24ce84'
                onPress={this.addItem.bind(this)}
              >
                <Text style = {styles.actionText}>Add Recipe</Text>
              </TouchableHighlight>
            </View>

          </View>
      );
    }
    

    /////////////////////////////////////////HEALTHY//////////////////////////////////////////////////////////////////////


    if(this.props.title === 'Healthy'){

      return(
          <View style={styles.container}>
            <Modal
                visible={this.state.modalVisible}
                animationType={'slide'}
                onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
            >
            <View style={styles.modalBgColor} >
            <Text style={styles.modalTitle}>~Create A Healthy Recipe~</Text>
            <View style={styles.inputTextContainer} >
                  <Makiko
                    label={'Title...'}
                    iconClass={FontAwesomeIcon}
                    iconName={'comment'}
                    iconColor={'white'}
                    inputStyle={{ color: 'green' }}
                    multiline = {true}
                    underlineColorAndroid='transparent'
                    onChangeText ={(text) => this.setState({text})}
                  />
            </View>
            <View style={styles.inputTextContainer} >
                  <Makiko
                    label={'Ingredients...'}
                    iconClass={FontAwesomeIcon}
                    iconName={'comment'}
                    iconColor={'white'}
                    inputStyle={{ color: 'green' }}
                    multiline = {true}
                    underlineColorAndroid='transparent'
                    onChangeText ={(ingText) => this.setState({ingText})}
                  />
            </View>
                  <Makiko
                    label={'Steps...'}
                    iconClass={FontAwesomeIcon}
                    iconName={'comment'}
                    iconColor={'white'}
                    inputStyle={{ color: 'green' }}
                    multiline = {true}
                    underlineColorAndroid='transparent'
                    onChangeText ={(stepsText) => this.setState({stepsText})}
                  />
              <View style={styles.modalContainer}>
                
                  <Button backgroundColor ="#fb8c00" rounded onPress={() => {
                    
                    if(this.state.text!=='' && this.state.ingText!=='' && this.state.stepsText!=='' )
                    {
                      this.hpRef.push({title:this.state.text, ing:this.state.ingText, steps:this.state.stepsText,types:'Healthy'});
                      this.setState({text:'', ingText:'', stepsText:''})
                      this.setModalVisible(!this.state.modalVisible)
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
              </View>
            </Modal>
            <ImageBackground
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  paddingVertical:33
                }}
                source={{ uri: remote }}
              >
            <ListView
              dataSource={this.state.hpItemDataSource}
              renderRow={this.hpRenderRow}
            />
            </ImageBackground>

            <View style={styles.action}>
              <TouchableHighlight
                underlayColor='#24ce84'
                onPress={this.addItem.bind(this)}
              >
                <Text style = {styles.actionText}>Add Recipe</Text>
              </TouchableHighlight>
            </View>
          
          </View>
      );
    }
    }
  }
  



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffab40'
    },
    li:{
      
      borderBottomColor: 'orange',
      borderBottomWidth: 1,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 15,
      paddingBottom :15,
    },
    liText:{
      color:'#333',
      fontSize:16,
    },
    modalContainer: {
      flex: 1,
      paddingTop: 30,
    },
    innerContainer: {
      flex: 1,
      paddingTop: 15,
      
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
    titleText:{
      fontSize: 25,
      color: '#fb8c00',
      backgroundColor: '#F5FCFF',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    modalTitle:{
      fontSize: 25,
      color: '#fb8c00',
      textAlign: 'center',
      fontWeight: 'bold',
      paddingTop: 15,
      paddingBottom: 30
    },
    modalBgColor:{
      backgroundColor: '#006064',
      flex:1,
    },
    inputTextContainer:{
      paddingBottom: 15,  
    }
  });
