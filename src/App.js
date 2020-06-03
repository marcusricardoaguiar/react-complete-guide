import React, { Component } from 'react';
import './App.css';
//import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';
import styled from 'styled-components';

const StyleButton = styled.button`
  background-color: ${ props => props.alt ? 'red' : 'green' };
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  &:hover {
    backgroundColor: lightgreen;
    color: black
  }
`

class App extends Component {
  state = {
    persons: [
      { name: "Max", age: 28},
      { name: "Manu", age: 29},
      { name: "Stephanie", age: 27}
    ],
    showPersons: false
  }
  
  switchNameHandler = (newName) => {
    // DON'T DO THIS: this.state.persons[0].name = "Maximilian";
    this.setState({ persons: [
        { name: newName, age: 28},
        { name: "Manu", age: 29},
        { name: "Stephanie", age: 27}
      ]
    })
  };

  nameChangedHandler = (event, id) => {
    const person = {
      ...this.state.persons[id]
    };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[id] = person;
    this.setState({ persons: persons })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (indexPerson) => {
    const persons = [...this.state.persons];
    persons.splice(indexPerson, 1);
    this.setState({persons: persons});
  }

  render(){
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons = null;

    if (this.state.showPersons) {
        persons = (
          <div>
            {this.state.persons.map((person, index) => {
              return <Person 
                key={index}
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                changed={(event) => this.nameChangedHandler(event, index)}/>
            })}
          </div>
        )

        style.backgroundColor = 'red';
        style[':hover'] = {
          backgroundColor: 'salmon',
          color: 'black'
        };
    }

    const classes = [];
    if (this.state.persons.length <= 2){
      classes.push('red');
    }
    if (this.state.persons.length <= 1){
      classes.push('bold');
    }

    return (
      //<StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <StyleButton alt={this.state.showPersons}
            onClick={this.togglePersonsHandler}>
              Switch Name
          </StyleButton>
          { persons }
        </div>
      //</StyleRoot>
    );
  }
}

//export default Radium(App);
export default App;

/*state = {
  persons: [
    { name: "Max", age: 28},
    { name: "Manu", age: 29},
    { name: "Stephanie", age: 26}
  ]
}

switchNameHandler = () => {
  // DON'T DO THIS: this.state.persons[0].name = "Maximilian";
  this.setState({ persons: [
      { name: "Maximilian", age: 28},
      { name: "Manu", age: 29},
      { name: "Stephanie", age: 27}
    ]
  })
};*/