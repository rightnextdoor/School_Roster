package com.school.schoolroster.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.schoolroster.exception.BadRequestException;
import com.school.schoolroster.repository.RosterRepository;
import com.school.schoolroster.repository.StudentRepository;
import com.school.schoolroster.repository.TeacherRepository;
import com.school.schoolroster.roster.GradeName;
import com.school.schoolroster.roster.Roster;
import com.school.schoolroster.roster.Student;
import com.school.schoolroster.roster.Teacher;

@Service
public class RosterService {

	@Autowired
	RosterRepository rosterRepository;
	@Autowired
	StudentRepository studentRepository;
	@Autowired
	TeacherService teacherService;
	@Autowired
	TeacherRepository teacherRepository;
	@Autowired
	GradeService gradeService;
	
	public Roster initialRoster(Roster roster, GradeName gradeName) {
		GradeName initGradeName = gradeService.initialGradeName(gradeName.getGradeName());
		
		Roster rosters = new Roster(roster.getName(), roster.getSubject(), roster.getGradeLevel(),
				initGradeName );
		rosterRepository.save(rosters);
		return rosters;
	}
	
	public void setGradeName(Roster roster, GradeName gradeName) {
		roster.setGradeName(gradeName);
		rosterRepository.save(roster);
	}
	
	public Roster addTeacherByList(Roster roster, List<Teacher> teacher) {
		
		for(Teacher getTeacher: teacher) {
			getTeacher.addRoster(roster);
			teacherRepository.save(getTeacher);
		}
		return roster;
	}
	
	public Roster addTeacherToRoster(Roster roster, Teacher teacher) {
		teacher.addRoster(roster);
		teacherRepository.save(teacher);
		return roster;
	}
	
	public Roster addStudentByList(Roster roster, List<Student> student) {
		
		for(Student getStudent: student) {
			getStudent.addRoster(roster);
			studentRepository.save(getStudent);
		}
		return roster;
	}
	
	public Roster addStudentToRoster(Roster roster ,Student student) {
		student.addRoster(roster);
		studentRepository.save(student);
		gradeService.initialGrade(roster, student);
		return roster;
	}
	
	public Roster deleteStudent(Roster roster, Student student) {
		student.deleteRoster(roster);
		studentRepository.save(student);
		return roster;
	}
	
	public Roster deleteTeacher(Roster roster, Teacher teacher) {
		if(roster.getTeachers().size() <= 1) {
			deleteRosterById(roster);
			return null;
		}
		teacher.deleteRoster(roster);
		teacherRepository.save(teacher);
		return roster;
	}
	
	public void deleteRosterById(Roster roster) {
		rosterRepository.deleteRoster(roster.getId());
	}
	
	public Roster getRosterById(Long id) {
		return rosterRepository.findById(id).get();
	}
	
	public List<Roster> getAllRosterInSchool() {
		return rosterRepository.findAll();
	}
	
}
