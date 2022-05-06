package com.school.schoolroster.roster;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.school.schoolroster.models.Profile;

@Entity
@Table(name = "teacherLeader", uniqueConstraints = {
		@UniqueConstraint(columnNames = {
				"id",
				"profile_id"
		})
})
public class TeacherLeader {
	@Id
	private Long id;
	private String firstName;
	private String lastName;
	private String roles;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "profile_id", nullable = false)
	private Profile profile;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "teacherLeader")
	private List<Teacher> teachers = new ArrayList<>();

	public TeacherLeader() {
		super();
	}

	public TeacherLeader(Profile profile) {
		super();
		this.id = profile.getUser().getId();
		this.firstName = profile.getFirstName();
		this.lastName = profile.getLastName();
		this.roles = profile.getRole();
		this.profile = profile;
	}
	
	public void addTeacher(Teacher teacher) {
		teachers.add(teacher);
	}
	
	public void deleteTeacher(Teacher teacher) {
		teachers.remove(teacher);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	public List<Teacher> getTeachers() {
		return teachers;
	}

	public void setTeachers(List<Teacher> teachers) {
		this.teachers = teachers;
	}
	
}
