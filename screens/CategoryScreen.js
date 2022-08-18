import 'react-native-gesture-handler';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { getTriviaCategories } from '../trivia_repository';
import GhostButton from './components/GhostButton';
import CTAButton from './components/CTAButton';

export default function CategoryScreen({ navigation }) {

  const [categories, setCategories] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const scrollViewRef = useRef();

  useEffect(() => {
      (async () => {
        let trivia_categories = await getTriviaCategories();
        if (trivia_categories.status === 'success') {
          setCategories(trivia_categories.categories);
        } else {
          
        }
    })();
  }, []);

  const onCategoryPressed = (index) => {
    setSelectedCategoryIndex(index);
    scrollViewRef.current.scrollToEnd({animated: true});
  }

  const onStartGamePressed = () => {
    if (selectedCategoryIndex === null) {
      // Prompt user again to select category
      const title = 'You have not select a category';
      const message = 'Select a category and click on the button at the bottom of the screen to begin.';
      Alert.alert(title, message);
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
          <GhostButton clicked={selectedCategoryIndex === index} key={index} buttonText={category.name} onPress={() => onCategoryPressed(index)}/> )}
          <CTAButton buttonText="Let's begin" onPress={() => onStartGamePressed()}/>
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
});