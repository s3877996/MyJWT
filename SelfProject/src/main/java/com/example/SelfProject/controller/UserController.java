package com.example.SelfProject.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user")
@CrossOrigin("*")
public class UserController {

    @GetMapping
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Hello from secured endpoint");

    }

}
