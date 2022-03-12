package com.school.schoolroster.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.school.schoolroster.models.MyUserDetails;
import com.school.schoolroster.models.User;
import com.school.schoolroster.repository.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {
	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<User> user = userRepository.findByUsernameOrEmail(username,username);
		
		user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));
		
		return user.map(MyUserDetails::new).get();
	}
	
	public Boolean existsByUsername(String username) {
		return userRepository.findByUsername(username).isPresent();
	}
	
	public Boolean existsByEmail(String email) {
		return userRepository.findByEmail(email).isPresent();
	}
	
	public User saveNewUser(User user) {
		return userRepository.save(user);
	}
	
	public User getUser(String username) {
		Optional<User> user = userRepository.findByUsername(username);
		
		return user.get();
	}
}
