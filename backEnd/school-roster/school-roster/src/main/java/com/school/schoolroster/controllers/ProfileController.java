package com.school.schoolroster.controllers;

import java.util.List;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.school.schoolroster.exception.NoSuchResourceFoundException;
import com.school.schoolroster.models.Address;
import com.school.schoolroster.models.MyUserDetails;
import com.school.schoolroster.models.PhoneNumber;
import com.school.schoolroster.models.Profile;
import com.school.schoolroster.models.User;
import com.school.schoolroster.payload.CurrentUser;
import com.school.schoolroster.payload.RequestChangeProfile;
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
	public Profile createProfile(@Valid @RequestBody Profile profile ) {
		
		return profileService.initialProfile(profile);
		
	}
	
	@PostMapping("/profile/users")
	@ResponseStatus(HttpStatus.CREATED)
	public Profile getProfile(@Valid @RequestBody User user) {
		return profileService.getProfile(user);
	}
	
	@PostMapping("/profile/roles")
	@ResponseStatus(HttpStatus.CREATED)
	public List<Profile> getProfileByRole(@RequestParam("role") String role){
		return profileService.getAllProfileByRole(role);
	}
	
	@GetMapping("/profile")
	@ResponseStatus(HttpStatus.OK)
	public Profile getUserProfile(@CurrentUser MyUserDetails myUserDetails) throws NoSuchResourceFoundException {
		User user = myUserDetailsService.getUser(myUserDetails.getUsername());
		return profileService.getProfile(user);
	}
	
	@PostMapping("/profile/address")
	@ResponseStatus(HttpStatus.CREATED)
	public Profile addAddress(@Valid @RequestBody RequestChangeProfile change)throws NoSuchResourceFoundException {
		return profileService.addAddress(change.getAddress(), change.getUser());
	}
	
	@PostMapping("/profile/phoneNumber")
	@ResponseStatus(HttpStatus.CREATED)
	public Profile addPhoneNumber(@Valid @RequestBody RequestChangeProfile change )throws NoSuchResourceFoundException {
		return profileService.addPhoneNumber(change.getPhoneNumber(), change.getUser());
	}
	
	@PostMapping("/profile/update")
	@ResponseStatus(HttpStatus.CREATED)
	public Profile updateProfile(@Valid @RequestBody Profile updateProfile )throws NoSuchResourceFoundException {
		return profileService.updateProfile(updateProfile, updateProfile.getUser());
		
	}
	
	@PostMapping("/profile/delete/address")
	@ResponseStatus(HttpStatus.CREATED)
	public Profile deleteAddress(@Valid @RequestBody RequestChangeProfile change)throws NoSuchResourceFoundException {
		
		profileService.deleteAddress(change.getAddress());
		Profile profile = profileService.getProfile(change.getUser());
		return profile;
		
	}
	
	@PostMapping("/profile/delete/phoneNumber")
	@ResponseStatus(HttpStatus.CREATED)
	public Profile deletePhoneNumber(@Valid @RequestBody RequestChangeProfile change)throws NoSuchResourceFoundException {
		
		profileService.deletePhoneNumber(change.getPhoneNumber());
		Profile profile = profileService.getProfile(change.getUser());
		 return profile;
		
		
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
