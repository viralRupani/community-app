import React from 'react';

function InputBox(props) {
    return (
        <input type={props.type} onChange={props.handleChange} value={props.value}/>
    )
}

export default InputBox;