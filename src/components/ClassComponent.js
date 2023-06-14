import React from "react";

class ClassComponent extends React.Component{
    
    constructor(props){
       super(props)

       this.state  = {msg:"hello !!!"}
    }

    componentWillMount() {
        console.log("componentWillMount()");
    }
  
    componentDidMount() {
        console.log("componentDidMount()");
    }
  
    changeState() {
        this.setState({ msg: "Hello!" });
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate()");
        return true;
    }
  
    componentWillUpdate() {
        console.log("componentWillUpdate()");
    }
  
    componentDidUpdate() {
        console.log("componentDidUpdate()");
    }

    render(){
        return (
            <div>
                <h1>hi from class component</h1>
                <button onClick={this.changeState.bind(this)}>click me</button>
            </div>
        );
    }
}

export default ClassComponent;