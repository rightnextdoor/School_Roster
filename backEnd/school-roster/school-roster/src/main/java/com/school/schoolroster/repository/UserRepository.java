package com.school.schoolroster.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.school.schoolroster.models.User;

import io.jsonwebtoken.lang.Arrays;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	Optional<User> findByUsernameOrEmail(String username, String email);
	
	Optional<User> findByEmail(String email);
	Optional<User> findByUsername(String username);
	
	@Query("select u from User u where u.role like %:role%")
	List<User> findAllByRole(@Param("role") String role);
	
}
