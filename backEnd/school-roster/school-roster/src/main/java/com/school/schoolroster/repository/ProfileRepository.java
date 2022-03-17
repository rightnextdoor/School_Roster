package com.school.schoolroster.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.school.schoolroster.models.Profile;
import com.school.schoolroster.models.User;


@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
	Optional<Profile> findByUserId(Long userId);
	
	@Modifying
	@Transactional
	@Query("update address u set u.streetAddress = :street_address where u.id = :id")
	void updateStreetAddress(@Param(value = "id") long id, @Param(value = "street_address") String streetAddress);
	@Modifying
	@Transactional
	@Query("update address u set u.city = :city where u.id = :id")
	void updateCity(@Param(value = "id") long id, @Param(value = "city") String city);
	@Modifying
	@Transactional
	@Query("update address u set u.state = :state where u.id = :id")
	void updateState(@Param(value = "id") long id, @Param(value = "state") String state);
	@Modifying
	@Transactional
	@Query("update address u set u.zipCode = :zip_code where u.id = :id")
	void updateZipCode(@Param(value = "id") long id, @Param(value = "zip_code") String zipCode);
	
	@Modifying
	@Transactional
	@Query("update phone_number u set u.phoneNumber = :phone_number where u.id = :id")
	void updatePhoneNumber(@Param(value = "id") long id, @Param(value = "phone_number") String phoneNumber);
	@Modifying
	@Transactional
	@Query("update phone_number u set u.phoneType = :phone_type where u.id = :id")
	void updatePhoneType(@Param(value = "id") long id, @Param(value = "phone_type") String phoneType);
	
	@Modifying
	@Transactional
	@Query("delete from address u where u.id = :id")
	void deleteAddress(@Param(value = "id") long id);
	@Modifying
	@Transactional
	@Query("delete from phone_number u where u.id = :id")
	void deletePhoneNumber(@Param(value = "id") long id);
	
	@Query("select u from Profile u where u.role like %:role%")
	List<Profile> findAllByRole(@Param("role") String role);
}
