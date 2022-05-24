import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { DURATION } from './constants.js';

export default function Timer(props) {

    const [timerValue, setTimerValue] = useState(DURATION);
    const timerRef = useRef(timerValue);
    const isMounted = useRef(false);
    const isEnabled = useRef(false);
    const timerID = useRef();

    useEffect(() => {

        isMounted.current = true;
        isEnabled.current = true;

        timerID.current = setInterval(() => {
            // Starts counting down
            timerRef.current -= 1;
            if (timerRef.current >= 0 && isMounted.current) {
                setTimerValue(timerRef.current);
            } else {
                if (isMounted.current && isEnabled.current) {
                    // Disable further pop-ups when a pop-up is already shown
                    isEnabled.current = false;
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                    let title = 'Time out';
                    let message = 'Try to be faster next time';

                    if (!props.checkIsGamePaused.call())
                    Alert.alert(title, message, [
                        {
                        text: 'Next Question',
                        onPress: () => {
                            // Re-enable pop-ups again after the user dismiss the pop-up
                            isEnabled.current = true;
                            // Callback to set the next question, options and reset selected option
                            props.onTimeOut.call();
                            // Resets the timer
                            timerRef.current = DURATION;
                            setTimerValue(DURATION);
                            },
                        }
                    ]);
                }
            }
        }, 1000);

        return () => {
            // Effect clean up when the timer has been unmounted
            isMounted.current = false;
            clearInterval(timerID.current);
        }
    }, [])


    return (
        <View>
            <Text style={{fontWeight: 'bold', fontSize: 40, marginTop: 10, marginBottom: 20}}>{timerValue}</Text>
        </View>
    );
}