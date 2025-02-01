package com.AcmeBuddy.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.AcmeBuddy.backend.entities.Receipt;

@Repository
public interface IReceiptRepository extends JpaRepository<Receipt, Long> {

}
