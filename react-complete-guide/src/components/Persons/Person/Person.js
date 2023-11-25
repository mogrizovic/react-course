import React, { Component } from 'react';

class Person extends Component {
    render() {
    return (
        <div className="Person">
            <p onClick={this.props.clicked}>Hi, my name is {this.props.name}, and I'm {this.props.age} years old!</p>
            <p>{this.props.children}</p>
            <input type='text' onChange={this.props.changed} value={this.props.name}/>
        </div>
    )
    }
}

export default Person;