import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet 
} from 'react-native';

function QuizComponent({ questions }) {

    // state variables
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userSelectedChoices, setUserSelectedChoices] = useState(Array(questions.length).fill(null));
    const [prevQuestionIndex, setPrevQuestionIndex] = useState(null);
    const [answered, setAnswered] = useState(false);

    // event handler for the Next button
    const handleNextPress = () => {
        if (currentQuestionIndex < questions.length - 1) {
            // Move to the next question, if there are more
            setPrevQuestionIndex(currentQuestionIndex);
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            //setAnswered(false);
        } else {
            // Handle end of the quiz
            alert('End of the quiz!');
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
            //setAnswered(false);
        }
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

    // render function for each choice
    const renderChoice = ({ item }) => {
        const isCorrect = item === questions[currentQuestionIndex].correctAnswer;
        const isSelected = item === userSelectedChoices[currentQuestionIndex];

        // Define styles based on correctness, selection, and answered status
        const choiceStyle = {
            ...styles.choice,
            borderColor: isSelected ? 'blue' : 'transparent',
            borderWidth: isSelected ? 2 : 1,
        };


        // Display a marker for the correct answer if the question has been answered
        // use a function
        const marker = isCorrect && answered ? (
          <Text style={styles.correctMarker}>&#10004;</Text> // check mark hex code is 10004, &# is for syntax/reading: &#10004
      ) : null;

        
        

        return (
            <View style={styles.choiceContainer}>
              <TouchableOpacity 
              style={choiceStyle} 
              onPress={() => handleChoicePress(item)}
              disabled={answered}
              >
                <Text>{item}</Text>
              </TouchableOpacity>

              {/* Display the marker */}
              {marker}
            </View>
        );
    };

    // event handler for when a choice is pressed
    const handleChoicePress = (choice) => {
        // Log the choice to the console for debugging purposes
        console.log('Selected Choice:', choice);
        console.log('Correct Answer:', questions[currentQuestionIndex].correctAnswer);
        
        // Update the array of user-selected choices
        const updatedChoices = [...userSelectedChoices];
        updatedChoices[currentQuestionIndex] = choice;
        setUserSelectedChoices(updatedChoices);

        // Set answered to true
        setAnswered(true);
 
    };

    return (
        <View style={styles.container}>
          <Text style={styles.header}>Level 1</Text>

          {/* Display question text */}
          <Text style={{marginTop:40, fontSize:25, width:'90%', alignContent:'center', textAlign:'center'}}>
            {questions[currentQuestionIndex].question}
          </Text>

          {/* Display choices */}
          <FlatList 
            style={{ width: '80%', marginTop: 20, }}
            data={questions[currentQuestionIndex].choices}
            renderItem={renderChoice}
            keyExtractor={(item) => item}
          />

          {/* Navigation buttons */}
          <View style={styles.navButtonsContainer}>
            <TouchableOpacity
            style={styles.navButton}
            onPress={handlePrevPress}
            disabled={prevQuestionIndex === null}
            >
              <Text style={{fontWeight:'bold'}}>Previous</Text>
            </TouchableOpacity>
            
            {/* Next button to move to the next question*/}
            <TouchableOpacity 
            style={styles.navButton} 
            onPress={handleNextPress}
            >
                <Text style={{fontWeight:'bold'}}>Next</Text>
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
    backgroundColor: 'lightblue',
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 30,
  },
  choice: {
    fontSize: 16,
    padding: 8,
    borderWidth: 1,
    backgroundColor: 'yellow',
    marginBottom: 8,
    borderRadius: 5,
    width: '80%',
  },
  correctMarker: {
    marginLeft: 'auto',
    color: 'green',
    fontSize: 20,
  },
  // choice container has both choice and correctMarker
  choiceContainer:{
    flexDirection: 'row', // display choices horizontally
    alignItems: 'center',
    marginBottom: 8, // space between choices
    justifyContent: 'space-between', // space between choices and markers
  },
  navButtonsContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 8,
    width: '80%',
    padding: 10,
    backgroundColor: 'transparent',
  },
  navButton: {
    marginTop: 3,
    padding: 10,
    backgroundColor: 'yellow',
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
});

export default QuizComponent;