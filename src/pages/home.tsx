import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export function HomePage({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <View>
        <Text>
          Welcome to the quiz App :)
        </Text>
      </View>
      <Button
        title="Start Quizzing"
        onPress={() => navigation.navigate('Quiz')}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
});
