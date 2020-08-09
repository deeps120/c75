import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import {createAppContainer,CreateSwitchNavigator} from 'react-navigation';
import {createBotttomTagNavigator} from 'react-navigation-tabs';
import db from '../config';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:'',
            password:'',
        }
    }
    login=async(email,password)=>{
        if(email && password){
            try{
                const response=await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response){
                    this.props.navigation.navigate('bookTransactionScreen')
                }
            }
            catch(error){
                switch (error.code) {
                  case 'auth/user-not-found':
                    Alert.alert("user dosen't exists")
                    console.log("doesn't exist")
                    break
                  case 'auth/invalid-email':
                    Alert.alert('incorrect email or password')
                    console.log('invaild')
                    break
                }
              }
            }
            else{
                Alert.alert('enter email and password');
            }
          }
        
    
    render(){
        return(
            
                <KeyboardAvoidingView style={{alignItems:'center',
            marginTop:50}}>
                <View>
                <Image
                source={require('../assets/booklogo.jpg')}
                style={{width:200,height:200}}
                />
                <Text style={{textAlign:'center',fontSize:30}}>wily</Text>
            </View>
        <View>
            <TextInput
            style={styles.loginBox}
            placeholder='abc@example.com'
            keyboardType='email-address'
            onChangeText={(text)=>{
                this.setState({
                    emailId:text
                })
            }}
            >

            </TextInput>
            <TextInput
            style={styles.loginBox}
            placeholder='enter password'
            secureTextEntry={true}
            onChangeText={(text)=>{
                this.setState({
                    password:text
                })
            }}
            >

            </TextInput>
        </View>
        
        <View>
            <TouchableOpacity
            style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:22
            }}
            onPress={()=>{
                this.login(this.state.emailId,this.state.password)
            }}
            >
            <Text style={{textAlign:'center'}}>login</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        );
    }
}
const styles=StyleSheet.create({
    loginBox:{
        width:300,
        heiht:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10
    }
})
