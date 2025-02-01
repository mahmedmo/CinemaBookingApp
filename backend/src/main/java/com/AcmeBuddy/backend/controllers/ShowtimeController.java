package com.AcmeBuddy.backend.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AcmeBuddy.backend.DTO.SeatDTO;
import com.AcmeBuddy.backend.DTO.SeatmapDTO;
import com.AcmeBuddy.backend.services.ShowtimeService;

@RestController
@RequestMapping("/api/showtimes")
@CrossOrigin(origins = "http://localhost:3000")
public class ShowtimeController {

    private final ShowtimeService showtimeService;

    @Autowired
    public ShowtimeController(ShowtimeService showtimeService) {
        this.showtimeService = showtimeService;
    }

    @GetMapping("/{id}/date")
    public ResponseEntity<LocalDateTime> getShowtimeDateById(@PathVariable long id) {
        return ResponseEntity.ok(showtimeService.getShowtimeDateById(id));
    }

    @GetMapping("/{id}/seatmap")
    public ResponseEntity<SeatmapDTO> getSeatmapById(@PathVariable long id) {
        return ResponseEntity.ok(showtimeService.getSeatmapByShowtimeId(id));
    }

    @GetMapping("/{showtimeId}/seats")
    public ResponseEntity<List<SeatDTO>> getSeatsByShowtimeId(@PathVariable long showtimeId) {
        List<SeatDTO> seats = showtimeService.getSeatsByShowtimeId(showtimeId);
        return ResponseEntity.ok(seats);
    }

    @GetMapping("/{showtimeId}/seats/{seatId}/reserved")
    public ResponseEntity<Boolean> isSeatReserved(
            @PathVariable long showtimeId,
            @PathVariable long seatId) {
        boolean reserved = showtimeService.isSeatReserved(seatId, showtimeId);
        return ResponseEntity.ok(reserved);
    }

    @PostMapping("/{showtimeId}/seats/{seatId}/reserve")
    public ResponseEntity<Void> setSeatReserved(
            @PathVariable long showtimeId,
            @PathVariable long seatId) {
        showtimeService.setSeatReserved(seatId, showtimeId);
        return ResponseEntity.noContent().build();
    }

}
