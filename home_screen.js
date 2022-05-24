import 'react-native-gesture-handler';
import { SVG_XML_STRING } from './constants.js';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { SvgXml } from 'react-native-svg';


export default function HomeScreen({ navigation }) {

    const onBeginPressed = () => {
        navigation.navigate('Categories');
    };

    return(
        <View style={styles.container}>
            <SvgXml xml={SVG_XML_STRING} width="300" height="300" />
            <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginTop: 20}}>TRIVIA MAESTRO</Text>
            <View style={{marginVertical: 20, marginHorizontal: 10}}>
                <Text style={{color: '#FFFFFF', fontSize: 16, textAlign: 'center' }}>Select a category and challenge yourself to a series of trivia questions</Text>
                <TouchableOpacity style={styles.gameStartButton} onPress={onBeginPressed}>
                <Text style={{fontSize: 18, color: 'white'}}>Let's begin</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7209B7',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    gameStartButton: {
        marginVertical: 40,
        backgroundColor: '#FF9F1C',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }
});