package com.AcmeBuddy.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.AcmeBuddy.backend.entities.Address;
import com.AcmeBuddy.backend.entities.Payment;
import com.AcmeBuddy.backend.entities.RegisteredUser;
import com.AcmeBuddy.backend.entities.User;
import com.AcmeBuddy.backend.repositories.IAddressRepository;
import com.AcmeBuddy.backend.repositories.IPaymentRepository;
import com.AcmeBuddy.backend.repositories.IRegisteredUserRepository;
import com.AcmeBuddy.backend.repositories.IUserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {

    private final IUserRepository userRepository;
    private final IRegisteredUserRepository registeredUserRepository;
    private final IPaymentRepository paymentRepository;
    private final IAddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(IUserRepository userRepository, IRegisteredUserRepository registeredUserRepository,
            IPaymentRepository paymentRepository, IAddressRepository addressRepository) {
        this.userRepository = userRepository;
        this.registeredUserRepository = registeredUserRepository;
        this.paymentRepository = paymentRepository;
        this.addressRepository = addressRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // Create a user with just an email
    public User createUser(String email) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("User with this email already exists.");
        }
        User user = new User(email);
        userRepository.save(user);
        return user;
    }

    @Transactional
    public RegisteredUser registerUser(String email, String street, String city, String state, String zipCode,
            String cardNumber, String expiry, String cvv, String password) {
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            user = new User(email);
            userRepository.save(user);
        }

        if (registeredUserRepository.findById((long) user.getId()).isPresent()) {
            throw new IllegalArgumentException("This user is already registered.");
        }

        Address address = new Address(street, city, state, zipCode);
        addressRepository.save(address);

        Payment payment = new Payment(cardNumber, expiry, cvv);
        paymentRepository.save(payment);

        String encodedPassword = passwordEncoder.encode(password);
        RegisteredUser registeredUser = new RegisteredUser(user, payment.getId(), address.getId(), encodedPassword);

        return registeredUserRepository.save(registeredUser);
    }

    // Retrieve user ID by email
    public Optional<Integer> getUserIdByEmail(String email) {
        return userRepository.findByEmail(email).map(User::getId);
    }

    public Optional<RegisteredUser> validatePassword(String email, String password) {
        System.out.println("Fetching user with email: " + email);
        Optional<RegisteredUser> registeredUserOpt = registeredUserRepository.findByUserEmail(email);
        if (registeredUserOpt.isPresent()) {
            RegisteredUser registeredUser = registeredUserOpt.get();
            System.out.println("Password comparison result: " + passwordEncoder.matches(password, registeredUser.getPassword()));

            if (passwordEncoder.matches(password, registeredUser.getPassword())) {
                return Optional.of(registeredUser);
            }
        }

        return Optional.empty();
    }

    // Get address by ID
    public Optional<Address> getAddressById(Long addressId) {
        return addressRepository.findById(addressId);
    }

    // Get payment by ID
    public Optional<Payment> getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId);
    }

    public Optional<Object> getUserOrRegisteredUserById(Long userId) {
        Optional<RegisteredUser> registeredUser = registeredUserRepository.findById(userId);
        if (registeredUser.isPresent()) {
            return Optional.of(registeredUser.get());
        }
        return userRepository.findById(userId).map(user -> (Object) user);
    }

    public Optional<String> getEmailByUserId(Long userId) {
        Optional<User> user = registeredUserRepository.findUserWithRegisteredUserById(userId);
        if (user.isPresent()) {
            return Optional.of(user.get().getEmail());
        }
        return Optional.empty();
    }
}
