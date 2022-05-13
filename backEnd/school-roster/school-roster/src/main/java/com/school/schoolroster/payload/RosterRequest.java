package com.school.schoolroster.payload;

import java.util.List;


import com.school.schoolroster.roster.Grade;
import com.school.schoolroster.roster.GradeName;
import com.school.schoolroster.roster.Roster;
import com.school.schoolroster.roster.Student;
import com.school.schoolroster.roster.Teacher;
import com.school.schoolroster.roster.TeacherLeader;

public class RosterRequest {
	private Long id;
	private String name;
	private String oldName;
	private String replaceName;
	private int addGrade;
	private int index;
	private Roster roster;
	private Teacher teacher;
	private Student student;
	private TeacherLeader teacherLeader;
	private Grade grade;
	private GradeName gradeName;
	private List<Teacher> teacherList;
	private List<Student> studentList;
	private List<Roster> rosterList;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Roster getRoster() {
		return roster;
	}
	public void setRoster(Roster roster) {
		this.roster = roster;
	}
	public Teacher getTeacher() {
		return teacher;
	}
	public void setTeacher(Teacher teacher) {
		this.teacher = teacher;
	}
	public Student getStudent() {
		return student;
	}
	public void setStudent(Student student) {
		this.student = student;
	}
	public TeacherLeader getTeacherLeader() {
		return teacherLeader;
	}
	public void setTeacherLeader(TeacherLeader teacherLeader) {
		this.teacherLeader = teacherLeader;
	}
	public Grade getGrade() {
		return grade;
	}
	public void setGrade(Grade grade) {
		this.grade = grade;
	}
	public GradeName getGradeName() {
		return gradeName;
	}
	public void setGradeName(GradeName gradeName) {
		this.gradeName = gradeName;
	}
	public List<Teacher> getTeacherList() {
		return teacherList;
	}
	public void setTeacherList(List<Teacher> teacherList) {
		this.teacherList = teacherList;
	}
	public List<Student> getStudentList() {
		return studentList;
	}
	public void setStudentList(List<Student> studentList) {
		this.studentList = studentList;
	}
	public List<Roster> getRosterList() {
		return rosterList;
	}
	public void setRosterList(List<Roster> rosterList) {
		this.rosterList = rosterList;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getOldName() {
		return oldName;
	}
	public void setOldName(String oldName) {
		this.oldName = oldName;
	}
	public String getReplaceName() {
		return replaceName;
	}
	public void setReplaceName(String replaceName) {
		this.replaceName = replaceName;
	}
	public int getAddGrade() {
		return addGrade;
	}
	public void setAddGrade(int addGrade) {
		this.addGrade = addGrade;
	}
	public int getIndex() {
		return index;
	}
	public void setIndex(int index) {
		this.index = index;
	}
	
	
}
