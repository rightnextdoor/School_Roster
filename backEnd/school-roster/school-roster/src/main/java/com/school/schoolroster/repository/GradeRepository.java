package com.school.schoolroster.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.school.schoolroster.roster.Grade;

public interface GradeRepository extends JpaRepository<Grade, Long>{

	@Modifying
	@Transactional
	@Query("delete from grade u where u.id = :id")
	void deleteGrade(@Param(value = "id") long id);
}
