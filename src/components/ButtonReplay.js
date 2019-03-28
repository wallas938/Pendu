import React from 'react';

export function ButtonReplay(props){
    return (<div className="container_btn_repeat_game">
                        <button  className="btn_repeat_game uk-button uk-button-danger uk-button-large" onClick={props.replay}>
                        Voulez-vous rejouer ?
                        </button>
                    </div>)
}