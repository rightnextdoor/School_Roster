import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import PhoneNumber from './PhoneNumber';
import Address from './Address';
import Photo from './Photo';
import ProfileInformation from './ProfileInformation';

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
           photo: ''
        }
        this.updateProfile = this.updateProfile.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
           const updateList = list[0];
          this.setState(prevState => ({
              phoneNumber: prevState.phoneNumber.map(eachItem =>
                  eachItem.id === updateList.id ? {...eachItem, 
                      phoneType: updateList.phoneType,
                      phoneNumber: updateList.phoneNumber } 
                  : eachItem
                  )
          }));
          
       }
  
       callbackAddressList = (list) => {
          const updateList = list[0];
         this.setState(prevState => ({
             address: prevState.address.map(eachItem =>
                 eachItem.id === updateList.id ? {...eachItem, 
                  streetAddress: updateList.streetAddress,
                  city: updateList.city,
                  state: updateList.state,
                  zipCode: updateList.zipCode } 
                 : eachItem
                 )
         }));
         
      }
      
      updateProfile(event){
          event.preventDefault();
          if(this.state.isSubmit){
          const user = this.props.user;
          const { id, firstName, lastName, ssn, photo, address, phoneNumber} = this.state;
  
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
  
      handleInputChange = (event) => {
          const { name, value } = event.target;
          this.setState({
            [name]: value
          });
        };
  
     render() {
      const profile = this.props.profile;
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
                />)}
  
            {phoneNumberList.map(phoneNumber =><PhoneNumber 
                key={phoneNumber.id}
                phoneNumber={phoneNumber}
                getNumber={this.callbackPhoneList}
                toggleSubmit={this.toggleSubmit}
                /> )}
            </Form>
        </div>
      )
    }
  }

export default Profile;