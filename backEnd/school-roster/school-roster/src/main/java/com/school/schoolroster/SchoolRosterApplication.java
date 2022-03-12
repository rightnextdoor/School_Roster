package com.school.schoolroster;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

@SpringBootApplication
@EntityScan(basePackageClasses = { 
		SchoolRosterApplication.class,
		Jsr310JpaConverters.class 
})
public class SchoolRosterApplication {

	public static void main(String[] args) {
		SpringApplication.run(SchoolRosterApplication.class, args);
	}

}
