import React, { Component } from 'react'

export default class Answer extends Component {
    render() {
        return (
            <div>
                <input type="checkbox"></input>
                <div>{this.props.answer.text}</div>
            </div>
        )
    }
}
