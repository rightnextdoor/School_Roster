package com.school.schoolroster.services;

import java.util.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.school.schoolroster.models.Address;
import com.school.schoolroster.models.PhoneNumber;
import com.school.schoolroster.models.Profile;
import com.school.schoolroster.models.User;
import com.school.schoolroster.repository.ProfileRepository;



@Service
public class ProfileService {
	
	@Autowired
	ProfileRepository profileRepository;
	
	public Profile initialProfile(Profile profile, User user) {
		Profile newProfile = new Profile(profile.getFirstName(), profile.getLastName(),
				profile.getSsn(), profile.getPhoto(), user);
		newProfile.addAddress(profile.getAddress(), newProfile);
		newProfile.addPhoneNumber(profile.getPhoneNumber(), newProfile);
		saveProfile(newProfile);
		return newProfile;
	}
	
	public Profile saveProfile(Profile profile) {
		return profileRepository.save(profile);
	}
	
	public Profile getProfile(User user) {
		return profileRepository.findByUserId(user.getId()).get();
		
	}
	
	public Profile addAddress(Address address, User user) {
		 
		Profile profile = getProfile(user);
		profile.addAddress(address);
		profileRepository.save(profile);
		return profile;
		
	}
	
	public Profile addPhoneNumber(PhoneNumber phoneNumber, User user) {
			
			Profile profile = getProfile(user);
			profile.addPhoneNumber(phoneNumber);
			profileRepository.save(profile);
			return profile;
			
		}
	
	public Profile updateProfile (Profile updateProfile, User user) {
		
		Profile profile = getProfile(user);
		profile.setFirstName(updateProfile.getFirstName());
		profile.setLastName(updateProfile.getLastName());
		profile.setSsn(updateProfile.getSsn());
		profile.setPhoto(updateProfile.getPhoto());
		updateAddress(updateProfile);
		updatePhoneNumber(updateProfile);
		
		profileRepository.save(profile);
		
		return profile;
	}
	
	public void updateAddress(Profile updateProfile) {
		
		int size = updateProfile.getAddress().size();
		
		for(int i = 0; i < size; i++) {
			profileRepository.updateCity(updateProfile.getAddress().get(i).getId(), updateProfile.getAddress().get(i).getCity() );
			profileRepository.updateState(updateProfile.getAddress().get(i).getId(), updateProfile.getAddress().get(i).getState());
			profileRepository.updateStreetAddress(updateProfile.getAddress().get(i).getId(), updateProfile.getAddress().get(i).getStreetAddress());
			profileRepository.updateZipCode(updateProfile.getAddress().get(i).getId(), updateProfile.getAddress().get(i).getZipCode());
		}
		
		
	}
	
	public void updatePhoneNumber(Profile updateProfile) {
			
			int size = updateProfile.getPhoneNumber().size();
			
			for(int i = 0; i < size; i++) {
				profileRepository.updatePhoneNumber(updateProfile.getPhoneNumber().get(i).getId(), updateProfile.getPhoneNumber().get(i).getPhoneNumber());
				profileRepository.updatePhoneType(updateProfile.getPhoneNumber().get(i).getId(), updateProfile.getPhoneNumber().get(i).getPhoneType());
			}
		}
	
	public Profile deleteAddress(Profile profile, List<Address> address) {
		
		int size = profile.getAddress().size();
		
		if(size > 1) {
			if(size != address.size()) {
				for(int i = 0; i < address.size(); i++) {
					profileRepository.deleteAddress(address.get(i).getId());
				}
			}
		}
		return profile;
	}
	
	public Profile deleteAddressAll(Profile profile, List<Address> address) {
		
		for(int i = 0; i < address.size(); i++) {
			profileRepository.deleteAddress(address.get(i).getId());
		}
		
		return profile;
	}
	
	public Profile deletePhoneNumber(Profile profile, List<PhoneNumber> phoneNumbers) {
			
			int size = profile.getAddress().size();
			
			if(size > 1) {
				if(size != phoneNumbers.size()) {
					for(int i = 0; i < phoneNumbers.size(); i++) {
						profileRepository.deleteAddress(phoneNumbers.get(i).getId());
					}
				}
			}
			return profile;
	}
	
	public Profile deletePhoneNumberAll(Profile profile, List<PhoneNumber> phoneNumbers) {
		
		for(int i = 0; i < phoneNumbers.size(); i++) {
			profileRepository.deleteAddress(phoneNumbers.get(i).getId());
		}
		
		return profile;
	}
	
	public void deletProfile(Profile profile) {
		
		deleteAddressAll(profile, profile.getAddress());
		deletePhoneNumberAll(profile,profile.getPhoneNumber());
		profileRepository.delete(profile);
	}
	
}
