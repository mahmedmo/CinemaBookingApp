package com.AcmeBuddy.backend.Mapper;

import com.AcmeBuddy.backend.DTO.TicketDTO;
import com.AcmeBuddy.backend.entities.Ticket;

public class TicketMapper {

    public static TicketDTO toDTO(Ticket ticket) {
        return new TicketDTO(
                ticket.getId(),
                ticket.getUserId(),
                ticket.getShowtimeId(),
                ticket.getSeatId(),
                ticket.getState(),
                ticket.getAge()
        );
    }

    public static Ticket toEntity(TicketDTO ticketDTO) {
        Ticket ticket = new Ticket();
        ticket.setId(ticketDTO.getId());
        ticket.setUserId(ticketDTO.getUserId());
        ticket.setShowtimeId(ticketDTO.getShowtimeId());
        ticket.setSeatId(ticketDTO.getSeatId());
        ticket.setState(ticketDTO.getState());
        ticket.setAge(ticketDTO.getAge());
        return ticket;
    }
}
