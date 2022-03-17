import React,{Component} from "react";
import Home from "./HomeComponent";
import Welcome from "./Welcome";
import Logout from "./Logout";
import Header from "./HeaderComponent";
import Profile from "./Profile/ProfileComponent";
import CreateProfile from "./Profile/CreateProfile";
import StudentComponent from "./Student/StudentComponent";
import TeacherComponent from "./Teacher/TeacherComponent";
import LeaderComponent from "./Leader/LeaderComponent";
import _ from 'lodash';
import {Switch, Route, Redirect, Router, withRouter} from 'react-router-dom';
import { fetchProfile, profileUpdate, addAddress, addPhoneNumber, deleteAddress, deletePhoneNumber, initiateProfile } from "../redux/ProfileCreators/ActionCreators";
import { fetchUser, initiateLogin, login, fetchAllStudents, fetchAllTeachers, fetchAllLeaders } from "../redux/UserCreators/ActionCreators";
import { fetchPhoto, initiatePhoto, photoUpdate } from "../redux/PhotoCreators/ActionCreators";
import {createBrowserHistory} from 'history';
import {connect} from 'react-redux';

export const history = createBrowserHistory();

const mapStateToProps = (state) => {
    return {
        user: state.user,
        profile: state.profile,
        photo: state.photo,
        studentUsers: state.studentUsers,
        teacherUsers: state.teacherUsers,
        leaderUsers: state.leaderUsers,
    }
}

const mapDispatchToProps = (dispatch) => ({
    initiateLogin: (username, password) => dispatch(initiateLogin(username, password)),
    fetchUser: () => {dispatch(fetchUser())},
    login: (username, password) => dispatch(login(username,password)),
    fetchProfile: () => {dispatch(fetchProfile())},
    profileUpdate: (profile) => dispatch(profileUpdate(profile)),
    initiateProfile: (profile) => dispatch(initiateProfile(profile)),
    addAddress: (address) => dispatch(addAddress(address)),
    addPhoneNumber: (phone) => dispatch(addPhoneNumber(phone)),
    deleteAddress: (address) => dispatch(deleteAddress(address)),
    deletePhoneNumber: (phone) => dispatch(deletePhoneNumber(phone)),
    initiatePhoto: (photo) => dispatch(initiatePhoto(photo)),
    photoUpdate: (photo) => dispatch(photoUpdate(photo)),
    fetchPhoto: () => {dispatch(fetchPhoto())},
    fetchAllStudents: () => {dispatch(fetchAllStudents())},
    fetchAllTeachers: () => {dispatch(fetchAllTeachers())},
    fetchAllLeaders: () => {dispatch(fetchAllLeaders())},
});

class Main extends Component{
     
    componentDidMount(){
       this.props.fetchUser();
        this.props.fetchProfile(); 
        this.props.fetchPhoto();
        this.props.fetchAllStudents();
        this.props.fetchAllTeachers();
        this.props.fetchAllLeaders();
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
                                deleteAddress={this.props.deleteAddress} deletePhoneNumber={this.props.deletePhoneNumber}
                                photo={this.props.photo.photo} postPhoto={this.props.initiatePhoto} photoUpdate={this.props.photoUpdate}/>}
                            />
                            <Route path="/createProfile" component={() => <CreateProfile postProfile={this.props.initiateProfile}
                               user={this.props.user.user} />} />
                            <Route path="/student" component={() => <StudentComponent studentList={this.props.studentUsers.studentUsers}/>} />
                            <Route path="/teacher" component={() => <TeacherComponent teacherList={this.props.teacherUsers.teacherUsers}/>} />
                            <Route path="/leader" component={() => <LeaderComponent leaderList={this.props.leaderUsers.leaderUsers}/>} />
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