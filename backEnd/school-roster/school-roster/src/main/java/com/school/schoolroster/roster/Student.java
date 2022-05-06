package com.school.schoolroster.roster;

import java.util.ArrayList;
import java.util.List;


import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import javax.persistence.Table;
import javax.persistence.UniqueConstraint;



import com.school.schoolroster.models.Profile;

@Entity
@Table(name = "student", uniqueConstraints = {
		@UniqueConstraint(columnNames = {
				"id",
				"profile_id"
		})
})
public class Student {

	@Id
	private long id;
	private String firstName;
	private String lastName;
	private int gpa = 0;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "profile_id", nullable = false)
	private Profile profile;
	
	
		
	@ManyToMany
	@JoinTable(
			name = "roster_student",
			joinColumns = @JoinColumn(name = "student_id"),
			inverseJoinColumns = @JoinColumn(name = "roster_id")
			)
	private List <Roster> rosters = new ArrayList<>();
	
	public Student() {
		super();
	}

	public Student(Profile profile) {
		super();
		this.id = profile.getUser().getId();
		this.firstName = profile.getFirstName();
		this.lastName = profile.getLastName();
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

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	public List<Roster> getRosters() {
		return rosters;
	}

	public void setRosters(List<Roster> rosters) {
		this.rosters = rosters;
	}
	
	public void addRoster(Roster roster) {
		rosters.add(roster);
	}
	
	public void deleteRoster(Roster roster) {
		rosters.remove(roster);
	}
	
	public int getClassAverage(Roster roster) {
		return roster.getStudentClassAverage(this);
	}
	public int getClassAverageByGradeName(Roster roster, String gradeName) {
		return roster.getStudentGradeAverageByGradeName(this, gradeName);
	}
	
	public Grade getGradeByGradeName(Roster roster, String gradeName) {
		return roster.findStudentGrade(this, gradeName);
	}
	
	public List<Grade> getAllgradeInRoster(Roster roster) {
		return roster.findAllStudentGrade(this);
	}
	
	public int getGPA() {
		
		int total = 0;
		for(Roster roster: rosters) {
			total += getClassAverage(roster);
		}
		gpa = total / rosters.size();
		if(rosters.size() == 0 && total == 0) {
			gpa = 0;
		}
		return gpa;
	}

	public void setGpa(int gpa) {
		this.gpa = gpa;
	}
		
}
