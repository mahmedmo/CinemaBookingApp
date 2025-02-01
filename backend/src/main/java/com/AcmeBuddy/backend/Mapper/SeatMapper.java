package com.AcmeBuddy.backend.Mapper;

import com.AcmeBuddy.backend.DTO.SeatDTO;
import com.AcmeBuddy.backend.entities.Seat;

public class SeatMapper {

    public static SeatDTO toDTO(Seat seat) {
        SeatDTO dto = new SeatDTO();
        dto.setId(seat.getId());
        dto.setRow(seat.getRow());
        dto.setColumn(seat.getColumn());
        return dto;
    }
}
