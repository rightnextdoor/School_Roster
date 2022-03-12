import React,{Component} from "react";

function Home (props){
        
        return(
            <div>
                <h1>Home</h1>
                <h4>Welcome {props.profile.firstName} {props.profile.lastName}</h4>
                <h4>Roles {props.user.role} </h4>
            </div>
        );
    
}

export default Home;