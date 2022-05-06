package com.school.schoolroster.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.school.schoolroster.roster.Roster;

@Repository
public interface RosterRepository extends JpaRepository<Roster, Long>{
	/*
	@Query("select u from roster u where u.teachers = :id")
	List<Roster> findByTeacherId(@Param(value = "id") long id);
	@Query("SELECT u FROM roster u WHERE u.students = :id")
	List<Roster> findByStudentId(@Param(value = "id") long id);
	
	@Modifying
	@Transactional
	@Query("delete from roster u where u.students = :id")
	void deleteStudentById(@Param(value = "id") long id);
	*/
	@Modifying
	@Transactional
	@Query("delete from roster u where u.id = :id")
	void deleteRoster(@Param(value = "id") long id);
}
