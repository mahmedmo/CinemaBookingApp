package com.AcmeBuddy.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.AcmeBuddy.backend.entities.User;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {

    // Find user by email
    Optional<User> findByEmail(String email);
}
