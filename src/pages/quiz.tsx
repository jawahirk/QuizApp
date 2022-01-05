import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, Alert } from 'react-native';
import RadioButton from '../components/quizOptions';
import produce from "immer"

const host = 'https://quiz-de.herokuapp.com/', masterKey = 'lL0bepH9Pz7wbuOy8pkAM9X1pzkhJNCS';


export function QuizPage({ navigation }: { navigation: any }) {
  const [isLoading, setLoading] = useState(true);
  const [questions, setData] = useState([]);

  const getQuestions = async () => {
    try {
      const response = await fetch(host + 'questions?access_token=' + masterKey);
      const json = await response.json();
      setData(json.rows);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const submitResults = async () => {
    try {
      setLoading(true);
      const response = await fetch(host + 'results', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_token: masterKey,
          answers: questions.map((qn: any) => ({
            question: qn.id,
            answer: qn.answer
          }))
        })
      });
      Alert.alert(
        "Thanks",
        "Your response has been recorded",
        [
          { text: "Go Home", onPress: () => navigation.navigate('Home') }
        ]
      );
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  function update(index: number, ans: String) {
    const newQuestions = produce(questions, (state: any) => {
      state[index].answer = ans;
    })
    setData(newQuestions);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.questionsContainer}>
        {questions.map((qn: any, ind) => {
          return (
            <View key={qn.id}>
              <Text style={styles.question}>
                {qn.question}
              </Text>
              {qn.questionType == 'obj' ?
                <TextInput style={styles.textAnswer} onChangeText={(val) => update(ind, val)} value={qn.answer} />
                : <RadioButton data={qn.options} onSelect={(val: any) => update(ind, val)} />}
            </View>
          );
        })}

      </SafeAreaView>
      {
        isLoading ? <Text>Loading</Text> :
          <Button title="Submit Results" onPress={submitResults} />
      }
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
  },
  questionsContainer: {
    alignSelf: 'stretch',
    padding: 10
  },
  question: {
    padding: 10,
    fontSize: 16
  },
  textAnswer: {
    padding: 10,
    height: 40,
    margin: 10,
    borderWidth: 1,
  },
});
