package com.ebms.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ebms.auth.dto.LoginRequest;
import com.ebms.auth.dto.RegisterRequest;
import com.ebms.auth.entity.User;
import com.ebms.auth.repository.UserRepository;
import com.ebms.auth.entity.Role;
import com.ebms.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    public void register(RegisterRequest request) {

        User user = User.builder()
                .username(request.getUsername())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .role(Role.valueOf(
                        request.getRole()
                ))
                .build();

        userRepository.save(user);
    }

    public String getRole(String username){

        User user = userRepository
                .findByUsername(username)
                .orElseThrow();

        String role = user.getRole().name();
        return role;
    }

    public String login(LoginRequest request) {

        User user = userRepository
                .findByUsername(request.getUsername())
                .orElseThrow();

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            throw new RuntimeException(
                    "Invalid credentials"
            );
        }

        return jwtService.generateToken(
                user.getUsername()
        );
    }
}