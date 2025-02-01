package com.AcmeBuddy.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AcmeBuddy.backend.DTO.TicketDTO;
import com.AcmeBuddy.backend.entities.Ticket;
import com.AcmeBuddy.backend.services.TicketService;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:3000")
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
        Ticket savedTicket = ticketService.saveTicket(ticket);
        return new ResponseEntity<>(savedTicket, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketDTO> getTicketById(@PathVariable long id) {
        return ResponseEntity.ok(ticketService.getTicketById(id));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<Ticket> cancelTicket(@PathVariable long id) {
        Ticket canceledTicket = ticketService.cancelTicket(id);
        return ResponseEntity.ok(canceledTicket);
    }

}
