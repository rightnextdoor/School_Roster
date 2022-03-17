package com.school.schoolroster.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.school.schoolroster.filters.JwtRequestFilter;
import com.school.schoolroster.services.MyUserDetailsService;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter{

	@Autowired
	private MyUserDetailsService userDetailsService;
	@Autowired
	private JwtRequestFilter jwtRequestFilter;
	
	@Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()
	    .exceptionHandling()
	        .authenticationEntryPoint(unauthorizedHandler)
	        .and()
	    .sessionManagement()
	        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	        .and()
	    .authorizeRequests()
	        .antMatchers("/",
	            "/favicon.ico",
	            "/**/*.png",
	            "/**/*.gif",
	            "/**/*.svg",
	            "/**/*.jpg",
	            "/**/*.html",
	            "/**/*.css",
	            "/**/*.js")
	            .permitAll()
				.antMatchers("/createUser").permitAll()
				.antMatchers("/login").permitAll()
				.antMatchers("/usersRole").hasAnyAuthority("ADMIN","TEACHER","PRINCIPAL","TEACHER_LEADER")
				.antMatchers("/upload").hasAnyAuthority("ADMIN","STUDENT","TEACHER","PRINCIPAL","TEACHER_LEADER")
				.antMatchers("/files/").hasAnyAuthority("ADMIN","STUDENT","TEACHER","PRINCIPAL","TEACHER_LEADER")
				.antMatchers("/user").hasAnyAuthority("ADMIN","STUDENT","TEACHER","PRINCIPAL","TEACHER_LEADER")
				.antMatchers("/profile").hasAnyAuthority("ADMIN","STUDENT","TEACHER","PRINCIPAL","TEACHER_LEADER")
				.antMatchers("/admin").hasAuthority("ADMIN")
				.anyRequest().authenticated();
		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
	}
	
	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	@Bean 
	public PasswordEncoder getPasswordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}
	
}
