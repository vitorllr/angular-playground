package com.loginjwt.loginjwt.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

import org.springframework.stereotype.Service;
import io.github.cdimascio.dotenv.Dotenv;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private String jwtSecret;
    private long jwtExpiration;

    public JwtService(Dotenv dotenv) {
        this.jwtSecret = dotenv.get("JWT_SECRET");
        this.jwtExpiration = Long.parseLong(dotenv.get("JWT_EXPIRATION", "3600000"));
    }

    private Key key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
