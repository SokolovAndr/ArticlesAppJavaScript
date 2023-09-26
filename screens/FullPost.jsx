import React from "react";
import styled from "styled-components/native";
import { StatusBar, Button, StyleSheet, Text, FlatList, View, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Loading } from "../components/Loading";

const PostImage = styled.Image`
  width:100%;
  height:250px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;

`;

export const FullPostScreen = ({route, navigation})=> {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const {id, title} = route.params;

   

    React.useEffect(() =>{
      navigation.setOptions({
        title,
      });
        axios.get('https://651172fa829fa0248e401465.mockapi.io/api/v1/posts/' + id)
    .then(({data}) => {
        setData(data);
    }).catch(err => {
      console.log( err);
      alert('Ошибка, не удалось получить статью');
    }).finally(() =>{
      setIsLoading(false);
    });
    }, [])

    if (isLoading){
        return (
            <View style= {{flex:1, justifyContent: 'center', alignContent:'center'}}>
                <Loading />
            </View>
        );
    }

    return (
        <View style={{padding:20}}>
        <PostImage source={{uri: data.imageUrl}} />
        <PostText>
            {data.text}
        </PostText>
        </View>
    )

}

