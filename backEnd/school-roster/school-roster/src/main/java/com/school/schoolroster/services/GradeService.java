package com.school.schoolroster.services;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.school.schoolroster.exception.BadRequestException;
import com.school.schoolroster.repository.GradeNameRepository;
import com.school.schoolroster.repository.GradeRepository;
import com.school.schoolroster.repository.RosterRepository;
import com.school.schoolroster.repository.StudentRepository;
import com.school.schoolroster.roster.Grade;
import com.school.schoolroster.roster.GradeName;
import com.school.schoolroster.roster.Roster;
import com.school.schoolroster.roster.Student;

@Service
public class GradeService {
	
	@Autowired
	GradeRepository gradeRepository;
	@Autowired
	GradeNameRepository gradeNameRepository;
	@Autowired
	StudentRepository studentRepository;
	@Autowired
	RosterRepository rosterRepository;

	public void initialGrade(Roster roster, Student student) {
		for(String name: roster.getGradeName().getGradeName()) {
			Grade grade = new Grade(name, roster, student);
			roster.addGrade(grade);
			gradeRepository.save(grade);
		}
	}
	
	public Grade getGradeById(Grade grade) {
		return gradeRepository.findById(grade.getId()).get();
	}
	
	public List<Grade> getAllStudentGradeByGradeName(Roster roster, String gradeName) {
		return roster.getAllStudentByGradeName(gradeName);
	}
	
	public List<Grade> getAllGradeInSchool() {
		return gradeRepository.findAll();
	}
	
	public GradeName initialGradeName(Set<String> names) {
		GradeName gradeName = new GradeName(names);
		return gradeNameRepository.save(gradeName);
	}
	
	public GradeName getGradeNameById(GradeName gradeName) {
		return gradeNameRepository.getById(gradeName.getId());
	}
	
	public GradeName addGradeName(String addGradeName, GradeName gradeName, Roster roster) {
		
		GradeName getGradeName = getGradeNameById(gradeName);
		getGradeName.addGradeName(addGradeName);
		for(Student student: roster.getStudents()) {
			Grade grade = new Grade(addGradeName, roster, student);
			roster.addGrade(grade);
			//rosterRepository.save(roster);
			gradeRepository.save(grade);
			
		}
		return gradeNameRepository.save(getGradeName);
		
	}
	
	public Grade deleteGradeName(String name, GradeName gradeName, Roster roster) {
		GradeName getGradeName = getGradeNameById(gradeName);
		
		if(!getGradeName.getGradeName().contains(name)) {
			throw new BadRequestException("The grade name is not in the list");
		}
		Grade deleteGrade = new Grade();
		
		for(Student student: roster.getStudents()) {
			Grade grade = roster.findStudentGrade(student, name);
			deleteGrade = grade;
			roster.deleteGrade(grade);
			rosterRepository.save(roster);
			
		}
		getGradeName.deleteGradeName(name);
		gradeNameRepository.save(getGradeName);
		deleteGradeById(deleteGrade);
		return deleteGrade;
	}
	
	public void deleteGradeById(Grade grade) {
		gradeRepository.deleteGrade(grade.getId());
	}
	
	public GradeName updateGradeName(GradeName gradeName, String oldName, String replaceName, Roster roster) {
		
		GradeName getGradeName = getGradeNameById(gradeName);
		if(!getGradeName.getGradeName().contains(oldName)) {
			throw new BadRequestException("The grade name is not in the list");
		}
		getGradeName.updateGradeName(oldName, replaceName);
		
		for(Student student: roster.getStudents()) {
			Grade grade = roster.findStudentGrade(student, oldName);
			grade.setGradeName(replaceName);
			gradeRepository.save(grade);
		}
		return gradeNameRepository.save(getGradeName);
	}
	
	public Grade addGrade(Grade grade, Integer addGrade) {
		Grade getGrade = getGradeById(grade);
		getGrade.addGrade(addGrade);
		getGrade.setAverage(getGrade.getAverage());
		return gradeRepository.save(getGrade);
	}
	
	
	public Grade deleteGradeNumber(Grade grade, int index) {
		Grade getGrade = getGradeById(grade);
		getGrade.deleteGrade(index);
		getGrade.setAverage(getGrade.getAverage());
		return gradeRepository.save(getGrade);
	}
	
	public Grade updateGradeNumber(Grade grade, Integer updateGrade, int index) {
		Grade getGrade = getGradeById(grade);
		getGrade.updateGrade(index, updateGrade);
		getGrade.setAverage(getGrade.getAverage());
		return gradeRepository.save(getGrade);
	}
	
	public int getAvgByName(Roster roster, String gradeName, Student student) {
		return student.getClassAverageByGradeName(roster, gradeName);
		
	}
	public int getAvgByRoster(Roster roster, Student student) {
		return student.getClassAverage(roster);
	}
}
