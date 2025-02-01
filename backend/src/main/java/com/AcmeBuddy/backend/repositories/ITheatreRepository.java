package com.AcmeBuddy.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.AcmeBuddy.backend.entities.Theatre;

@Repository
public interface ITheatreRepository extends JpaRepository<Theatre, Long> {

}
