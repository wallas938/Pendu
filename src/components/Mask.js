import React, { Component } from 'react';

export class Mask extends Component {

    constructor(props) {
        super(props);

        this.state={
        congrateMessage: '',
        }
    }
    

    componentWillReceiveProps(nextProps) {
        if(this.props.secret_word.length === nextProps.goodAnswers.length && nextProps.counter <= 10){
            this.setState(prevState =>({
                congrateMessage: prevState.congrateMessage = 'Felicitation !!! Le mot secret était bien: '+this.props.secret_word.join('')
            }))
        }else if( nextProps.counter >= 10 && this.props.secret_word.length !== nextProps.goodAnswers.length) {
            this.setState(prevState =>({
                congrateMessage: prevState.congrateMessage = 'Dommage vous n\'avez plus de chances...'
            }))
            
        }else{
            this.setState(prevState =>({
                congrateMessage: prevState.congrateMessage = ''
            }))
        }
    }

            render() {
                const errorStyles = {
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: 42,
                }

                const myStyles = {
                    color: 'green',
                    fontWeight: 'bold',
                    fontSize: 42,
                }
                
                if(this.props.counter >=10 ){
                    return (
                        <div className="mask">
                        <p style={ errorStyles }>
                        Le mot secret était : 
                            { this.props.secret_word.map((letter, i) => {
                                return <span style={ errorStyles }key={i} className="scr_letters">{letter}</span>
                                })
                            }
                        </p>
                        <p style={ errorStyles }>{this.state.congrateMessage}</p>
                        
                    </div>)
                }else{
                    return  (
                        <div className="mask">
                            <p>
                                { this.props.secret_word.map((letter, i) => {
                                    return <span style={ myStyles } key={i} className="scr_letters">{this.props.goodAnswers.includes(letter)? letter: '_'}</span>
                                    })
                                }
                            </p>
                            <p style={ myStyles }>{this.state.congrateMessage}</p>
                            
                        </div>)
                }
                
            }
    }