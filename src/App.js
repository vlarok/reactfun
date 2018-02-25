import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

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
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person key = {person.id}
            name = {person.name} 
            age = {person.age} 
            click = {() => this.deletePersonsHandler(index)}
            changed = {(event) => this.nameChangedHandler(event, person.id)}
            >
          </Person>
          })}
      </div> 
      )
    }

    return (
      <div className="App">
        <h1>Hi I'm vlad</h1>
        {/* inefficient switchNameHandler() */}
        <button 
          style = {style}
          onClick={this.togglePersonsHandler}>Switch name</button>
        {persons}
      </div>
    );
  }
}

export default App;
