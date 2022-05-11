package com.school.schoolroster.roster;

import java.util.ArrayList;

import java.util.List;


import javax.persistence.CascadeType;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;


@Entity(name = "roster")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Table(name = "roster")
public class Roster {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;
	private String subject;
	private String gradeLevel;
	private int classAverage = 0;
	
	@ManyToMany(mappedBy = "rosters")
	//@JsonBackReference
	private List<Teacher> teachers = new ArrayList<>();
	
	@ManyToMany(mappedBy = "rosters")
	//@JsonBackReference
	private List<Student> students = new ArrayList<>();
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	//@JsonManagedReference
	@JoinTable(
			name = "grade_roster",
			joinColumns = @JoinColumn(name = "roster_id"),
			inverseJoinColumns = @JoinColumn(name = "grade_id")
			)
	private List<Grade> gradeList = new ArrayList<>();
	
	@OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "gradeName_id")
	private GradeName gradeName;
	
	public Roster() {
		super();
	}
		
	public Roster(String name, String subject, String gradeLevel) {
		super();
		this.name = name;
		this.subject = subject;
		this.gradeLevel = gradeLevel;
		
	}

	public Roster(String name, String subject, String gradeLevel, GradeName gradeName) {
		super();
		this.name = name;
		this.subject = subject;
		this.gradeLevel = gradeLevel;
		this.gradeName = gradeName;
	}
	
	public Roster(String name, String subject, String gradeLevel, List<Teacher> teachers) {
		super();
		this.name = name;
		this.subject = subject;
		this.gradeLevel = gradeLevel;
		this.teachers = teachers;
		
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	
	public List<Teacher> getTeachers() {
		return teachers;
	}
	
	public void setTeachers(List<Teacher> teachers) {
		this.teachers = teachers;
	}
	
	public List<Student> getStudents() {
		return students;
	} 
	
	public void setStudents(List<Student> students) {
		this.students = students;
	}

	public void setClassAverage(int classAverage) {
		this.classAverage = classAverage;
	}

	public GradeName getGradeName() {
		return gradeName;
	}

	public void setGradeName(GradeName gradeName) {
		this.gradeName = gradeName;
	}
	
	public void setClassAverage(Integer classAverage) {
		this.classAverage = classAverage;
	}
	
	public String getGradeLevel() {
		return gradeLevel;
	}

	public void setGradeLevel(String gradeLevel) {
		this.gradeLevel = gradeLevel;
	}
	
	public List<Grade> getGradeList() {
		return gradeList;
	}

	public void setGradeList(List<Grade> gradeList) {
		this.gradeList = gradeList;
	}
	
	public void addGrade(Grade grade) {
		gradeList.add(grade);
	}
	
	public void deleteGrade(Grade grade) {
		gradeList.remove(grade);
	}
	
	public Grade findStudentGrade(Student student, String _gradeName) {
		for(Grade grade: gradeList) {
			if(grade.getGradeName().equals(_gradeName) &&
					grade.getStudent().getId() == student.getId()) {
				return grade;
			}
		}
		return null;
	}
	
	public List<Grade> findAllStudentGrade(Student student) {
		List<Grade> gradeList = new ArrayList<>();
		for(String name: gradeName.getGradeName()) {
			gradeList.add(findStudentGrade(student, name));
		}
		return gradeList;
	}
	
	public int getStudentGradeAverageByGradeName(Student student, String gradeName) {
		Grade grade = findStudentGrade(student, gradeName);
		return grade.getAverage();
	}
	
	public List<Grade> getAllStudentByGradeName(String gradeName) {
		List<Grade> gradeList = new ArrayList<>();
		for(Student student: students) {
			gradeList.add(findStudentGrade(student, gradeName));
		}
		return gradeList;
	}
	
	public int getStudentClassAverage(Student student) {
		int total = 0;
		
		for(String name: gradeName.getGradeName()) {
			total += getStudentGradeAverageByGradeName(student, name);
		}
		int avg = 0;
		avg = total / gradeName.getGradeName().size();
		return avg;
		
	}
	
	public int getClassAverage() {
		
		int total = 0;
		for(Student student: students) {
			total = student.getClassAverage(this);
		}
		
		if(students.size() == 0 && total == 0) {
			return classAverage = 0;		
		}
		classAverage = total / students.size();
		
		return classAverage;
	}
}
