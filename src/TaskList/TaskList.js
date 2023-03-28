import React, { Component } from "react";
import View from "../View/View";
import './TaskList.css'

export default class TaskList extends Component  {
  
  render() {
    const {dataTasks,onDeleted,onToggle} = this.props
      
    const itemTasks = dataTasks.map(item => {
      let className='';
      if(item.done) {
        className += 'completed'
      }
      return <li key={item.id} className={className}>
                  <View descr={item.descr}  
                        onDeleted ={ () =>{onDeleted(item.id)}}
                        onToggle = {() => {onToggle(item.id)}}
                        done = {item.done}
                  /> 
                  <input type="text" readOnly className="edit" value={"Editing task"}/> 
             </li>
    })
  
    return <ul className="todo-list">
              {itemTasks}
           </ul>
  }
}


