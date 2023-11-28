

import React from 'react';
import { View } from 'react-native';
import QuizComponent from  './quiz/quiz-component'; // Adjust the path accordingly
import questions from './quiz/questions.json'; // Adjust the path accordingly
const App = () => {
  // Replace this with your actual JSON data
  const ques = questions;

  return (
    <View style={{ flex: 1 }}>
      <QuizComponent questions={ques} />
    </View>
  );
};

export default App;
