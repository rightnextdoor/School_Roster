package com.school.schoolroster.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name = "User")
@Table(name = "User")
public class User {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String username;
	private String password;
	private String email;
	private boolean active;
	private String role;
	
	public User() {
		super();
	}
	
	public User(Long userId) {
		this.id = userId;
	}

	public User(long id, String username, String password, String email, boolean active, String roles) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.active = active;
		this.role = role;
	}

	public User(String username, String password, String email, boolean active, String role) {
		super();
		this.username = username;
		this.password = password;
		this.email = email;
		this.active = active;
		this.role = role;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
	
}
