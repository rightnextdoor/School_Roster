import React,{Component} from "react";
import Home from "./HomeComponent";
import Welcome from "./Welcome";
import Logout from "./Logout";
import Header from "./HeaderComponent";
import Profile from "./Profile/ProfileComponent";
import _ from 'lodash';
import {Switch, Route, Redirect, Router, withRouter} from 'react-router-dom';
import { fetchProfile, profileUpdate, addAddress, addPhoneNumber, deleteAddress, deletePhoneNumber } from "../redux/ProfileCreators/ActionCreators";
import { fetchUser, initiateLogin, login } from "../redux/UserCreators/ActionCreators";
import {createBrowserHistory} from 'history';
import {connect} from 'react-redux';

export const history = createBrowserHistory();

const mapStateToProps = (state) => {
    return {
        user: state.user,
        profile: state.profile
        
    }
}

const mapDispatchToProps = (dispatch) => ({
    initiateLogin: (username, password) => dispatch(initiateLogin(username, password)),
    fetchUser: () => {dispatch(fetchUser())},
    login: (username, password) => dispatch(login(username,password)),
    fetchProfile: () => {dispatch(fetchProfile())},
    profileUpdate: (profile) => dispatch(profileUpdate(profile)),
    addAddress: (address) => dispatch(addAddress(address)),
    addPhoneNumber: (phone) => dispatch(addPhoneNumber(phone)),
    deleteAddress: (address) => dispatch(deleteAddress(address)),
    deletePhoneNumber: (phone) => dispatch(deletePhoneNumber(phone)),
});

class Main extends Component{
     
    componentDidMount(){
       this.props.fetchUser();
        this.props.fetchProfile(); 
      }
    
    render(){
       
        const token = localStorage.getItem('user_token');
        return(
            <Router history={history}>
                <div>
                    {!_.isEmpty(token) && <Header profile={this.props.profile.profile}/>}
                    <div className="container">
                        <Switch>
                            <Route path="/" component={() => <Welcome postUser={this.props.initiateLogin} />} exact={true} />
                            <Route path="/home" component={() => <Home user={this.props.user.user}
                                profile={this.props.profile.profile}/>} /> 
                            <Route path="/profile" component={() => <Profile profile={this.props.profile.profile}
                                user={this.props.user.user} postProfile={this.props.profileUpdate}
                                addAddress={this.props.addAddress} addPhoneNumber={this.props.addPhoneNumber}
                                deleteAddress={this.props.deleteAddress} deletePhoneNumber={this.props.deletePhoneNumber}/>}
                            />
                            <Route path="/logout" component={Logout} />
                            <Redirect to="/home" />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));