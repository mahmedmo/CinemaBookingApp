package com.AcmeBuddy.backend.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AcmeBuddy.backend.DTO.SeatDTO;
import com.AcmeBuddy.backend.DTO.SeatmapDTO;
import com.AcmeBuddy.backend.Mapper.SeatMapper;
import com.AcmeBuddy.backend.Mapper.SeatmapMapper;
import com.AcmeBuddy.backend.entities.Seat;
import com.AcmeBuddy.backend.entities.SeatAvailability;
import com.AcmeBuddy.backend.entities.Seatmap;
import com.AcmeBuddy.backend.repositories.ISeatAvailabilityRepository;
import com.AcmeBuddy.backend.repositories.ISeatRepository;
import com.AcmeBuddy.backend.repositories.IShowtimeRepository;

import jakarta.transaction.Transactional;

@Service
public class ShowtimeService {

    private final IShowtimeRepository showtimeRepository;
    private final ISeatRepository seatRepository;
    private final ISeatAvailabilityRepository seatAvailabilityRepository;

    @Autowired
    public ShowtimeService(IShowtimeRepository showtimeRepository, ISeatRepository seatRepository, ISeatAvailabilityRepository seatAvailabilityRepository) {
        this.showtimeRepository = showtimeRepository;
        this.seatRepository = seatRepository;
        this.seatAvailabilityRepository = seatAvailabilityRepository;
    }

    public LocalDateTime getShowtimeDateById(long id) {
        return showtimeRepository.findById(id).get().getDateTime();
    }

    public SeatmapDTO getSeatmapByShowtimeId(long showtimeId) {
        return showtimeRepository.findById(showtimeId)
                .map(showtime -> {
                    Seatmap seatmap = showtime.getSeatmap();
                    if (seatmap == null) {
                        throw new IllegalArgumentException("Seatmap not found for Showtime with id: " + showtimeId);
                    }
                    return SeatmapMapper.toDTO(seatmap);
                })
                .orElseThrow(() -> new IllegalArgumentException("Showtime not found with id: " + showtimeId));
    }

    public List<SeatDTO> getSeatsByShowtimeId(long showtimeId) {
        return showtimeRepository.findById(showtimeId)
                .map(showtime -> {
                    int seatmapId = showtime.getSeatmap().getId();
                    List<Seat> seats = seatRepository.findBySeatmapId(seatmapId);
                    return seats.stream().map(SeatMapper::toDTO).toList();
                })
                .orElseThrow(() -> new IllegalArgumentException("Showtime not found with id: " + showtimeId));
    }

    public boolean isSeatReserved(long seatId, long showtimeId) {
        return seatAvailabilityRepository.findBySeatIdAndShowtimeId(seatId, showtimeId)
                .map(SeatAvailability::isReserved)
                .orElseThrow(() -> new IllegalArgumentException(
                "No SeatAvailability found for seat ID " + seatId + " and showtime ID " + showtimeId));
    }

    @Transactional
    public void setSeatReserved(long seatId, long showtimeId) {
        SeatAvailability seatAvailability = seatAvailabilityRepository.findBySeatIdAndShowtimeId(seatId, showtimeId)
                .orElseThrow(() -> new IllegalArgumentException(
                "No SeatAvailability found for seat ID " + seatId + " and showtime ID " + showtimeId));

        seatAvailability.reserve();
        seatAvailabilityRepository.save(seatAvailability);
    }
}
