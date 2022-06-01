import 'react-native-gesture-handler';
import { SVG_XML_STRING } from '../constants.js';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import CTAButton from './components/CTAButton.js';
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
                <CTAButton onPress={() => onBeginPressed()} buttonText="Let's begin"/>
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
});