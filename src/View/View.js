import React, { Component } from "react";

export default class View extends Component  {

    render() {
        const {descr,onDeleted,onToggle,done} = this.props
              
        return (
            <div className="view">
                <input name="check" type="checkbox" checked ={done} className="toggle"
                onChange={onToggle}
                />
                <label for ="check">
                    <span className="description" >{descr}</span>
                    <span className="created"></span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy" onClick={onDeleted}></button>
            </div>
        )
    }
}

