

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet } from 'react-native';

function QuizComponent({ questions }){

    // let's log the questions to the console to check if they are passed correctly
    console.log('Questions:',questions);

    // state variable to keep track of the current question index
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // state variables for userSelectedChoice and prevQuestion
    const [userSelectedChoice, setUserSelectedChoice] = useState(null);
    const [prevQuestionIndex, setPrevQuestionIndex] = useState(null);
    
    
    // event handler for the Next button
    const handleNextPress = () => {
        if (currentQuestionIndex < questions.length - 1) {
        // Move to the next question, if there are more
        setPrevQuestionIndex(currentQuestionIndex); // save the current question index as the previous index
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // get the next question index
        } else {
        // Handle end of the quiz
        alert('End of the quiz!');
        }
    };

    // event handler for the Previous button
    const handlePrevPress = () => {
        if (prevQuestionIndex !== null) {
        // Move to the previous question, if there are any
        // set the current question index to the previous one
        setCurrentQuestionIndex(prevQuestionIndex); 
        // reset the previous question index to null
        setPrevQuestionIndex(null); 
        }
    };

    // render function for each choice
    const renderChoice = ({ item }) => {
      // make booleans to identify if the choice is correct
      // and selected by the user (if incorrect there should be an alert)
      const isCorrect = item === questions[currentQuestionIndex].correctAnswer;
      const isSelected = item == questions[currentQuestionIndex].correctAnswer;
      // define the styles based on the booleans
      const choiceStyle = {
        ...styles.choice,
        borderColor: isSelected ? 'blue' : 'gray',
        backgroundColor: isCorrect ? 'lightgreen' : 'white',
      };
      return (
        <TouchableOpacity 
        style={choiceStyle} 
        onPress={() => handleChoicePress(item)}>
        
        <Text>{item}</Text>
        </TouchableOpacity>
      )
    };

    // event handler for when a choice is pressed
    const handleChoicePress = (choice) => {
        // Log the choice to the console for debugging purposes
        console.log('Selected Choice:', choice);
        console.log('Correct Answer:', questions[currentQuestionIndex].correctAnswer);
        
        // Save the choice in the state variable
        setUserSelectedChoice(choice);

        // Check if the answer is correct
        if (choice === questions[currentQuestionIndex].correctAnswer) {
        alert('Correct!');
        } else {
        alert('Incorrect!');
        }
    };

    return (
        <View style={styles.container}>
          <Text style={styles.header}>Programming Quiz</Text>

          {/* Display question text */}
          <Text>{questions[currentQuestionIndex].question}</Text>

          {/* Display choices */}
          <FlatList
            data={questions[currentQuestionIndex].choices}
            renderItem={renderChoice}
            keyExtractor={(item) => item}
          />

          {/* Previous button to move to the previous question*/}
          <View style={styles.navButtonsContainer}>
            <TouchableOpacity
            style={styles.navButton}
            onPress={handlePrevPress}>
              <Text>Previous</Text>
            </TouchableOpacity>
            
            {/* Next button to move to the next question*/}
            <TouchableOpacity 
            style={styles.navButton} 
            onPress={handleNextPress}>
                <Text>Next</Text>
            </TouchableOpacity>
          </View>
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
  choice: {
    fontSize: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 8,
  },
  navButtonsContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 3,
    width: '100%',
    borderColor: 'gray',
  },
  navButton: {
    marginTop: 3,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
});


export default QuizComponent;

