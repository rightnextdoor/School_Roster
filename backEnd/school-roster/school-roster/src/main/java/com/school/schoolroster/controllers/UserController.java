package com.school.schoolroster.controllers;

import java.util.Collections;
import java.util.List;

import javax.management.relation.Role;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.school.schoolroster.exception.BadRequestException;
import com.school.schoolroster.models.MyUserDetails;
import com.school.schoolroster.models.Profile;
import com.school.schoolroster.models.User;
import com.school.schoolroster.payload.CurrentUser;
import com.school.schoolroster.payload.GetRole;
import com.school.schoolroster.payload.SignUpRequest;

import com.school.schoolroster.roster.Roster;
import com.school.schoolroster.roster.Student;
import com.school.schoolroster.roster.Teacher;
import com.school.schoolroster.roster.TeacherLeader;
import com.school.schoolroster.security.AuthenticationRequest;
import com.school.schoolroster.security.AuthenticationResponse;
import com.school.schoolroster.services.MyUserDetailsService;
import com.school.schoolroster.services.ProfileService;
import com.school.schoolroster.services.StudentService;
import com.school.schoolroster.services.TeacherLeadService;
import com.school.schoolroster.services.TeacherService;
import com.school.schoolroster.util.JwtUtil;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private MyUserDetailsService userDetailsService;
	
	@Autowired
	private StudentService studentService;
	@Autowired
	private TeacherService teacherService;
	@Autowired
	private TeacherLeadService teacherLeadService;
	@Autowired
	private ProfileService profileService;
	
	@Autowired
	private JwtUtil jwtTokenUtil;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public  ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
		try {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
				);
		} catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password" , e);
		}
		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());
		final String jwt = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new AuthenticationResponse(jwt));
	}
	
	@PostMapping("/createUser")
	@ResponseStatus(HttpStatus.CREATED)
	public User createUser(@Valid @RequestBody SignUpRequest signUpRequest) {
		if(userDetailsService.existsByUsername(signUpRequest.getUsername())) {
			throw new BadRequestException("Username is already taken!");
		}
		
		if(userDetailsService.existsByEmail(signUpRequest.getEmail())) {
			throw new BadRequestException("Email is already taken!");
		}
		
		User user = new User(signUpRequest.getUsername(),signUpRequest.getPassword(),
				signUpRequest.getEmail(), signUpRequest.isActive(),
                signUpRequest.getRole());
		User createNewUser = userDetailsService.saveNewUser(user);
		return createNewUser;
	}
	
	@GetMapping("/user")
	@ResponseStatus(HttpStatus.OK)
	public User getUser(@CurrentUser MyUserDetails myUserDetails) {
		return userDetailsService.getUser(myUserDetails.getUsername());
		
	}
	
	@GetMapping("/user/role")
	@ResponseStatus(HttpStatus.OK)
	public GetRole getUserRole(@CurrentUser MyUserDetails myUserDetails) {
		User user = userDetailsService.getUser(myUserDetails.getUsername());
		GetRole role = new GetRole();
		if(user.getRole().equals("STUDENT")) {
			Student student = studentService.getStudentById(user.getId());
			role.setStudent(student);
			
		} else if (user.getRole().equals("TEACHER") || user.getRole().equals("ADMIN")){
			Teacher teacher = teacherService.getTeacherById(user.getId());
			
			role.setTeacher(teacher);
		}else {
			TeacherLeader teacherLeader = teacherLeadService.getTeacherLeaderById(user.getId());
			role.setTeacherLeader(teacherLeader);
			Teacher teacher = teacherService.getTeacherById(user.getId());
			role.setTeacher(teacher);
		}
		return role;
	}
	
	@PostMapping("/usersRole")
	@ResponseStatus(HttpStatus.OK)
	public List<User> getAllUserByRole(@RequestParam("role") String role) {
		return userDetailsService.getAllUserByRole(role);
	}
	
	@PostMapping("/student")
	@ResponseStatus(HttpStatus.OK)
	public Student setStudent(@RequestBody User user) {
		Profile profile = profileService.getProfile(user);
		return studentService.initialStudent(profile);
	}
	
	@GetMapping("/student/id")
	@ResponseStatus(HttpStatus.OK)
	public Student getStudentById(@RequestBody Student student) {
		return studentService.getStudentById(student.getId());
	}
	@GetMapping("/student")
	@ResponseStatus(HttpStatus.OK)
	public List<Student> getAllStudent() {
		return studentService.getAllStudentsInSchool();
	}
	
	@PostMapping("/teacher")
	@ResponseStatus(HttpStatus.OK)
	public Teacher setTeacher(@RequestBody User user) {
		Profile profile = profileService.getProfile(user);
		return teacherService.initialTeacher(profile);
	}
	
	@GetMapping("/teacher/id")
	@ResponseStatus(HttpStatus.OK)
	public Teacher getTeacherById(@RequestBody Teacher teacher) {
		return teacherService.getTeacherById(teacher.getId());
	}
	@GetMapping("/teacher")
	@ResponseStatus(HttpStatus.OK)
	public List<Teacher> getAllTeacher() {
		return teacherService.getAllTeacherInSchool();
	}
	
	@PostMapping("/teacherLeader")
	@ResponseStatus(HttpStatus.OK)
	public TeacherLeader setTeacherLeader(@RequestBody User user) {
		Profile profile = profileService.getProfile(user);
		return teacherLeadService.initialTeacherLeader(profile);
	}
	
	@GetMapping("/teacherLeader/id")
	@ResponseStatus(HttpStatus.OK)
	public TeacherLeader getTeacherLeaderById(@RequestBody TeacherLeader teacher) {
		return teacherLeadService.getTeacherLeaderById(teacher.getId());
	}
	@GetMapping("/teacherLeader")
	@ResponseStatus(HttpStatus.OK)
	public List<TeacherLeader> getAllTeacherLeader() {
		return teacherLeadService.getAllTeacherLeaders();
	}
}
