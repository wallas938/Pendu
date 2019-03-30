import React, { Component } from 'react';
import { Mask } from './components/Mask';
import { Keyboard } from './components/Keyboard';
import { Results } from './components/Results';
import { dico } from './dico';
import './App.css';

var shuffle = require('shuffle-array');

export class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      dico: dico,
      currentWord: [],
      goodAnswers: [],
      counter: 0,
    }
    this.handleTries = this.handleTries.bind(this)
    this.randomPick = this.randomPick.bind(this)
    this.startGame = this.startGame.bind(this)
    this.endGame = this.endGame.bind(this)
    this.comparison = this.comparison.bind(this)
  }

  handleTries () {
    this.setState(prevState => ({counter : prevState.counter += 1}));
  }


  randomPick () {
    this.setState((prevState, props) => ({ goodAnswers: prevState.goodAnswers = [] }))
    this.setState(prevState => ({counter : prevState.counter = 0}));
    const tab = this.state.dico;
    var secret_word = shuffle.pick(tab, {picks: 1});
    secret_word = secret_word.split('');
    this.setState({ currentWord: secret_word });
  }

  startGame () {
    this.setState(prevState => ({ start: prevState.start = true }));
    this.randomPick(); 
  }

  endGame () {
    this.setState(prevState => ({ start: prevState.start = false }));
  }

  comparison (ltr) {
    if(this.state.currentWord.includes(ltr) && !this.state.goodAnswers.includes(ltr) && this.state.currentWord.length !== this.state.goodAnswers.length) {
      
      var occurence = 0;
      this.state.currentWord.forEach(letter => {
        if(letter === ltr) {
          occurence += 1;
        }
      })

      for (let index = 0; index < occurence; index++) {
        this.setState((prevState, props) => ({ goodAnswers: prevState.goodAnswers.concat(ltr) }))
      }
    }else {
      this.handleTries();
    }
  }
  
  render() {
    const begin = this.state.start;
    if(!begin) {
      return (<div className="buttonContainer">
                <button onClick={this.startGame} className="start_btn uk-button uk-button-danger uk-button-large">
                  COMMENCEZ ICI !
                </button>
                </div>)
    }else if (begin) {
      return (<div>
        <Results count={this.state.counter} />
        <Mask goodAnswers={ this.state.goodAnswers } secret_word={ this.state.currentWord } counter={this.state.counter}/>
        <Keyboard endGame={this.endGame} currentWord={ this.state.currentWord } goodAnswers={ this.state.goodAnswers } comparison={ this.comparison } randomPick={this.randomPick} counter={this.state.counter}/>
      </div>)
    }
     
  }
}
