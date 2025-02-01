package com.AcmeBuddy.backend.Mapper;

import com.AcmeBuddy.backend.DTO.ShowtimeDTO;
import com.AcmeBuddy.backend.entities.Showtime;

public class ShowtimeMapper {

    public static ShowtimeDTO toDTO(Showtime showtime) {
        return new ShowtimeDTO(
                showtime.getId(),
                showtime.getDateTime()
        );
    }

    public static Showtime toEntity(ShowtimeDTO showtimeDTO) {
        Showtime showtime = new Showtime();
        showtime.setId(showtimeDTO.getId());
        showtime.setDateTime(showtimeDTO.getDateTime());
        return showtime;
    }
}
