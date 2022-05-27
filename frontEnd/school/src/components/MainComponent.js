import React, { Component } from "react";
import Home from "./HomeComponent";
import Welcome from "./Welcome";
import Logout from "./Logout";
import Header from "./HeaderComponent";
import Profile from "./Profile/ProfileComponent";
import StudentComponent from "../components/ListOfUsers/Student/StudentComponent";
import TeacherComponent from "../components/ListOfUsers/Teacher/TeacherComponent";
import LeaderComponent from "../components/ListOfUsers/Leader/LeaderComponent";
import MyRoster from "../components/Roster/MyRoster";
import AllRoster from "./Roster/AllRoster";
import Registration from "./Registration";
import InitiateProfile from "./Profile/InitiateProfile";
import _ from 'lodash';
import { Switch, Route, Redirect, Router, withRouter } from 'react-router-dom';
import { fetchUser, initiateLogin, fetchAllStudents, fetchAllTeachers, fetchAllLeaders, registerNewUser } from "../redux/UserCreators/ActionCreators";
import { initiateProfile } from "../redux/ProfileCreators/ActionCreators"
import { fetchAllRoster } from "../redux/Roster/ActionCreators";
import { fetchPhoto, initiatePhoto, photoUpdate } from "../redux/PhotoCreators/ActionCreators";
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import FormikContainer from "./Formik/FormikContainer";
import RegistrationEx from "./Formik/RegistrationEx";
import EnrollmentEx from "./Formik/EnrollmentEx";
import FormikEx from "./Formik/FormikEx";

export const history = createBrowserHistory();

const mapStateToProps = (state) => {
    return {
        user: state.user,
        photo: state.photo,
        profile: state.profile,
        studentUsers: state.studentUsers,
        teacherUsers: state.teacherUsers,
        leaderUsers: state.leaderUsers,
        allRoster: state.allRoster,

    }
}

const mapDispatchToProps = (dispatch) => ({
    initiateLogin: (username, password) => dispatch(initiateLogin(username, password)),
    fetchUser: () => { dispatch(fetchUser()) },
    registerNewUser: (data) => dispatch(registerNewUser(data)),
    initiateProfile: (profile) => dispatch(initiateProfile(profile)),
    initiatePhoto: (photo) => dispatch(initiatePhoto(photo)),
    photoUpdate: (photo) => dispatch(photoUpdate(photo)),
    fetchPhoto: () => { dispatch(fetchPhoto()) },
    fetchAllStudents: () => { dispatch(fetchAllStudents()) },
    fetchAllTeachers: () => { dispatch(fetchAllTeachers()) },
    fetchAllLeaders: () => { dispatch(fetchAllLeaders()) },
    fetchAllRoster: () => { dispatch(fetchAllRoster()) },

});

class Main extends Component {

    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchPhoto();
        this.props.fetchAllStudents();
        this.props.fetchAllTeachers();
        this.props.fetchAllLeaders();
        this.props.fetchAllRoster();

    }

    render() {

        const user = this.props.user.user;
        // console.log('user error', this.props.user.errMess)

        const token = localStorage.getItem('user_token');
        return (
            <Router history={history}>
                <div>
                    {!_.isEmpty(token) && <Header profile={user} />}
                    <div className="container">
                        <Switch>
                            <Route path="/"
                                component={() => <Welcome
                                    postUser={this.props.initiateLogin}
                                    error={this.props.user.errMess} />}
                                exact={true}
                            />
                            <Route path="/home" component={() => <Home user={user} />} />

                            <Route path="/profile"
                                component={() => <Profile
                                    profile={user.profile}
                                    error={this.props.profile.errMess}
                                />}
                            />
                            <Route path="/createProfile"
                                component={() => <InitiateProfile
                                    postProfile={this.props.initiateProfile}
                                    error={this.props.profile.errMess}
                                />}
                            />
                            <Route path="/student"
                                component={() => <StudentComponent
                                    studentList={this.props.studentUsers.studentUsers}
                                    error={this.props.studentUsers.errMess}
                                />}
                            />
                            <Route path="/teacher"
                                component={() => <TeacherComponent
                                    teacherList={this.props.teacherUsers.teacherUsers}
                                    error={this.props.teacherUsers.errMess}
                                />}
                            />
                            <Route path="/leader"
                                component={() => <LeaderComponent
                                    leaderList={this.props.leaderUsers.leaderUsers}
                                    error={this.props.leaderUsers.errMess}
                                />}
                            />
                            <Route path="/myRoster"
                                component={() => <MyRoster
                                    roster={user.rosters}
                                    error={this.props.user.errMess}
                                />}
                            />
                            <Route path="/allRoster"
                                component={() => <AllRoster
                                    roster={this.props.allRoster.allRoster}
                                    error={this.props.allRoster.errMess}
                                />}
                            />
                            <Route path="/createUser"
                                component={() => <Registration
                                    createUser={this.props.registerNewUser}
                                    error={this.props.user.errMess}
                                />}
                            />

                            <Route path="/newProfile" component={FormikEx} />
                            {/* <Route path="/newProfile" component={FormikContainer} /> */}
                            {/* <Route path="/newProfile" component={RegistrationEx} /> */}
                            {/* <Route path="/newProfile" component={EnrollmentEx} /> */}
                            {/* <Route path="/newProfile" component={Registration} /> */}

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