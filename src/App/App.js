import React, {Component} from "react";
import Header from "../Header/Header";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";
import './App.css'

export default class App extends Component {

    state = {
        data: [
            {descr:'Завершенная задача',id:0,done:false},
            {descr:'Editin task',id:1,done:false},
            {descr:'Активная задача',id:2,done:false},
    
        ]               
    }

    onToggle = (id) => {
        
        this.setState(({data}) => {
            const res = data.map(item => (item.id === id ? { ...item, done:!item.done} : item))
            return {
                data:res
            }
        })
    }
    
    deleteItem = (id) => {
        
        this.setState(({data}) => {
            const idx = data.findIndex(el => el.id = id +1)
            const result = [...data.slice(0,idx),...data.slice(idx + 1)]

            return {
                data:result
            }
        })
    }
    
    render () {
        const {data} = this.state
        return (
            <section className="todoapp">
                <Header/>
                <section  className="main">
                    <TaskList
                    dataTasks={data} 
                    onDeleted = {this.deleteItem}
                    onToggle = {this.onToggle}
                    
                    />
                    <Footer/>
                </section>
            </section>
        )
    }
}


