import { StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function CTAButton(props) {
    return (
        <TouchableOpacity style={styles.background} onPress={props.onPress}>
            <Text style={styles.buttonText}>{props.buttonText}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7209B7',
        alignItems: 'center',
        justifyContent: 'center',
        },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
    background: {
        marginVertical: 30,
        backgroundColor: '#FF9F1C',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    shadow: {
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