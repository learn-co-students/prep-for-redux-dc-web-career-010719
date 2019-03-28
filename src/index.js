import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.svg';
import './App.css';
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import {BrowserRouter, withRouter} from 'react-router-dom'

const BIGGER_COUNT = "BIGGER_COUNT"
const LITTLER_COUNT = "LITTLER_COUNT"

const getInitialState = () => ({count: 0})

//reducer needs to return a newState based on currentState and action
const reducer = (currentState=getInitialState(), action) => {
  console.log("Current State:", currentState, "Action:", action)
  //based on the action.type, return {newState}
  switch(action.type) {
    case "BIGGER_COUNT":
      return {...currentState, count: currentState.count + action.payload}
    case "LITTLER_COUNT":
      return {...currentState, count: currentState.count - action.payload}
    default:
      return currentState
  }
}

let store = createStore(reducer)
console.log("Store:", store.getState())

class App extends Component {

  // componentDidMount() {
  //   store.subscribe(() => this.forceUpdate())
  // }


  render() {
    return (
      <div className="App">
        <Header />
        <Counter increment={this.increment} decrement={this.decrement}/>
      </div>
    );
  }
}

class Header extends Component {
  renderDescription = () => {
    const remainder = store.getState().count % 5;
    const upToNext = 5 - remainder;
    return `The current count is less than ${store.getState().count + upToNext}`;
  };
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>{this.renderDescription()}</h3>
      </header>
    );
  }
}

//connect is a function that returns a HOC
const mapStateToProps = storeState => ({
  countValue: storeState.count
})
const EnhancedHeader = connect(mapStateToProps)(Header)

//create a HOC called withCount
// const withCount = (Component) => {
//   const EnhancedComponent = props => {
//     return <Component {...props} counterValue={store.getState().count}/>
//   }
//   return EnhancedComponent
// }

class Counter extends Component {

  increment = num => {
    //instead of this.setState, we want to dispatch an action
    //store.dispatch({}) where the argument is an action object
    // this.setState(prevState => ({ count: prevState.count + 1 }));
    store.dispatch({type: BIGGER_COUNT, payload: num})
    console.log("Store after we click plus", store.getState())
  };

  decrement = num => {
    //this.setState(prevState => ({ count: prevState.count - 1 }));
    store.dispatch({type: LITTLER_COUNT, payload: num})
  };



  render() {
    return (
      <div className="Counter">
        <h1>{store.getState().count}</h1>
        <button onClick={()=>this.decrement(5)}> -5 </button>
        <button onClick={()=>this.decrement(1)}> - </button>
        <button onClick={()=>this.increment(1)}> + </button>
        <button onClick={()=>this.increment(3)}> +3 </button>

      </div>
    );
  }
}



//Higher Order Component is a function that takes in a component and returns an enhanced version of that component
//Try to create BlueHeader that is an exact copy of Header, => {color: "blue"}
// const withColor = (Component, color) => {
//   const EnhancedComponent = props => {
//     return <Component {...props} color={color}/>
//   }
//   return EnhancedComponent
// }
//
// const RedHeader = withColor(Header, "red")
// const BlueHeader = withColor(Header, "blue")
//
// const AppWithRouter = withRouter(App)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
