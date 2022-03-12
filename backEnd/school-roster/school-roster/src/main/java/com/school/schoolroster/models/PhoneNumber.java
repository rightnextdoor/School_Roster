package com.school.schoolroster.models;

import javax.persistence.*;


@Entity(name = "phone_number")
public class PhoneNumber {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String phoneType;
	private String phoneNumber;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "profile_id", referencedColumnName = "id")
	private Profile profile;
	
	public PhoneNumber() {
		super();
	}
	
	public  PhoneNumber(PhoneNumber phoneNumber) {
		super();
		this.phoneType = phoneNumber.getPhoneType();
		this.phoneNumber = phoneNumber.getPhoneNumber();
	}
	
	public PhoneNumber(String phoneType, String phoneNumber, Profile profile) {
		super();
		this.phoneType = phoneType;
		this.phoneNumber = phoneNumber;
		this.profile = profile;
	}

	public PhoneNumber(long id, String phoneType, String phoneNumber) {
		super();
		this.id = id;
		this.phoneType = phoneType;
		this.phoneNumber = phoneNumber;
	}

	public PhoneNumber(String phoneType, String phoneNumber) {
		super();
		this.phoneType = phoneType;
		this.phoneNumber = phoneNumber;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getPhoneType() {
		return phoneType;
	}

	public void setPhoneType(String phoneType) {
		this.phoneType = phoneType;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public void setProfile(Profile profile) {
		this.profile = profile;
	}
	
	
}
