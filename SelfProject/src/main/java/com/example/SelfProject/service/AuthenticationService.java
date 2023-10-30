package com.example.SelfProject.service;

import com.example.SelfProject.model.Role;
import com.example.SelfProject.model.User;
import com.example.SelfProject.repository.UserRepository;
import com.example.SelfProject.request.AuthenticationRequest;
import com.example.SelfProject.request.RegisterRequest;
import com.example.SelfProject.response.AuthenticationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;


    @Autowired
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    //RegisterService
    public AuthenticationResponse register(RegisterRequest request) {
        // Check if a user with the given email already exists
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            // Handle the case where the email is already in use
            System.out.println("Email is already in use.");
            return null; // Or handle this case as you see fit
        }
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        }

    //AuthenticationService
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (Exception e) {
            // Handle the case where authentication credentials are invalid
            System.out.println("Invalid email or password.");
            return null; // Or handle this case as you see fit
        }

//        if(userRepository.exitsByEmail(request.getEmail())){
//            System.out.println("Email has already been taken.");
//        } else {
//            try {
//                authenticationManager.authenticate(
//                        new UsernamePasswordAuthenticationToken(
//                                request.getEmail(),
//                                request.getPassword()
//                        )
//                );
//            } catch (Exception e) {
//                // Handle the case where authentication credentials are invalid
//                System.out.println("Invalid email or password.");
//                return null; // Or handle this case as you see fit
//            }
//        }

        User user;
        try {
            user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        } catch (Exception e) {
            // Handle the case where no user is found with the provided email
            System.out.println("No user found with the provided email.");
            return null; // Or handle this case as you see fit
        }


        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
