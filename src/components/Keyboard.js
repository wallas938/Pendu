import React, { Component } from 'react';
import { ButtonReplay } from './ButtonReplay';
import { ButtonQuit } from './ButtonQuit';
const firstThirteens = 'ABCDEFGHIJKLM'.split('');
const lastThirteens = 'NOPQRSTUVWXYZ'.split('');

export class Keyboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            done: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.currentWord.length === nextProps.goodAnswers.length){
            this.setState(prevState =>({
                done: prevState.done = true
            }))
        }
    }

    handleClick = (e) => {
        e.target.classList.remove("btn-outline-danger");
        e.target.classList.remove("btn-outline-success");
        e.target.classList.add("btn-dark");
        const ltr = e.target.value; 
        this.props.comparison(ltr);
    }

    handleEndClick = () => {
        this.props.endGame();
    }
    
    replay = () => {
        this.setState(prevState =>({
            done: prevState.done = false
        }))
        this.props.randomPick();
    }

       render () {
           if(!this.state.done && this.props.counter < 10){
               return (
                <div>
                    <table>
                    <tbody>
                        <tr>
                            {firstThirteens.map(letter => 
                                <td key={letter} className="">
                                    <button
                                        onClick={this.handleClick}
                                        type="button" 
                                        className="keyboard_letters firstLine_letters btn btn-outline-danger btn-lg" 
                                        value={letter}>
                                        {letter}
                                    </button>
                                </td>)
                            }
                        </tr>
                        <tr>
                            {lastThirteens.map(letter => 
                                <td key={letter} className="">
                                    <button 
                                        onClick={this.handleClick}
                                        type="button" 
                                        className="keyboard_letters btn btn-outline-success btn-lg" 
                                        value={letter}>
                                        {letter}
                                    </button>
                                </td>)
                            }
                        </tr>
                    </tbody>
                </table>
                <ButtonQuit handleEndClick={this.handleEndClick}/>
                </div>
                )
                }else if(this.state.done || this.props.counter >= 10){
                    return (<div className="btns_group">
                    <ButtonReplay replay={this.replay}/>
                    <ButtonQuit handleEndClick={this.handleEndClick}/>
                    </div>
                    
                    )
                }
           }
       }