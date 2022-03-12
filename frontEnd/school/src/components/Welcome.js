import React,{Component} from "react";
import Login from "./Login";

class Welcome extends Component{
    
render(){
        return(
            <>
                <h1>Welcome</h1>
                <Login postUser={this.props.postUser}/>
            </>
        );
    }
}

export default Welcome;