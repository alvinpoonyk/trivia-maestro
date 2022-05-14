import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function CategoryScreen({ navigation }) {

  const [categories, setCategories] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

  useEffect(() => {
      (async () => {
        fetch('https://opentdb.com/api_category.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }).then((response) => response.json())
        .then((data) => {
          let trivia_categories = data.trivia_categories;
          setCategories(trivia_categories);
        }).catch((error) => {
          console.error(error);
        });
    })();
  }, []);

  const onCategoryPressed = (index) => {
    setSelectedCategoryIndex(index);
  }

  const onStartGamePressed = () => {
    if (selectedCategoryIndex === null) {
      return;
    }
    navigation.navigate('Questions', {category: categories[selectedCategoryIndex]});
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
      <ScrollView contentContainerStyle={{padding: 10}} showsVerticalScrollIndicator={false}>
          <Text style={{marginVertical: 30, fontSize: 24, fontWeight: 'bold', color: '#FFFFFF'}}>Choose a category</Text>
          {categories.map((category, index) => 
          <TouchableOpacity key={index} style={
            selectedCategoryIndex  === index ? {marginVertical: 12, backgroundColor: '#FFFFFF', padding: 20, borderRadius: 20} : {marginVertical: 12, backgroundColor: '#7209B7', padding: 20, borderRadius: 20, borderColor: '#FFFFFF', borderWidth: 1}
            } onPress={() => onCategoryPressed(index)}>
            <Text style={selectedCategoryIndex === index ? {fontSize: 18, color: '#7209B7'} : {fontSize: 18, color: '#FFFFFF'}}>{category.name}</Text>
          </TouchableOpacity>)}
          <TouchableOpacity style={{marginVertical: 30, backgroundColor: '#FF9F1C', padding: 20, borderRadius: 20, alignItems: 'center'}} onPress={onStartGamePressed}>
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
});