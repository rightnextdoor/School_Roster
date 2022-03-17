package com.school.schoolroster.payload;

import com.school.schoolroster.models.Address;
import com.school.schoolroster.models.PhoneNumber;
import com.school.schoolroster.models.User;

public class RequestChangeProfile {
	
	Address address;
	PhoneNumber phoneNumber;
	User user;
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public PhoneNumber getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(PhoneNumber phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	

}
