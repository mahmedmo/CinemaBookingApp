package com.AcmeBuddy.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AcmeBuddy.backend.DTO.TicketDTO;
import com.AcmeBuddy.backend.Mapper.TicketMapper;
import com.AcmeBuddy.backend.entities.Ticket;
import com.AcmeBuddy.backend.repositories.ITicketRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TicketService {

    private final ITicketRepository ticketRepository;

    @Autowired
    public TicketService(ITicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public Ticket saveTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public TicketDTO getTicketById(Long id) {
        return ticketRepository.findById(id)
                .map(TicketMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("TheatreMovie not found with id: " + id));
    }

    public Ticket cancelTicket(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ticket not found with id: " + id));

        ticket.setState(1);
        return ticketRepository.save(ticket);
    }
}
