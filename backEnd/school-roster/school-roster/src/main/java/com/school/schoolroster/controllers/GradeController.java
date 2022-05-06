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
import com.school.schoolroster.roster.Grade;
import com.school.schoolroster.roster.GradeName;
import com.school.schoolroster.roster.Roster;
import com.school.schoolroster.roster.Student;
import com.school.schoolroster.services.GradeService;
import com.school.schoolroster.services.RosterService;
import com.school.schoolroster.services.StudentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class GradeController {

	@Autowired
	GradeService gradeService;
	@Autowired
	RosterService rosterService;
	@Autowired
	StudentService studentService;
			
	@GetMapping("/grade/gradeName")
	@ResponseStatus(HttpStatus.OK)
	public GradeName getGradeName(@RequestBody GradeName gradeName) {
		return gradeService.getGradeNameById(gradeName);
	}
	
	@PostMapping("/grade/gradeName/add")
	@ResponseStatus(HttpStatus.OK)
	public GradeName addGradeName(@RequestBody RosterRequest rosterRequest) {
		Roster roster = rosterService.getRosterById(rosterRequest.getRoster().getId());
		return gradeService.addGradeName(rosterRequest.getName(), rosterRequest.getGradeName(), roster);
	}
	
	@PostMapping("/grade/gradeName/delete")
	@ResponseStatus(HttpStatus.OK)
	public GradeName deleteGradeName(@RequestBody RosterRequest rosterRequest) {
		Roster roster = rosterService.getRosterById(rosterRequest.getRoster().getId());
		Grade grade = gradeService.deleteGradeName(rosterRequest.getName(), rosterRequest.getGradeName(), roster);
		gradeService.deleteGradeById(grade);
		return gradeService.getGradeNameById(rosterRequest.getGradeName());
	}
	
	@PostMapping("/grade/gradeName/delete/delete")
	@ResponseStatus(HttpStatus.OK)
	public String delete(@RequestBody Grade grade) {
		gradeService.deleteGradeById(grade);
		return "delete";
	}
	
	@PostMapping("/grade/gradeName/update")
	@ResponseStatus(HttpStatus.OK)
	public GradeName updateGradeName(@RequestBody RosterRequest rosterRequest) {
		Roster roster = rosterService.getRosterById(rosterRequest.getRoster().getId());
		return gradeService.updateGradeName(rosterRequest.getGradeName(), rosterRequest.getOldName(), rosterRequest.getReplaceName(), roster);
	}
	
	@GetMapping("/grade")
	@ResponseStatus(HttpStatus.OK)
	public Grade getGrade(@RequestBody Grade grade) {
		return gradeService.getGradeById(grade);
	}
	
	@GetMapping("/grade/list")
	@ResponseStatus(HttpStatus.OK)
	public List<Grade> getAllStudentByGradeName(@RequestBody RosterRequest rosterRequest){
		Roster roster = rosterService.getRosterById(rosterRequest.getRoster().getId());
		return gradeService.getAllStudentGradeByGradeName(roster, rosterRequest.getName());
	}
	
	@PostMapping("/grade/add")
	@ResponseStatus(HttpStatus.OK)
	public Grade addGrade(@RequestBody RosterRequest rosterRequest) {
		return gradeService.addGrade(rosterRequest.getGrade(), rosterRequest.getAddGrade());
	}
	
	@PostMapping("/grade/delete")
	@ResponseStatus(HttpStatus.OK)
	public Grade deleteGrade(@RequestBody RosterRequest rosterRequest) {
		return gradeService.deleteGradeNumber(rosterRequest.getGrade(), rosterRequest.getIndex());
	}
	
	@PostMapping("/grade/update")
	@ResponseStatus(HttpStatus.OK)
	public Grade updateGrade(@RequestBody RosterRequest rosterRequest) {
		return gradeService.updateGradeNumber(rosterRequest.getGrade(), rosterRequest.getAddGrade(), rosterRequest.getIndex());
	}
	
	@GetMapping("/student/gpa")
	@ResponseStatus(HttpStatus.OK)
	public int getStudentGPA(@RequestBody Student student) {
		Student getStudent = studentService.getStudentById(student.getId());
		
		return getStudent.getGPA();
	}
	
	@GetMapping("/student/avg/name")
	@ResponseStatus(HttpStatus.OK)
	public int getStudentAvgByName(@RequestBody RosterRequest rosterRequest) {
		Student getStudent = studentService.getStudentById(rosterRequest.getStudent().getId());
		Roster roster = rosterService.getRosterById(rosterRequest.getRoster().getId()); 
		return gradeService.getAvgByName(roster, rosterRequest.getName(), getStudent);
	}
	
	@GetMapping("/student/avg")
	@ResponseStatus(HttpStatus.OK)
	public int getStudentAvgByRoster(@RequestBody RosterRequest rosterRequest) {
		Student getStudent = studentService.getStudentById(rosterRequest.getStudent().getId());
		Roster roster = rosterService.getRosterById(rosterRequest.getRoster().getId()); 
		return gradeService.getAvgByRoster(roster, getStudent);
	}
	
}
