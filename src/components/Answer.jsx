import React, { Component } from 'react'

export default class Answer extends Component {
    handleCheckboxChange = () => {
        this.props.onChange(this.props)
    }
    render() {
        return (
            <div>
                <input className='m-1' type="checkbox" checked={this.props.answer.checked} onChange={this.handleCheckboxChange}/>
                {this.props.answer.text}
            </div>
        )
    }
}
