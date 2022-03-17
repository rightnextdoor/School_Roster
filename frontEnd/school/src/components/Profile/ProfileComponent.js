import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import PhoneNumber from './PhoneNumber';
import Address from './Address';
import Photo from './Photo/Photo';
import ProfileInformation from './ProfileInformation';
import AddAddress from './AddAddress';
import AddPhoneNumber from './AddPhoneNumber';

class Profile extends Component {

  constructor(props) {
    super(props)
    const profile = this.props.profile;
        
    this.state = {      
      isSubmit: true,
      id: profile.id,
      firstName: profile.firstName, 
      lastName: profile.lastName,
      ssn: profile.ssn,
      address: profile.address,
      phoneNumber: profile.phoneNumber,
      photo: '',
      toggleAddress: false,
      togglePhone: false
    }
    this.updateProfile = this.updateProfile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  toggleAddAddress = () => {
    this.setState({toggleAddress: !this.state.toggleAddress})
  }

  toggleAddPhone = () => {
    this.setState({togglePhone: !this.state.togglePhone})
  }
  
  toggleSubmit = () => {
    this.setState({ isSubmit: !this.state.isSubmit });
  }
  
  callbackProfile = (profile) => {
    const updateProfile = profile[0];
    this.setState({
      id: updateProfile.id,
      firstName: updateProfile.firstName, 
      lastName: updateProfile.lastName,
      ssn: updateProfile.ssn
      })
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
      
  updateProfile(event){
    event.preventDefault();
    if(this.state.isSubmit){
      const user = this.props.profile.user;
      const { id, firstName, lastName, ssn, address, phoneNumber} = this.state;
      
      //const fd = new FormData();
      //console.log('photo ', photo)
      //fd.append('image', photo)
          
      const profile = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        ssn: ssn,
        user, 
        address: address, 
        phoneNumber
      };
          
      console.log('update', profile);
      this.props.postProfile(profile);
    }
  }

  addAddress = (address) => {
    const user = this.props.profile.user;
    const send = {
      user: user,
      address: address
    }
    this.props.addAddress(send)
  }

  addPhoneNumber = (phone) => {
    const user = this.props.profile.user;
    const send = {
      user: user,
      phoneNumber: phone
    }
    this.props.addPhoneNumber(send)
  }

  deleteAddress = (address) => {
    const user = this.props.profile.user;
    const send = {
      user: user,
      address: address
    }
    this.props.deleteAddress(send)
  }
  
  deletePhoneNumber = (phone) => {
    const user = this.props.profile.user;
    const send = {
      user: user,
      phoneNumber: phone
    }
    this.props.deletePhoneNumber(send)
  }
  
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  
  render() {
    const profile = this.props.profile;
    const photo = this.props.photo;
    //console.log('photo ', photo[0].url);
    
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
          {/* <Row>
            <Photo profile={profile} />
          </Row> */}
          
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

export default Profile;