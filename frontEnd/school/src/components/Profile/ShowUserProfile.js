import React, { Component } from 'react';
import { Form, Button} from 'react-bootstrap';
import PhoneNumber from './PhoneNumber';
import Address from './Address';
import ProfileInformation from './ProfileInformation';
import AddAddress from './AddAddress';
import AddPhoneNumber from './AddPhoneNumber';
import { profileUpdate, addAddress, addPhoneNumber, deleteAddress, deletePhoneNumber, fetchProfile } from '../../redux/ProfileCreators/ActionCreators';
import { fetchAllLeaders, fetchAllStudents, fetchAllTeachers } from '../../redux/UserCreators/ActionCreators';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  profileUpdate: (profile) => dispatch(profileUpdate(profile)),
  addAddress: (address) => dispatch(addAddress(address)),
  addPhoneNumber: (phone) => dispatch(addPhoneNumber(phone)),
  deleteAddress: (address) => dispatch(deleteAddress(address)),
  deletePhoneNumber: (phone) => dispatch(deletePhoneNumber(phone)),
  fetchProfile: () => {dispatch(fetchProfile())},
  fetchAllStudents: () => {dispatch(fetchAllStudents())},
  fetchAllTeachers: () => {dispatch(fetchAllTeachers())},
  fetchAllLeaders: () => {dispatch(fetchAllLeaders())},
});

export class ShowUserProfile extends Component {
  constructor(props) {
    super(props)

    const {profile} = this.props.location.state;
   
    this.state = {      
      profile: profile,
      id: profile.id,
      firstName: profile.firstName, 
      lastName: profile.lastName,
      ssn: profile.ssn,
      address: profile.address,
      phoneNumber: profile.phoneNumber,
      user: profile.user,
      photo: '',
      toggleAddress: false,
      togglePhone: false
    }
    this.updateProfile = this.updateProfile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  componentDidMount(){
    this.props.fetchProfile();
    this.props.fetchAllStudents();
    this.props.fetchAllTeachers();
    this.props.fetchAllLeaders(); 
   }

  toggleAddAddress = () => {
    this.setState({toggleAddress: !this.state.toggleAddress})
  }

  toggleAddPhone = () => {
    this.setState({togglePhone: !this.state.togglePhone})
  }
  
  callbackProfile = (profile) => {
    const updateProfile = profile[0];
    this.setState({
      id: updateProfile.id,
      firstName: updateProfile.firstName, 
      lastName: updateProfile.lastName,
      ssn: updateProfile.ssn
      })
      this.updateProfile();
    }
  
  callbackPhoneList = (list) => {
    this.setState(prevState => ({
      phoneNumber: prevState.phoneNumber.map(eachItem =>
      eachItem.id === list.id ? {...eachItem, 
        phoneType: list.phoneType,
        phoneNumber: list.phoneNumber } 
        : eachItem
      )
    }));
          
  }
  
  callbackAddressList = (list) => {
    this.setState(prevState => ({
      address: prevState.address.map(eachItem =>
        eachItem.id === list.id ? {...eachItem, 
          streetAddress: list.streetAddress,
          city: list.city,
          state: list.state,
          zipCode: list.zipCode } 
          : eachItem
      )
    }));
         
  }
      
  updateProfile(){
   
    console.log('update');
    const { id, firstName, lastName, ssn, address, phoneNumber, user} = this.state;
    
    const profile = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        ssn: ssn,
        user: user, 
        address: address, 
        phoneNumber: phoneNumber
      };
          
      console.log('update', profile);
      this.props.profileUpdate(profile);
      this.toggleSubmit();
    
    
  }

  addAddress = (address) => {
    const {user} = this.state;
    const send = {
      user: user,
      address: address
    }
    this.props.addAddress(send);
  }

  addPhoneNumber = (phone) => {
    const {user} = this.state;
    const send = {
      user: user,
      phoneNumber: phone
    }
    this.props.addPhoneNumber(send);
  }

  deleteAddress = (address) => {
    const {user} = this.state;
    const send = {
      user: user,
      address: address
    }
    this.props.deleteAddress(send);
  }
  
  deletePhoneNumber = (phone) => {
    const {user} = this.state;
    const send = {
      user: user,
      phoneNumber: phone
    }
    this.props.deletePhoneNumber(send);
  }
  
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  
  render() {
    const {profile} = this.props.location.state;
    
    var addressList = [];
    var phoneNumberList = [];
      
    if(profile.address){
        addressList = profile.address;
    }
    if(profile.phoneNumber){
        phoneNumberList = profile.phoneNumber;
    }

    return (
      <div>
      <Form onSubmit={this.updateProfile}>
        <h4>Profile</h4>
        <ProfileInformation 
          key={profile.id}
          profile={profile}
          getProfile={this.callbackProfile}
          toggleSubmit={this.toggleSubmit}
        />
        {addressList.map(address =><Address 
          key={address.id}
          address={address}
          getAddress={this.callbackAddressList}
          toggleSubmit={this.toggleSubmit}
          size={addressList.length}
          delete={this.deleteAddress}
        />)}
        {
          this.state.toggleAddress &&
          <AddAddress add={this.addAddress} />
        }
        {
          addressList.length < 3 &&
          <Button onClick={this.toggleAddAddress}>{!this.state.toggleAddress ? "Add Address" : "Cancel"}  </Button>
        }
        
        {phoneNumberList.map(phoneNumber =><PhoneNumber 
          key={phoneNumber.id}
          phoneNumber={phoneNumber}
          getNumber={this.callbackPhoneList}
          toggleSubmit={this.toggleSubmit}
          size={phoneNumberList.length}
          delete={this.deletePhoneNumber}
        /> )}
        {
          this.state.togglePhone &&
          <AddPhoneNumber add={this.addPhoneNumber} />
        }
        {
          phoneNumberList.length < 3 &&
          <Button onClick={this.toggleAddPhone}>{!this.state.togglePhone ? "Add Phone Number" : "Cancel"}  </Button>
        }
        
      </Form>
    </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(ShowUserProfile)