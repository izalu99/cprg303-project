import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Alert,
} from 'react-native';

function QuizComponent({ questions }) {

    // state variables
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userSelectedChoices, setUserSelectedChoices] = useState(Array(questions.length).fill(null));
    const [prevQuestionIndex, setPrevQuestionIndex] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);



    // event handler for the Next button
    const handleNextPress = () => {
        if (currentQuestionIndex < questions.length - 1) {
            // Move to the next question, if there are more
            setPrevQuestionIndex(currentQuestionIndex);
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setAnswered(false);
        } else {
            // Handle end of the quiz
            alert('End of the quiz! Your score is ' + score + '/' + questions.length + '.');
        }
    };

    // event handler for the Previous button
    const handlePrevPress = () => {
        if (prevQuestionIndex !== null) {
            // Move to the previous question
            // set currentQuestionIndex to the previous question index
            setCurrentQuestionIndex(prevQuestionIndex);
            // set prevQuestionIndex to the previous of the previous question index 
            
            if (prevQuestionIndex > 0) {
                setPrevQuestionIndex(prevQuestionIndex - 1);
            }
            
        }
    };



    // use useEffect to show correct answer when the user selects an answer
    useEffect((choice) => {
        // Check if the current question has already been answered
        if (answered){
          //update the userSelectedChoices array
          const updatedChoices = [...userSelectedChoices];
          updatedChoices[currentQuestionIndex] = choice;
          setUserSelectedChoices(updatedChoices);
        }
    }, [answered]);


    // event handler for when a choice is pressed
    const handleChoicePress = (choice) => {
      // Log the choice to the console for debugging purposes
      console.log('Selected Choice:', choice);
      console.log('Correct Answer:', questions[currentQuestionIndex].correctAnswer);
      //update the userSelectedChoices array
      const updatedChoices = [...userSelectedChoices];
      updatedChoices[currentQuestionIndex] = choice;
      setUserSelectedChoices(updatedChoices);

      // Set answered to true after the user selects an answer
      setAnswered(true);
  };

    // use useEffect to update the state of answered
    useEffect(() => {
      // Check if the current question has already been answered
      if (userSelectedChoices[currentQuestionIndex] !== null) {
          setAnswered(true);
      } else {
          setAnswered(false);
      }
    }, [currentQuestionIndex, userSelectedChoices]);


    // use useEffect to update the score
    useEffect(() => {
      // Check if the current question has already been answered
      if (answered) {
          // Check if the user selected the correct answer
          const isCorrect = userSelectedChoices[currentQuestionIndex] === questions[currentQuestionIndex].correctAnswer;
          if (isCorrect) {
            setScore((prevScore) => prevScore + 1);
          }
      }
      }, [answered, currentQuestionIndex, userSelectedChoices, questions]);


    //render function for each choice
    const renderChoice = ({ item }) => {
      const isCorrect = item === questions[currentQuestionIndex].correctAnswer;
      const isSelected = item === userSelectedChoices[currentQuestionIndex];

      // Define styles based on correctness, selection, and answered status
      const choiceStyle = {
        ...styles.choice,
        borderWidth: isSelected ? 2 : 0,
      };

      const selectedChoiceStyle = isSelected && answered ? {
        borderColor: 'blue',
      } : {};


      // Display a marker for the correct answer if the question has been answered
      // use a function
      const marker = isCorrect && answered ? (
        <Text style={styles.correctMarker}>&#10004;</Text> // check mark hex code is 10004, &# is for syntax/reading: &#10004
      ) : null;

      return (
          <View style={styles.choiceContainer}>
            <TouchableOpacity 
            style={[choiceStyle, selectedChoiceStyle]} 
            onPress={() => handleChoicePress(item)}
            disabled={answered}>
              <Text>{item}</Text>
            </TouchableOpacity>

            {/* Display the marker */}
            {marker}
          </View>
      );
    };

    // function to show a confirmation alert when the user presses the Submit button
    const showSubmitAlert = () => {
      Alert.alert(
        'Submit Quiz',
        'Are you sure you want to submit the quiz?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Submit',
            onPress: () => setSubmitted(true),
          },
        ],
        { cancelable: false },
      );
    };

    // render the score
    const renderScore = () => {
      if (submitted) {
        const score = calculateScore();
        return (
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Your Score: {score}/{questions.length}</Text>
          </View>
        );
      }
      return null;
    };

    // calculate the score
    const calculateScore = () => {
      let score = 0;
      for (let i = 0; i < questions.length; i++) {
        if (userSelectedChoices[i] === questions[i].correctAnswer) {
          score++;
        }
      }
      return score;
    };

    // event handler for the Submit button
    const handleSubmitPress = () => {
      // use showSubmitAlert function
      showSubmitAlert();
      
    };

    

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Level 1</Text>

      {/* Display question and choices*/}
      <View style={styles.questionChoices}>
        {/* Display question text */}
        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            {currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}
          </Text>
        </View>
        
        {/* Display choices */}
        <FlatList 
          style={styles.choiceList}
          data={questions[currentQuestionIndex].choices}
          renderItem={renderChoice}
          keyExtractor={(item) => item}
        />
      </View>

      {/* Display the score */}
      {renderScore()}
      

      {/* Navigation buttons */}
      <View style={styles.navButtonsContainer}>
        {/* Previous button*/}
        {
          prevQuestionIndex !== null && currentQuestionIndex > 0 ? (
            <TouchableOpacity
            style={styles.navButton}
            onPress={handlePrevPress}
            disabled={prevQuestionIndex === null}
            >
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.navButton, {backgroundColor:'transparent'}]}/>
          )
        }
        
        {/* Next button*/}
        {
          currentQuestionIndex < questions.length - 1 ? (
            <TouchableOpacity 
            style={styles.navButton} 
            onPress={handleNextPress}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
            style={styles.navButton} 
            onPress={handleSubmitPress}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )
        }
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
    backgroundColor: '#77cff1',
  },
  
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 20,
  },

  questionChoices: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    textAlign: 'center',
    marginTop: 40,
    backgroundColor: 'white',
    marginBottom: 40,
    borderRadius: 20,
  },
  question:{
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    width: '80%',
    textAlign: 'center',
    alignItems: 'center',
  },
  questionContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    marginBottom: 10,
    borderColor: 'black',
  },
  choiceList:{
    marginTop: 10,
  },
  choice: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#fdcc04',
    marginBottom: 8,
    borderRadius: 12,
    textAlign: 'center',
    alignItems: 'center',
    leftMargin: 10,
    width: '80%',
  },
  correctMarker: {
    marginLeft: 3,
    color: 'green',
    fontSize: 20,
  },
  // choice container has both choice and correctMarker
  choiceContainer:{
    flexDirection: 'row', // display choices horizontally
    alignItems: 'center',
    marginBottom: 8, // space between choices
    justifyContent: 'space-evenly', // space between choices and markers
    width: '90%',
    leftMargin: 20,
  },
  navButtonsContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 8,
    width: '90%',
    padding: 10,
    backgroundColor: 'transparent',
  },
  navButton: {
    marginTop: 3,
    padding: 10,
    backgroundColor: '#fdcc04',
    borderRadius: 12,
    alignContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 12,
  },
});

export default QuizComponent;