import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent'
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
  state = {
    text: '',
    length: 0
  }

  inputChangedHandler = (newText) => {
    let text = this.state.text;
    text = newText;
    this.setState({text: text});
    this.setState({length: this.state.length + 1});
  };
  
  deleteLetterHandler = (index) => {
    let newText = this.state.text.split('');
    newText.splice(index, 1);
    this.setState({text: newText.join('')});
    this.setState({length: this.state.length - 1})
  };

  render() {
    const style = {
      margin: "16px"
    }

    let charElements = null;
    const chars = this.state.text.split('');

    charElements = (
      <div>
        {chars.map((c, index) => {
          return <CharComponent 
            click={() => this.deleteLetterHandler(index)}
            character={c} />
        })}
      </div>
    );

    return (
      <div className="App">
        <input type="text" style={style} 
          onChange={(event) => this.inputChangedHandler(event.target.value)} 
          value={this.state.text}/>
        <ValidationComponent length={this.state.length}/>
        {charElements}
      </div>
    );
  }
}

export default App;
