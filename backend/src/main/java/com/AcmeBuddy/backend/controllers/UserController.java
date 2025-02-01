package com.AcmeBuddy.backend.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.AcmeBuddy.backend.DTO.RegisterUserDTO;
import com.AcmeBuddy.backend.DTO.ValidateResponseDTO;
import com.AcmeBuddy.backend.entities.Address;
import com.AcmeBuddy.backend.entities.Payment;
import com.AcmeBuddy.backend.entities.RegisteredUser;
import com.AcmeBuddy.backend.entities.User;
import com.AcmeBuddy.backend.services.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Create a user with just an email
    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestParam String email) {
        try {
            User user = userService.createUser(email);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Register a user with address, payment, and password details
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserDTO dto) {
        try {
            RegisteredUser registeredUser = userService.registerUser(
                    dto.getEmail(), dto.getStreet(), dto.getCity(), dto.getState(),
                    dto.getZipCode(), dto.getCardNumber(), dto.getExpiry(), dto.getCvv(), dto.getPassword());
            return ResponseEntity.ok(registeredUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Retrieve user ID by email
    @GetMapping("/id")
    public ResponseEntity<Integer> getUserIdByEmail(@RequestParam String email) {
        Optional<Integer> userId = userService.getUserIdByEmail(email);
        return userId.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().body(null));
    }

    // Validate registered user password
    @PostMapping("/validate")
    public ResponseEntity<ValidateResponseDTO> validatePassword(@RequestParam String email, @RequestParam String password) {
        Optional<RegisteredUser> user = userService.validatePassword(email, password);
        if (user.isPresent()) {
            ValidateResponseDTO response = new ValidateResponseDTO(true, (long) user.get().getId());
            return ResponseEntity.ok(response);
        }
        ValidateResponseDTO response = new ValidateResponseDTO(false, null);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); // 401 Unauthorized
    }

    // Get address by ID
    @GetMapping("/address/{addressId}")
    public ResponseEntity<Address> getAddressById(@PathVariable Long addressId) {
        Optional<Address> address = userService.getAddressById(addressId);
        return address.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().body(null));
    }

    // Get payment by ID
    @GetMapping("/payment/{paymentId}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long paymentId) {
        Optional<Payment> payment = userService.getPaymentById(paymentId);
        return payment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().body(null));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Object> getUserOrRegisteredUser(@PathVariable Long userId) {
        Optional<Object> user = userService.getUserOrRegisteredUserById(userId);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().body("User not found"));
    }

    @GetMapping("/{userId}/email")
    public ResponseEntity<String> getEmailByUserId(@PathVariable Long userId) {
        Optional<String> email = userService.getEmailByUserId(userId);
        return email.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().body("Email not found"));
    }

}
