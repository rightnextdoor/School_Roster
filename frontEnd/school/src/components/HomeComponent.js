import React,{Component} from "react";

function Home ({user}){
        
        return(
            <div>
                <h1>Home</h1>
                <h4>Welcome {user.firstName} {user.lastName}</h4>
                <h4>Roles {user.roles} </h4>
            </div>
        );
    
}

export default Home;