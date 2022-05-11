package com.school.schoolroster.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.schoolroster.exception.BadRequestException;
import com.school.schoolroster.models.Profile;
import com.school.schoolroster.repository.TeacherRepository;
import com.school.schoolroster.roster.Roster;
import com.school.schoolroster.roster.Teacher;

@Service
public class TeacherService {

	@Autowired
	TeacherRepository teacherRepository;
	
	public Teacher initialTeacher(Profile profile) {
		
//		if(!profile.getRole().equals("TEACHER")) {
//			throw new BadRequestException("Not a Teacher");
//		}
		/*
		if(teacherRepository.findById(profile.getUser().getId()) != null) {
			throw new BadRequestException("Teacher is already set");
		}
		*/
		Teacher teacher = new Teacher(profile);
		teacherRepository.save(teacher);
		return teacher;
	}
	
	public List<Teacher> getTeachersInList(List<Teacher> teachers) {
		List<Teacher> teacherList = new ArrayList<>();
		
		for(Teacher teacher: teachers) {
			Teacher getTeacher = getTeacherById(teacher.getId());
			teacherList.add(getTeacher);
		}
		
		return teacherList;
	}
	
	public Teacher getTeacherById(Long id) {
		return teacherRepository.getById(id);
	}
	
	public List<Teacher> getAllTeacherInSchool(){
		return teacherRepository.findAll();
	}
}
