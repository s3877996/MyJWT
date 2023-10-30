package com.example.SelfProject.repository;

import com.example.SelfProject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    //find the user by email
    Optional<User> findByEmail(String email);

//    //check the email has already exits
//    boolean exitsByEmail(String email);
}
