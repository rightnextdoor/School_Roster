package com.school.schoolroster.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.schoolroster.exception.BadRequestException;
import com.school.schoolroster.models.Profile;
import com.school.schoolroster.models.User;
import com.school.schoolroster.repository.TeacherLeadRepository;
import com.school.schoolroster.roster.Teacher;
import com.school.schoolroster.roster.TeacherLeader;

@Service
public class TeacherLeadService {
	@Autowired
	TeacherLeadRepository teacherLeadRepository;
	
	public TeacherLeader initialTeacherLeader(Profile profile) {
		/*
		if(!profile.getRole().split(",").equals("TEACHER")) {
			throw new BadRequestException("Not a Teacher");
		}
		
		if(teacherLeadRepository.findById(profile.getUser().getId()) != null) {
			throw new BadRequestException("Teacher Leader is already set");
		}
		*/
		TeacherLeader teacherLeader = new TeacherLeader(profile);
		teacherLeadRepository.save(teacherLeader);
		return teacherLeader;
	}
	
	public TeacherLeader addTeacherToList(TeacherLeader leader, Teacher teacher) {
		TeacherLeader teacherLeader = getTeacherLeaderById(leader.getId());
		teacherLeader.addTeacher(teacher);
		teacherLeadRepository.save(teacherLeader);
		return teacherLeader;
	}
	
	public TeacherLeader deleteTeacherToList(TeacherLeader leader, Teacher teacher) {
		TeacherLeader teacherLeader = getTeacherLeaderById(leader.getId());
		teacherLeader.deleteTeacher(teacher);
		teacherLeadRepository.save(teacherLeader);
		return teacherLeader;
	}
	
	public TeacherLeader getTeacherLeaderById(Long id) {
		return teacherLeadRepository.getById(id);
	}
	
	public List<TeacherLeader> getAllTeacherLeaders() {
		return teacherLeadRepository.findAll();
	}
	
	public void updatedInfo(User user, Profile profile) {
		TeacherLeader teacherLeader = getTeacherLeaderById(user.getId());
		teacherLeader.setFirstName(profile.getFirstName());
		teacherLeader.setLastName(profile.getLastName());
		teacherLeadRepository.save(teacherLeader);
	}
}
