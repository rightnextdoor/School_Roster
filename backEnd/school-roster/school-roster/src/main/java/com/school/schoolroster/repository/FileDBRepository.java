package com.school.schoolroster.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.school.schoolroster.models.FileDB;

@Repository
public interface FileDBRepository extends JpaRepository<FileDB, String> {
}