/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

const QAPage = () => {
  const [question, setQuestion] = useState('Question i: This is a sample question?');
  const [choices, setChoices] = useState(['A. choice a', 'B. choice b', 'C. choice c', 'D. choice d']);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [answer, setAnswer] = useState('');
  const correctAnswer = 'D. choice d';

  const handleQuestionSubmit = () => {
    // Add your logic here to check the correct answer
    // For now, let's just display the selected choice as the answer
    setAnswer(`Question: ${question}\nSelected Choice: ${selectedChoice}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Question and Answer Page</Text>

      <Text style={styles.questionText}>{question}</Text>

      <View style={styles.choicesContainer}>
        {choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.choice,
              { backgroundColor: selectedChoice === choice ? 'lightblue' : 'white' },
            ]}
            onPress={() => setSelectedChoice(choice)}
          >
            <Text>{choice}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Submit Question" onPress={handleQuestionSubmit} />

      {answer !== correctAnswer && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerHeader}>Answer:</Text>
          <Text style={styles.answer}>{correctAnswer}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 16,
  },
  choicesContainer: {
    marginBottom: 16,
  },
  choice: {
    fontSize: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 8,
  },
  answerContainer: {
    marginTop: 20,
  },
  answerHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  answer: {
    fontSize: 16,
  },
});

export default QAPage;


