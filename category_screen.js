import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { getTriviaCategories } from './api_handler';

export default function CategoryScreen({ navigation }) {

  const [categories, setCategories] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const scrollViewRef = useRef();

  useEffect(() => {
      (async () => {
        let trivia_categories = await getTriviaCategories();
        if (trivia_categories !== undefined) {
          setCategories(trivia_categories);
        }
    })();
  }, []);

  const onCategoryPressed = (index) => {
    setSelectedCategoryIndex(index);
    scrollViewRef.current.scrollToEnd({animated: true});
  }

  const onStartGamePressed = () => {
    if (selectedCategoryIndex === null) {
      // TODO: PROMPT USER AGAIN
      return;
    } else {
      navigation.navigate('Questions', {category: categories[selectedCategoryIndex]});
      // Reset
      setSelectedCategoryIndex(null);
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }

  }

  if (categories === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={{color: '#FFFFFF', fontSize: 14, marginVertical: 14}}>Fetching categories...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{padding: 10}} showsVerticalScrollIndicator={false} ref={scrollViewRef}>
          <Text style={{marginTop: 50, marginBottom: 20, fontSize: 24, fontWeight: 'bold', color: '#FFFFFF'}}>Select a category</Text>
          {categories.map((category, index) => 
          <TouchableOpacity key={index} style={
            selectedCategoryIndex  === index ? styles.selectedButton : styles.unselectedButton} onPress={() => onCategoryPressed(index)}>
            <Text style={selectedCategoryIndex === index ? styles.selectedButtonText : styles.unselectedButtonText }>{category.name}</Text>
          </TouchableOpacity>)}
          <TouchableOpacity style={styles.gameStartButton} onPress={onStartGamePressed}>
            <Text style={{fontSize: 18, color: 'white'}}>Let's begin</Text>
          </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7209B7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    marginVertical: 12, 
    backgroundColor: '#FFFFFF', 
    padding: 20, 
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
  unselectedButton: {
    marginVertical: 12, 
    backgroundColor: '#7209B7', 
    padding: 20, 
    borderRadius: 20, 
    borderColor: '#FFFFFF', 
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  unselectedButtonText: {
    fontSize: 18, 
    color: '#FFFFFF',
  },
  selectedButtonText: {
    fontSize: 18,
    color: '#7209B7',
  },
  gameStartButton: {
    marginVertical: 30,
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