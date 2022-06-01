import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function GhostButton(props) {
    return(
        <TouchableOpacity onPress={props.onPress} key={props.index} style={[props.clicked ? styles.selectedBackground: styles.unselectedBackground, styles.shadow]}>
            <Text style={props.clicked ? styles.selectedText : styles.unselectedText}>{props.buttonText}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({  
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    selectedBackground: {
        marginVertical: 12, 
        backgroundColor: '#FFFFFF', 
        padding: 20, 
        borderRadius: 20,
    },
    selectedText: {
        fontSize: 18,
        color: '#7209B7',
    },
    unselectedBackground: {
        marginVertical: 12, 
        backgroundColor: '#7209B7', 
        padding: 20, 
        borderRadius: 20, 
        borderColor: '#FFFFFF', 
        borderWidth: 1,
    },
    unselectedText: {
        fontSize: 18, 
        color: '#FFFFFF',
    }
});