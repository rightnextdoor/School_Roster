package com.school.schoolroster.roster;


import java.util.HashSet;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;


@Entity
@Table(name = "gradeName")
public class GradeName {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@ElementCollection(targetClass = String.class)
	private Set<String> gradeName = new HashSet<>();
	
	public GradeName() {
		super();
	}
	
	public GradeName(Set<String> gradeName) {
		super();
		this.gradeName = gradeName;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Set<String> getGradeName() {
		return gradeName;
	}

	public void setGradeName(Set<String> gradeName) {
		this.gradeName = gradeName;
	}

	public void addGradeName(String name) {
		gradeName.add(name);
	}
	public void deleteGradeName(String name) {
		if(gradeName.contains(name)) {
			gradeName.remove(name);
		}
	}
	public void updateGradeName(String oldName, String replaceName) {
		if(gradeName.contains(oldName)) {
			gradeName.remove(oldName);
			gradeName.add(replaceName);
		}
	}
}
