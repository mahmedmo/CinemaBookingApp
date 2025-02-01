package com.AcmeBuddy.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.AcmeBuddy.backend.entities.Payment;

@Repository
public interface IPaymentRepository extends JpaRepository<Payment, Long> {

}
