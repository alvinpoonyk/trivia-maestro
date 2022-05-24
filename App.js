import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryScreen from './category_screen';
import QuestionScreen from './question_screen';
import HomeScreen from './home_screen';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Categories" component={CategoryScreen}/>
        <Stack.Screen name="Questions" component={QuestionScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
