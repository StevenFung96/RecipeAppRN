/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry
} from 'react-native';
import { Scene, Router} from 'react-native-router-flux';
import { StackNavigator, TabNavigator}from'react-navigation';
import SplashScreen from 'react-native-splash-screen'

import ListRecipe from './ListRecipe';
import RecipeDetails from './RecipeDetails';
import RecipeType from './RecipeType';

//import LoadingScreen from './LoadingScreen';

const TabIcon=({selected, title})=>{
  return(
    <Text style={{color:selected ? 'red':'black'}}>{title}</Text>
  );
};

export default class App extends React.Component{

/*
  state={
    //loaded: false
  }
  constructor(){
    super();
    //LoadingScreen.load(v=> this.setState({loaded:true}));
  }

  {/*this.state.loaded ? <Text>Welcome!</Text> : <Text>Loading...</Text>

export const Tabs = TabNavigator({
  Details:{
    screen:Details,
  },
  Updates:{
    screen:UpdateRecipe,
  },
});


          <Scene key="tabbar" tabs='true' tabBarStyle={{backgroundColor:'#FFFFFF'}}>

                <Scene key="phase"title="phase"icon={TabIcon}>
                    <Scene key="details" component={Details} title="Details"  />
                </Scene>

                <Scene key="phase2"title="phase2"icon={TabIcon}>
                    <Scene key="update" component={UpdateRecipe} title="Update"  />
                </Scene>

          </Scene>

          
*/

componentDidMount() {
  // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
}

  render() {
    return (
      <Router>
        <Scene key="root">
        <Scene key="recipeT" component={RecipeType} title="Recipe Type" hideNavBar={true} initial/>
          <Scene key="listR" component={ListRecipe} title= "Recipe List" />
          <Scene key="recipeD" component={RecipeDetails} title="Recipe Details"/>
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

