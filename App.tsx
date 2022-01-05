import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QuizPage } from './src/pages/quiz';
import { HomePage } from './src/pages/home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Quiz" component={QuizPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}