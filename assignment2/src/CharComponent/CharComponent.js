import React, { Component } from 'react';
import "./CharComponent.css";

class CharComponent extends Component {
    
    render() {
        return (
            <div onClick={this.props.click} className="CharComponent">
                <p>{this.props.character}</p>
            </div>
        );
    }
}

export default CharComponent;