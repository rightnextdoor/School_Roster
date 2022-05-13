package com.school.schoolroster.payload;


import com.school.schoolroster.roster.Student;
import com.school.schoolroster.roster.Teacher;
import com.school.schoolroster.roster.TeacherLeader;

public class GetRole {

	Teacher teacher;
	Student student;
	TeacherLeader teacherLeader;
	
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
	
	
	
}
