import React from 'react';
import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  Button,
} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

function App(): JSX.Element {
  const [modalIsVisible, setModalIsVisible] = useState(true);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endGoalHnadler() {
    console.log("hjdcvjhds");
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText: any) {
    // console.log("hjdcvjhds");
    setCourseGoals((currentCourseGoals) => [...currentCourseGoals, { text: enteredGoalText, id: Math.random().toString() },]);
    endGoalHnadler();
  }
  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }
  return (
    <View style={styles.appContainer}>
      <Button title='Add New Goal'
        color={'purple'}
        onPress={startAddGoalHandler}

      />
      <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endGoalHnadler}/>
      <View style={styles.goalConatiner}>
        <FlatList data={courseGoals} renderItem={(itemData) => {
          return (
            <GoalItem text={itemData.item.text}
              id={itemData.item.id}
              onDeleteItem={deleteGoalHandler}
            />
          )
        }} keyExtractor={(item, index) => { return item.id}
        } />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },

  goalConatiner: {
    flex: 3,
  },
});

export default App;
