package com.ebms.security;

import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private final String SECRET =
            "mySuperSecretKeyForEnterpriseBusinessManagementSystem";

    public String generateToken(String username) {

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(
                                System.currentTimeMillis() + 86400000
                        )
                )
                .signWith(
                        Keys.hmacShaKeyFor(
                                SECRET.getBytes()
                        ),
                        SignatureAlgorithm.HS256
                )
                .compact();
    }

} 