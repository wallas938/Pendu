import React from 'react';

export function Results (props) {


    return (
        <div>
            <p className="attemps" style={{color: '#808000'}}>Tentatives : {props.count} /10</p>
        </div>
    )
}