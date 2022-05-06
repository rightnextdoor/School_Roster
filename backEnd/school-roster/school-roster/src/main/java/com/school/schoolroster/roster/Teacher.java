package com.school.schoolroster.roster;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.school.schoolroster.models.Profile;

@Entity
@Table(name = "teacher", uniqueConstraints = {
		@UniqueConstraint(columnNames = {
				"id",
				"profile_id"
		})
})
public class Teacher {
	
	@Id
	private long id;
	private String firstName;
	private String lastName;
	private String roles;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "profile_id", nullable = false)
	private Profile profile;
	
	@ManyToOne
	@JoinColumn(name = "teacher_leader_id")
	private TeacherLeader teacherLeader;
	
	@ManyToMany
	@JoinTable(
			name = "roster_teacher",
			joinColumns = @JoinColumn(name = "teacher_id"),
			inverseJoinColumns = @JoinColumn(name = "roster_id")
			)
	private List<Roster> rosters = new ArrayList<>();
	
	public Teacher() {
		super();
	}

	public Teacher(Profile profile) {
		super();
		this.id = profile.getUser().getId();
		this.firstName = profile.getFirstName();
		this.lastName = profile.getLastName();
		this.roles = profile.getRole();
		this.profile = profile;
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

	public TeacherLeader getTeacherLeader() {
		return teacherLeader;
	}

	public void setTeacherLeader(TeacherLeader teacherLeader) {
		this.teacherLeader = teacherLeader;
	}
	
/*
	public List<Roster> getRosters() {
		return rosters;
	}
*/
	public void setRosters(List<Roster> rosters) {
		this.rosters = rosters;
	}
	
	public void addRoster(Roster roster) {
		rosters.add(roster);
	}
	public void deleteRoster(Roster roster) {
		rosters.remove(roster);
	}
	
}
