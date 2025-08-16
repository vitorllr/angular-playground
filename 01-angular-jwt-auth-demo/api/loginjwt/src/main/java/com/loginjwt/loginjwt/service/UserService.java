package com.loginjwt.loginjwt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.loginjwt.loginjwt.dto.UserResponseDTO;
import com.loginjwt.loginjwt.model.User;
import com.loginjwt.loginjwt.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail());
    }

    public UserResponseDTO updateUser(Long id, User user) {
        User userFound = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        boolean changed = false;
        if (user.getUsername() != null && !user.getUsername().equals(userFound.getUsername())) {
            userFound.setUsername(user.getUsername());
            changed = true;
        }
        if (user.getEmail() != null && !user.getEmail().equals(userFound.getEmail())) {
            userFound.setEmail(user.getEmail());
            changed = true;
        }
        // Se quiser permitir atualização de senha:
        if (user.getPassword() != null && !user.getPassword().isBlank()) {
            userFound.setPassword(passwordEncoder.encode(user.getPassword()));
            changed = true;
        }
        if (changed) {
            userRepository.save(userFound);
        }
        return new UserResponseDTO(userFound.getId(), userFound.getUsername(), userFound.getEmail());
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

}
