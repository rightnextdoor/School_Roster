import React,{Component} from "react";
import Home from "./HomeComponent";
import Welcome from "./Welcome";
import Logout from "./Logout";
import Header from "./HeaderComponent";
import Profile from "./Profile/ProfileComponent";
import CreateProfile from "./Profile/CreateProfile";
import StudentComponent from "../components/ListOfUsers/Student/StudentComponent";
import TeacherComponent from "../components/ListOfUsers/Teacher/TeacherComponent";
import LeaderComponent from "../components/ListOfUsers/Leader/LeaderComponent";
import MyRoster from "../components/Roster/MyRoster";
import AllRoster from "./Roster/AllRoster";
import ShowUserProfile from "./Profile/ShowUserProfile";
import CreateStudents from "./CreateUsers/CreateStudents";
import CreateTeacher from "./CreateUsers/CreateTeacher";
import _ from 'lodash';
import {Switch, Route, Redirect, Router, withRouter} from 'react-router-dom';
import { profileUpdate, addAddress, addPhoneNumber, deleteAddress, deletePhoneNumber, initiateProfile } from "../redux/ProfileCreators/ActionCreators";
import { fetchUser, initiateLogin, login, fetchAllStudents, fetchAllTeachers, fetchAllLeaders, registerNewUser } from "../redux/UserCreators/ActionCreators";
import { fetchAllRoster } from "../redux/Roster/ActionCreators";
import { fetchPhoto, initiatePhoto, photoUpdate } from "../redux/PhotoCreators/ActionCreators";
import {createBrowserHistory} from 'history';
import {connect} from 'react-redux';


export const history = createBrowserHistory();

const mapStateToProps = (state) => {
    return {
        user: state.user,
        
        photo: state.photo,
        studentUsers: state.studentUsers,
        teacherUsers: state.teacherUsers,
        leaderUsers: state.leaderUsers,
        
        allRoster: state.allRoster,
    }
}

const mapDispatchToProps = (dispatch) => ({
    initiateLogin: (username, password) => dispatch(initiateLogin(username, password)),
    fetchUser: () => {dispatch(fetchUser())},
    login: (username, password) => dispatch(login(username,password)),
    registerNewUser: (data) => dispatch(registerNewUser(data)),
    
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
    fetchAllRoster: () => {dispatch(fetchAllRoster())},
    
});

class Main extends Component{
     
    componentDidMount(){
       this.props.fetchUser();
       this.props.fetchPhoto();
        this.props.fetchAllStudents();
        this.props.fetchAllTeachers();
        this.props.fetchAllLeaders();
        this.props.fetchAllRoster();
        
      }
    
    render(){
        console.log("user ", this.props.user.user);
        const user = this.props.user.user;
        
        const token = localStorage.getItem('user_token');
        return(
            <Router history={history}>
                <div>
                    {!_.isEmpty(token) && <Header profile={user}/>}
                    <div className="container">
                        <Switch>
                            <Route path="/" component={() => <Welcome postUser={this.props.initiateLogin} />} exact={true} />
                            <Route path="/home" component={() => <Home user={user} />} /> 
                            <Route path="/profile/user" component={ShowUserProfile} />    
                            <Route path="/profile" component={() => <Profile profile={user.profile} 
                                postProfile={this.props.profileUpdate}
                                addAddress={this.props.addAddress} addPhoneNumber={this.props.addPhoneNumber}
                                deleteAddress={this.props.deleteAddress} deletePhoneNumber={this.props.deletePhoneNumber}
                                photo={this.props.photo.photo} postPhoto={this.props.initiatePhoto} photoUpdate={this.props.photoUpdate}/>}
                            />
                            <Route path="/createProfile" component={() => <CreateProfile postProfile={this.props.initiateProfile}
                               user={user.profile.user} />} />
                            <Route path="/student" component={() => <StudentComponent studentList={this.props.studentUsers.studentUsers}/>} />
                            <Route path="/teacher" component={() => <TeacherComponent teacherList={this.props.teacherUsers.teacherUsers}/>} />
                            <Route path="/leader" component={() => <LeaderComponent leaderList={this.props.leaderUsers.leaderUsers}/>} />
                            <Route path="/myRoster" component={() => <MyRoster roster={user.rosters} />} />
                            <Route path="/allRoster" component={() => <AllRoster roster={this.props.allRoster.allRoster} />} /> 
                            <Route path="/createStudents" component={() => <CreateStudents createUser={this.props.registerNewUser} />} />
                            <Route path="/createTeachers" component={() => <CreateTeacher createUser={this.props.registerNewUser}/>} />
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