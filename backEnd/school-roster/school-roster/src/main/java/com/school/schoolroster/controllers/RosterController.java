package com.school.schoolroster.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.school.schoolroster.payload.RosterRequest;
import com.school.schoolroster.roster.Roster;
import com.school.schoolroster.roster.Student;
import com.school.schoolroster.roster.Teacher;
import com.school.schoolroster.services.RosterService;
import com.school.schoolroster.services.StudentService;
import com.school.schoolroster.services.TeacherService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RosterController {
	@Autowired
	RosterService rosterService;
	@Autowired
	TeacherService teacherService;
	@Autowired
	StudentService studentService;
	
	@PostMapping("/roster")
	@ResponseStatus(HttpStatus.CREATED)
	public Roster createRoster(@RequestBody RosterRequest rosterRequest) {
		List<Teacher> teacherList = teacherService.getTeachersInList(rosterRequest.getTeacherList());
		Roster roster = rosterService.initialRoster(rosterRequest.getRoster(), rosterRequest.getGradeName());
		rosterService.addTeacherByList(roster, teacherList);
		return roster;
	}
	
	@GetMapping("/roster")
	@ResponseStatus(HttpStatus.OK)
	public List<Roster> getAllRosters(){
		return rosterService.getAllRosterInSchool();
	}
	
	@GetMapping("/roster/id")
	@ResponseStatus(HttpStatus.OK)
	public Roster getRosterById(@RequestBody Roster roster){
		return rosterService.getRosterById(roster.getId());
	}
	
	@PostMapping("/roster/delete")
	@ResponseStatus(HttpStatus.OK)
	public List<Roster> deleteRosterById(@RequestBody Roster roster){
		 rosterService.deleteRosterById(roster);
		 return rosterService.getAllRosterInSchool();
	}
	
	@PostMapping("/roster/teacher")
	@ResponseStatus(HttpStatus.CREATED)
	public Roster addTeacher(@RequestBody RosterRequest rosterRequest) {
		Teacher teacher = teacherService.getTeacherById(rosterRequest.getTeacher().getId());
		Roster roster = rosterService.getRosterById(rosterRequest.getRoster().getId());
		return rosterService.addTeacherToRoster(roster, teacher);
		
	}
	
	@PostMapping("/roster/teacher/list")
	@ResponseStatus(HttpStatus.CREATED)
	public Roster addTeacherByList(@RequestBody RosterRequest rosterRequest) {
		List<Teacher> teacherList = teacherService.getTeachersInList(rosterRequest.getTeacherList());
		Roster roster = rosterService.getRosterById(rosterRequest.getRoster().getId());
		return rosterService.addTeacherByList(roster, teacherList);
	}
	
	@PostMapping("/roster/student")
	@ResponseStatus(HttpStatus.OK)
	public Roster addStudent(@RequestBody RosterRequest rosterRequest) {
		Student student = studentService.getStudentById(rosterRequest.getStudent().getId());
		Roster roster = rosterService.getRosterById(rosterRequest.getRoster().getId());
		return rosterService.addStudentToRoster(roster, student);
	}
	
	@PostMapping("/roster/student/list")
	@ResponseStatus(HttpStatus.OK)
	public Roster addStudentByList(@RequestBody RosterRequest rosterRequest) {
		List<Student> student = studentService.getStudentsInList(rosterRequest.getStudentList());
		Roster roster = rosterService.getRosterById(rosterRequest.getRoster().getId());
		return rosterService.addStudentByList(roster, student);
	}
	
	@PostMapping("/roster/teacher/delete")
	@ResponseStatus(HttpStatus.OK)
	public Roster deleteTeacherInRoster(@RequestBody RosterRequest rosterRequest) {
		Teacher teacher = teacherService.getTeacherById(rosterRequest.getTeacher().getId());
		Roster roster = rosterService.getRosterById(rosterRequest.getRoster().getId());
		return rosterService.deleteTeacher(roster, teacher);
	}
	
	@PostMapping("/roster/student/delete")
	@ResponseStatus(HttpStatus.OK)
	public Roster deleteStudentInRoster(@RequestBody RosterRequest rosterRequest) {
		Student student = studentService.getStudentById(rosterRequest.getStudent().getId());
		Roster roster = rosterService.getRosterById(rosterRequest.getRoster().getId());
		return rosterService.deleteStudent(roster, student);
	}
}
