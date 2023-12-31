import React, { Component } from "react";
import "./App.css";
import Persons from "./components/Persons/Persons";
import Cockpit from "./components/Cockpit/Cockipt";

class App extends Component {
  state = {
    persons: [
      { id: 1, name: "Nina", age: 26 },
      { id: 2, name: "Milan", age: 28 },
      { id: 3, name: "Nikola", age: 20 },
    ],
    showPersons: false,
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(
      (person) => person.id === id
    );

    const person = {
      ...this.state.persons[personIndex],
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
      );
    }

    return (
      <div className="App">
        <Cockpit clicked={this.togglePersonsHandler} />
        {persons}
      </div>
    );
  }
}

export default App;
