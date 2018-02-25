import React, { Component } from 'react';
import './App.css';
import Person from '../components/Persons/Person/Person'
import Persons from '../components/Persons/Persons';
import Radium from 'radium';

class App extends Component {
  state = {
    persons: [
      {id: '1', name: 'Vlad', age: 28},
      {id: '2', name: 'Aretta', age: 23},
      {id: '3', name: 'Aron', age: 21}],
    showPersons: false
  }

  switchNameHandler = (newName) =>{
    this.setState({
      persons: [
        {id: '1', name: newName, age: 28},
        {id: '2', name: 'Aretta', age: 23},
        {id: '3', name: 'Aron', age: 21}]})
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
   const doesShow = this.state.showPersons;
   this.setState({showPersons: !doesShow});
  }

  deletePersonsHandler = (personIndex) => {
    //const persons = this.state.persons;
    //update state in imutable fashion
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons});
    }
 

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': { backgroundColor:'salmon',
    color: 'black' }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons 
            persons = {this.state.persons}
            clicked = {this.deletePersonsHandler}
            changed = {this.nameChangedHandler}
          />
      </div> 
      );
      style.backgroundColor = 'red';
      style[':hover'] = {backgroundColor:'salmon',
      color: 'black'}
    }
    
    const classes = [];
    //const classes = ['red', 'bold'].join(' ');
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    } 
    return (
      <div className="App">
        <h1>Hi I'm vlad</h1>
        <p className={classes.join(' ')}>test</p>
        {/* inefficient switchNameHandler() */}
        <button 
          style = {style}
          onClick={this.togglePersonsHandler}>Switch name</button>
        {persons}
      </div>
    );
  }
}

export default Radium(App);
