package com.AcmeBuddy.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.AcmeBuddy.backend.entities.Address;

@Repository
public interface IAddressRepository extends JpaRepository<Address, Long> {

}
