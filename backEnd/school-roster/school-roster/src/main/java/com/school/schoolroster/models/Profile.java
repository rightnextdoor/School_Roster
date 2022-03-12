package com.school.schoolroster.models;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "Profile", uniqueConstraints = {
		@UniqueConstraint(columnNames = {
				"id",
				"user_id"
		})
})
public class Profile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String firstName;
	private String lastName;
	private String ssn;
	private String photo;
	private String username;
	private String email;
	private String role;
	
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "profile")
	private List<Address> address = new ArrayList<>();
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "profile")
	private List<PhoneNumber> phoneNumber = new ArrayList<>();
	
	public Profile() {
		super();
	}
	
	public Profile(User user) {
		super();
		this.user = user;
	}
	
	public Profile(long id, String firstName, String lastName, String ssn, String photo,
			User user, List<Address> address, List<PhoneNumber>phoneNumber ) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.ssn = ssn;
		this.photo = photo;
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.role = user.getRole();
		this.user = user;
		this.address = address;
		this.phoneNumber = phoneNumber;
		
	}

	public Profile(String firstName, String lastName, String ssn, String photo,
			User user, List<Address> address, List<PhoneNumber> phoneNumber ) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.ssn = ssn;
		this.photo = photo;
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.role = user.getRole();
		this.user = user;
		this.address = address;
		this.phoneNumber = phoneNumber;
		
	}
	
	
	  public Profile(String firstName, String lastName, String ssn, String photo,
			  User user, Address address, PhoneNumber phoneNumber ) { 
		  super();
		  this.firstName = firstName; 
		  this.lastName = lastName; 
		  this.ssn = ssn;
		  this.photo = photo; 
		  this.username = user.getUsername(); 
		  this.email = user.getEmail(); 
		  this.role = user.getRole();
		  this.user = user; 
		  this.address.add(address);
		  this.phoneNumber.add(phoneNumber);
	  
	  }
	
	  public Profile(String firstName, String lastName, String ssn, String photo,
			User user) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.ssn = ssn;
		this.photo = photo;
		this.username = user.getUsername(); 
		this.email = user.getEmail(); 
		this.role = user.getRole();
		this.user = user;
	}

	public String getRole() {
		return role;
	}

	public User getUser() {
		return user;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSsn() {
		return ssn;
	}

	public void setSsn(String ssn) {
		this.ssn = ssn;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getUsername() {
		return username;
	}
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	public void setUserById(Long id) {
		this.user = new User(id);
	}
	
	public List<Address> getAddress() { 
		return address; 
		}
	  
	public void setAddress(List<Address> address) { 
		this.address = address; 
		}
	  
	public List<PhoneNumber> getPhoneNumber() { 
		return phoneNumber; 
		}
	  
	public void setPhoneNumber(List<PhoneNumber> phoneNumber) { 
		this.phoneNumber = phoneNumber; 
		}
	 
	public void addAddress(List<Address> addressIn, Profile profile) {
		
		for(int i = 0; i < addressIn.size(); i++) {
			Address newAddress = new Address(addressIn.get(i).getStreetAddress(),
					addressIn.get(i).getCity(), addressIn.get(i).getState(),
					addressIn.get(i).getZipCode(), profile);
			profile.getAddress().add(newAddress);
		
		}
	
	}
	
	public void addPhoneNumber(List<PhoneNumber> phoneNumbersIN, Profile profile) {
		for(int i = 0; i < phoneNumbersIN.size(); i++) {
			PhoneNumber newPhoneNumber = new PhoneNumber(phoneNumbersIN.get(i).getPhoneType(),
					phoneNumbersIN.get(i).getPhoneNumber(), profile);
			profile.getPhoneNumber().add(newPhoneNumber);
		}
	}
	
	public void addAddress(Address getAddress) {
		getAddress.setProfile(this);
		address.add(getAddress);
	}
	
	public void addPhoneNumber(PhoneNumber getPhoneNumber) {
		getPhoneNumber.setProfile(this);
		phoneNumber.add(getPhoneNumber);
	}
	
}
