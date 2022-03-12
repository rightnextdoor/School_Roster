package com.school.schoolroster.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.school.schoolroster.exception.NoSuchResourceFoundException;
import com.school.schoolroster.models.Address;
import com.school.schoolroster.models.MyUserDetails;
import com.school.schoolroster.models.PhoneNumber;
import com.school.schoolroster.models.Profile;
import com.school.schoolroster.models.User;
import com.school.schoolroster.payload.CurrentUser;
import com.school.schoolroster.services.MyUserDetailsService;
import com.school.schoolroster.services.ProfileService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProfileController {

	@Autowired
	ProfileService profileService;
	
	@Autowired
	MyUserDetailsService myUserDetailsService;
	
	@PostMapping("/profile")
	@ResponseStatus(HttpStatus.CREATED)
	public Profile createProfile(@CurrentUser MyUserDetails myUserDetails,
			@Valid @RequestBody Profile profile ) {
		
		User user = myUserDetailsService.getUser(myUserDetails.getUsername());
		profile.setUser(user);
		
		return profileService.initialProfile(profile, user);
		
	}
	
	@GetMapping("/profile")
	@ResponseStatus(HttpStatus.OK)
	public Profile getUserProfile(@CurrentUser MyUserDetails myUserDetails) throws NoSuchResourceFoundException {
		User user = myUserDetailsService.getUser(myUserDetails.getUsername());
		return profileService.getProfile(user);
	}
	
	@PostMapping("/profile/address")
	@ResponseStatus(HttpStatus.CREATED)
	public Profile addAddress(@CurrentUser MyUserDetails myUserDetails,
			@Valid @RequestBody Address address )throws NoSuchResourceFoundException {
		
		User user = myUserDetailsService.getUser(myUserDetails.getUsername());
		return profileService.addAddress(address, user);
	}
	
	@PostMapping("/profile/phoneNumber")
	@ResponseStatus(HttpStatus.CREATED)
	public Profile addAddress(@CurrentUser MyUserDetails myUserDetails,
			@Valid @RequestBody PhoneNumber phoneNumber )throws NoSuchResourceFoundException {
		
		User user = myUserDetailsService.getUser(myUserDetails.getUsername());
		return profileService.addPhoneNumber(phoneNumber, user);
	}
	
	@PostMapping("/profile/update")
	@ResponseStatus(HttpStatus.CREATED)
	public Profile updateProfile(@CurrentUser MyUserDetails myUserDetails,
			@Valid @RequestBody Profile updateProfile )throws NoSuchResourceFoundException {
		
		User user = myUserDetailsService.getUser(myUserDetails.getUsername());
		updateProfile.setUser(user);
		
		return profileService.updateProfile(updateProfile, user);
		
	}
	
	@PostMapping("/profile/delete/address")
	@ResponseStatus(HttpStatus.CREATED)
	public Profile deleteAddress(@CurrentUser MyUserDetails myUserDetails,
			@Valid @RequestBody List<Address> address )throws NoSuchResourceFoundException {
		
		User user = myUserDetailsService.getUser(myUserDetails.getUsername());
		Profile profile = profileService.getProfile(user);
		return profileService.deleteAddress(profile, address);
		
		
	}
	
	@PostMapping("/profile/delete/phoneNumber")
	@ResponseStatus(HttpStatus.CREATED)
	public Profile deletePhoneNumber(@CurrentUser MyUserDetails myUserDetails,
			@Valid @RequestBody List<PhoneNumber> phoneNumbers )throws NoSuchResourceFoundException {
		
		User user = myUserDetailsService.getUser(myUserDetails.getUsername());
		Profile profile = profileService.getProfile(user);
		return profileService.deletePhoneNumber(profile, phoneNumbers);
		
		
	}
	
	@PostMapping("/profile/delete")
	@ResponseStatus(HttpStatus.CREATED)
	public Profile deleteProfile(@CurrentUser MyUserDetails myUserDetails)throws NoSuchResourceFoundException {
		
		User user = myUserDetailsService.getUser(myUserDetails.getUsername());
		Profile profile = profileService.getProfile(user);
		profileService.deletProfile(profile);
		return profile;
		
		
	}
	
}
