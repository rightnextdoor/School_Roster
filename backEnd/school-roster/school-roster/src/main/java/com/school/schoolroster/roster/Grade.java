package com.school.schoolroster.roster;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity(name = "grade")
@Table(name = "grade")
public class Grade {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String gradeName;
		
	@ElementCollection(targetClass = Integer.class)
	private List<Integer> grades = new ArrayList<>();
	private int average = 0;
	
	@ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "roster_id")
	private Roster roster;
	
	@ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id")
	private Student student;
	
	public Grade() {
		super();
	}
	
	public Grade(String gradeName, Roster roster, Student student) {
		super();
		this.gradeName = gradeName;
		this.roster = roster;
		this.student = student;
	}

	public void addGrade(Integer grade) {
		grades.add(grade);
	}
	
	public void deleteGrade(int index) {
		grades.remove(index);
	}
	
	public void updateGrade(int index, Integer grade) {
		grades.set(index, grade);
	}
	
	private int gradeAvg() {
		
		int total = 0;
		for(int i = 0; i < grades.size(); i++) {
			total += grades.get(i);
		}
		if(grades.size() == 0 && total == 0) {
			return average = 0;
		}
		average = total / grades.size();
		
		return average;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	public String getGradeName() {
		return gradeName;
	}

	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
	}

	public List<Integer> getGrades() {
		return grades;
	}

	public void setGrades(List<Integer> grades) {
		this.grades = grades;
	}

	public int getAverage() {
		return gradeAvg();
	}
	public void setAverage(Integer average) {
		this.average = average;
	}
	public void setRoster(Roster roster) {
		this.roster = roster;
	}
	
	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public void setAverage(int average) {
		this.average = average;
	}
	
}
