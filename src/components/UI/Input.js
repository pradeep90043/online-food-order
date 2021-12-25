import React from 'react'
import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => { //used ref from its parent component
    return (
        <div className={classes.input} >
            <label htmlFor={props.input.id}>{props.name} </label>
            <input ref={ref} {...props.input}  />
        </div>
    )
})

export default Input
