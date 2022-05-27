package com.school.schoolroster.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.schoolroster.exception.BadRequestException;
import com.school.schoolroster.models.Profile;
import com.school.schoolroster.models.User;
import com.school.schoolroster.repository.StudentRepository;
import com.school.schoolroster.roster.Student;

@Service
public class StudentService {

	@Autowired
	StudentRepository studentRepository;
	
	public Student initialStudent (Profile profile) {
		if(!profile.getRole().equals("STUDENT")) {
			throw new BadRequestException("Not a Student");
		}
		/*
		if(studentRepository.findById(profile.getUser().getId()) != null) {
			throw new BadRequestException("Student is already set");
		}
		*/
		Student student = new Student(profile);
		studentRepository.save(student);
		return student;
	}
	
	public List<Student> getStudentsInList(List<Student> students) {
		List<Student> studentList = new ArrayList<>();
		
		for(Student student: students) {
			Student getStudent = getStudentById(student.getId());
			studentList.add(getStudent);
		}
		
		return studentList;
	}
	
	public Student getStudentById(Long id) {
		return studentRepository.getById(id);
	}
	
	public List<Student> getAllStudentsInSchool(){
		return studentRepository.findAll();
	}
	
	public void updatedInfo(User user, Profile profile) {
		Student student = getStudentById(user.getId());
		student.setFirstName(profile.getFirstName());
		student.setLastName(profile.getLastName());
		studentRepository.save(student);
	}
}
