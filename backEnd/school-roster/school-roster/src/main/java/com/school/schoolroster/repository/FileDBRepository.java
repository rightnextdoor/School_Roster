package com.school.schoolroster.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.school.schoolroster.models.FileDB;

@Repository
public interface FileDBRepository extends JpaRepository<FileDB, String> {
	Optional<FileDB> findByUserId(Long userId);
	
	@Modifying
	@Transactional
	@Query("delete from files u where u.id = :id")
	void deletePhoto(@Param(value = "id") String id);
}