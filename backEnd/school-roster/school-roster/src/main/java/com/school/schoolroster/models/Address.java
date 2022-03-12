package com.school.schoolroster.models;

import java.util.List;

import javax.persistence.*;

@Entity(name = "address")
public class Address {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String streetAddress;
	private String city;
	private String state;
	private String zipCode;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "profile_id", referencedColumnName = "id")
	private Profile profile;
	
	public Address() {
		super();
	}
	
	public Address(Address address) {
		super();
		this.streetAddress = address.getStreetAddress();
		this.city = address.getCity();
		this.state = address.getState();
		this.zipCode = address.getZipCode();
		
	}
	
	public Address(String streetAddress, String city, String state, String zipCode, Profile profile) {
		super();
		this.streetAddress = streetAddress;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.profile = profile;
	}

	public Address(long id, String streetAddress, String city, String state, String zipCode) {
		super();
		this.id = id;
		this.streetAddress = streetAddress;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
	}

	public Address(String streetAddress, String city, String state, String zipCode) {
		super();
		this.streetAddress = streetAddress;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getStreetAddress() {
		return streetAddress;
	}

	public void setStreetAddress(String streetAddress) {
		this.streetAddress = streetAddress;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	
	
}
