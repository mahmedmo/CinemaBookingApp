package com.AcmeBuddy.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.AcmeBuddy.backend.entities.RegisteredUser;
import com.AcmeBuddy.backend.entities.User;

@Repository
public interface IRegisteredUserRepository extends JpaRepository<RegisteredUser, Long> {

    @Query("SELECT ru FROM RegisteredUser ru JOIN ru.user u WHERE u.email = :email")
    Optional<RegisteredUser> findByUserEmail(@Param("email") String email);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.registeredUser WHERE u.id = :userId")
    Optional<User> findUserWithRegisteredUserById(@Param("userId") Long userId);

}
