import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,CreateSwitchNavigator} from 'react-navigation';
import {createBotttomTagNavigator} from 'react-navigation-tabs';
import db from '../config';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default class SearchScreen extends React.Component{
constructor(props){
    super(props);
    this.State=({
        allTransactions:[],
lastVisibleTransaction:null,
search:''
    })
}
componentDidMount= async=()=>{
const query =await db.collection('transactions').get()
query.docs.map((doc)=>{
    this.setState({
        allTransactions:[...this.state.allTransactions,doc.data()],
        lastVisibleTransaction:doc
    })
})
if(enteredText[0].toUpperCase()==='B'){
    const transaction = await db.collection('transaction').where('bookId','==',text).get()
    transaction.docs.map((doc)=>{
        this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastVisibleTransaction:doc
        })
    })
}
else if(enteredText[0].toUpperCase()==='S'){
    const transaction = await db.collection('transaction').where('StudentId','==',text).get()
    transaction.docs.map((doc)=>{
        this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastVisibleTransaction:doc
        })
    })
}   
}
fetchMoreTransaction=async()=>{
    const query = await db.collection('transactions').startAfter(this.state.lastVisibleTransaction).limit(10).get()
    query.docs.map((doc)=>{
        this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastVisibleTransaction:doc
        })
    })
}
searchTransaction=async(text)=>{
    var enteredText=text.split(' ')
    var text=text.toUpperCase()
    if(enteredText[0].toUpperCase()==='B'){
        const transaction = await db.collection('transaction').where('bookId','==',text).get()
        transaction.docs.map((doc)=>{
            this.setState({
                allTransactions:[...this.state.allTransactions,doc.data()],
                lastVisibleTransaction:doc
            })
        })
    }
   else if(enteredText[0].toUpperCase()==='S'){
        const transaction = await db.collection('transaction').where('StudentId','==',text).get()
        transaction.docs.map((doc)=>{
            this.setState({
                allTransactions:[...this.state.allTransactions,doc.data()],
                lastVisibleTransaction:doc
            })
        })
    }   
}
    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

                <TextInput
                style={styles.bar}
                placeholder='enter bookId or studentId'
                onChangeText={(text)=>{this.setState({search:text})}}
                />
            <TouchableOpacity
            style={styles.searchButton}
            onPress={()=>{this.searchTransaction(this.state.search)}}
            >
                <Text>search</Text>
                </TouchableOpacity>
         </View>

            <FlatList 
            data={this.state.allTransactions}
            renderItem={({item})=>(
                <View style={{borderBottomWidth:2}}>
                    <Text>{'book id'+item.bookId}</Text>
                    <Text>{'student id'+item.studentId}</Text>
                    <Text>{'transactionType'+item.transactionType}</Text>
                    <Text>{'date'+item.date.toDate()}</Text>
                </View>
            )}
            keyExtractor={(item,index)=>index.toString()}
            onEndReached={this.fetchMoreTransaction}
            onEndReachedThreshold={0.7}
            >

            </FlatList>
            </View>
           
        );
   }
}
