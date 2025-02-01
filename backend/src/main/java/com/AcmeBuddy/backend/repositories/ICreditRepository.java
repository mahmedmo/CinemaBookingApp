package com.AcmeBuddy.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.AcmeBuddy.backend.entities.AcmeCredit;

@Repository
public interface ICreditRepository extends JpaRepository<AcmeCredit, Long> {

    List<AcmeCredit> findByUserId(Long userId);
}
