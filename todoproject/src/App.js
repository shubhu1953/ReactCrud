import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/header';
import AddToDo from './components/AddToDo';
import About from './components/pages/About';
import uuid from 'uuid';
import axios from 'axios';

class App extends Component {
  state = {
    todos: []
  }
  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({ todos: res.data}))
  }

  markComplete = (id) => {
    this.setState({todos : this.state.todos.map(todo => {
      if(todo.id == id){
        todo.completed = !todo.completed
      }
      return todo;
    })});
  }
  delete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos : [...this.state.todos.filter(todo => todo.id !== id)]}))    
  }
  AddToDo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed : false})
    .then(res => this.setState({ todos: [...this.state.todos, res.data]}))
    
  }

  render(){
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header></Header>
            <Route exact path="/" render={props =>(
              <React.Fragment>
                <AddToDo AddToDo={this.AddToDo}></AddToDo>
                <Todos todos={this.state.todos} markComplete={this.markComplete} delete={this.delete}></Todos>
              </React.Fragment>
            )}></Route>
            <Route path="/about" component={About}></Route>
            
          </div>        
       </div>
      </Router>
      
    );
  }
}

export default App;
