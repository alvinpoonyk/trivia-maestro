import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions, ActivityIndicator, SafeAreaView } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import * as Haptics from 'expo-haptics';
import Timer from './timer';
import { getTrivias } from './trivia_repository';
import { NUMBER_OF_QUESTIONS } from './constants.js';

export default function QuestionScreen({ route, navigation }) {

  const { category } = route.params;

  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [options, setOptions] = useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  // Reference value to keep track of the index of the current question
  const questionIndex = useRef(0);

  // Reference flag for the timer to decide whether to show a pop-up alert message and pause the timer
  const isPopUpDisabled = useRef(false);
  const [isPaused, setIsPaused] = useState(isPopUpDisabled.current);

  // Utility function to choose the color option button color
  const colorPicker = (index) => {
    let colors = ['#EF476F', '#118AB2', '#FFD166', '#07B084'];
    return colors[index];
  }

  // Utility function to shuffle the options
  const shuffler = (newElement, array) => {
    let randomIndex = Math.floor(Math.random() * (array.length + 1)) - 1;
    array.splice(randomIndex, 0, newElement);
    return array;
  };

  // Mini hook to set the flag to whether to display a pop-up alert message for the timer
  const check = () => isPopUpDisabled.current;

  useEffect(() => {
    (async () => {

      let trivias = await getTrivias(NUMBER_OF_QUESTIONS, category.id);
      if (trivias !== undefined) {
        let { question, correct_answer, incorrect_answers} = trivias[questionIndex.current];

        let options = shuffler(correct_answer, incorrect_answers);

        setCurrentQuestion(question);
        setQuestions(trivias);
        setOptions(options);
        setCorrectAnswer(correct_answer);
      }

    })();
  }, []);

  const onTimeOut = () => {
    // Callback that sets the current question, options and correct answer and resets the select choice when the timer reaches 0
          questionIndex.current += 1;
          if (questionIndex.current < NUMBER_OF_QUESTIONS) {
            let { question, correct_answer, incorrect_answers} = questions[questionIndex.current];
            let options = shuffler(correct_answer, incorrect_answers);
            setCurrentQuestion(question);
            setOptions(options);
            setSelectedOptionIndex(null);
            setCorrectAnswer(correct_answer);
          } else {
            // Disable the popups and timer when the game is at its last question and was timed out
            isPopUpDisabled.current = true;
            setIsPaused(isPopUpDisabled.current);
          }
  }

  const onSubmitPressed = () => {

    // Disable the timer from showing the time up alert
    isPopUpDisabled.current = true;
    setIsPaused(isPopUpDisabled.current);

    let title = '';
    let message = '';
    let currentScore = score;

    // If an option was selected and user pressed submit, display the correct title and message text if the answer was correct or wrong.
    if (selectedOptionIndex !== null) {
       if (options[selectedOptionIndex] === correctAnswer) {
         // Correct answer selected
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        title = 'Correct Answer';
        message = 'Congratulations on getting it right.';
        currentScore = score + 1;
       } else {
         // Wrong answer selected
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        title = 'Wrong Answer';
        message = `The correct answer was ${correctAnswer}.`;
       }
    } else {
      // If no option was selected and the user pressed submit.
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning); 
      title = 'Giving Up?';
      message = `You did not select any options. The correct answer was ${correctAnswer}.`;
    }

    Alert.alert(title, message, [
      { text: 'Next Question', onPress: () => {

        questionIndex.current += 1;

        isPopUpDisabled.current = false;
        setIsPaused(isPopUpDisabled.current);

        if (questionIndex.current === NUMBER_OF_QUESTIONS) {
          // End the game if the last question has been answered
          setScore(currentScore);
          return;
        } 
        
        if (questionIndex.current < NUMBER_OF_QUESTIONS) {
          // Set the state to the next question, correct answer, options and reset the previously selected option
          let { question, correct_answer, incorrect_answers} = questions[questionIndex.current];
          let options = shuffler(correct_answer, incorrect_answers);
          setCurrentQuestion(question);
          setOptions(options);
          setSelectedOptionIndex(null);
          setCorrectAnswer(correct_answer);
          setScore(currentScore);
        }

      }},
    ]);

  }

  const onOptionPressed = (index) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedOptionIndex(index);
  }

  if (questionIndex.current === NUMBER_OF_QUESTIONS) {
    return (
      <View style={styles.container}>
        <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>GAME OVER</Text>
        <Text style={{color: 'white', fontSize: 18, marginVertical: 16}}>You have achieved a score of</Text>
        <Text style={{color: 'white', fontSize: 50, fontWeight: 'bold', marginTop: 14, marginBottom: 40}}>{score}</Text>
        <TouchableOpacity style={styles.tryAgainButton} onPress={() => {
          navigation.navigate('Categories');
        }}>
          <Text style={{color: 'white', fontSize: 18}}>Try another category</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (questions === null || options === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={{color: '#FFFFFF', fontSize: 14, marginVertical: 14}}>Fetching questions...</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Trivia Left: {NUMBER_OF_QUESTIONS - questionIndex.current}</Text>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Your Score: {score}</Text>
        </View>

        <View style={{justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 22, color: '#7209B7'}}>Time Left</Text>
           {isPaused ? <Text style={{fontWeight: 'bold', fontSize: 40, marginTop: 10, marginBottom: 20}}>-</Text> : <Timer checkIsGamePaused={check} onTimeOut={onTimeOut}/>}
          <Text style={{fontWeight: 'bold', fontSize: 22}}>{currentQuestion}</Text>
        </View>

        <View>
          {options.map((option, index) =>
          <TouchableOpacity touchSoundDisabled={false} key={index} style={index === selectedOptionIndex ? {borderRadius: 20,
            backgroundColor: '#7209B7', 
            alignItems: 'center',
            padding: 14,
            margin: 10,} 
      : [styles.answerButton, {backgroundColor: colorPicker(index)}]} onPress={() => onOptionPressed(index)}>
            <Text style={styles.answerButtonText}>{option}</Text>
          </TouchableOpacity>)}
          
          <TouchableOpacity style={styles.submitButton} onPress={onSubmitPressed}>
              <Text style={{fontSize: 20, color: 'white'}}>Submit</Text>
          </TouchableOpacity>

          </View>

        </View>
    </SafeAreaView>
    );
  }
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7209B7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    justifyContent: 'center',
    width: windowWidth * 0.9,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  answerButton: {
    borderRadius: 20,
    padding: 14,
    margin: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  answerButtonText: {
    color: 'white',
     letterSpacing: 0.25,
      fontSize: 16
  },
  submitButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    padding: 10,
    marginTop: 35, 
    backgroundColor: '#FF9F1C', 
    padding: 20, 
    borderRadius: 20, 
    alignItems: 'center'
  },
  tryAgainButton: {
    backgroundColor: '#FF9F1C',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});