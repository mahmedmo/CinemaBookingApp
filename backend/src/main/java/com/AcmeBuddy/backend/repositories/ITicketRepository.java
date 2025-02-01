package com.AcmeBuddy.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.AcmeBuddy.backend.entities.Ticket;

@Repository
public interface ITicketRepository extends JpaRepository<Ticket, Long> {

}
