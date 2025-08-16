package com.loginjwt.loginjwt.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

import com.loginjwt.loginjwt.dto.UserResponseDTO;
import com.loginjwt.loginjwt.model.User;
import com.loginjwt.loginjwt.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Get all users")
    public List<UserResponseDTO> all() {
        return userService.getAllUsers().stream()
                .map(user -> new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail()))
                .collect(Collectors.toList());
    }

    @PostMapping
    @Operation(summary = "Create a new user")
    public UserResponseDTO createUser(@RequestBody User user) {
        User createdUser = userService.registerUser(user);
        UserResponseDTO userResponse = new UserResponseDTO(createdUser.getId(), createdUser.getUsername(),
                createdUser.getEmail());
        return userResponse;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID")
    public UserResponseDTO getUserById(@PathVariable Long id) {
        UserResponseDTO user = userService.getUserById(id);
        return user;
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Update user by ID")
    public UserResponseDTO updateUser(@PathVariable Long id, @RequestBody User user) {
        UserResponseDTO updatedUser = userService.updateUser(id, user);
        return updatedUser;
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "Delete user by ID")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

}
