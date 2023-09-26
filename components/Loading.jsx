import React from "react";
import { StatusBar, Button, StyleSheet, Text, FlatList, View, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';

export const Loading = () => {
    return (
    <View 
        style = {{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'

        }}>
        <ActivityIndicator size = "large"/>
            <Text style={{marginTop: 15}}>
            Загрузка...
            </Text>
    </View>
    )
}