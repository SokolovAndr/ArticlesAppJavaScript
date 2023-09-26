//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StatusBar, Button, StyleSheet, Text, FlatList, View, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { Post } from '../components/Post';
import axios from 'axios';
import { Loading } from "../components/Loading";

export const HomeScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);


  const fetchPosts = () =>{
    setIsLoading(true);
    axios.get('https://651172fa829fa0248e401465.mockapi.io/api/v1/posts')
    .then(({data}) => {
      setItems(data);
    }).catch(err => {
      console.log( err);
      alert('Ошибка при получении статей');
    }).finally(() =>{
      setIsLoading(false);
    });
  }

  React.useEffect(fetchPosts, []);

  if (isLoading){        
    return (
    <View style= {{flex:1, justifyContent: 'center', alignContent:'center'}}>
        <Loading />
    </View>
);
}

  return (
    <View >

      <FlatList      
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts}/>}
        data={items}
        renderItem={({item})=> (
          <TouchableOpacity onPress={() => navigation.navigate('FullPost', {id: item.id, title: item.title})}>
            <Post title={item.title} imageUrl={item.imageUrl} createdAt={item.createdAt}/>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}