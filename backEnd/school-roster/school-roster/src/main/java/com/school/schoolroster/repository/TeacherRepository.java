package com.school.schoolroster.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.school.schoolroster.roster.Teacher;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long>{

}
