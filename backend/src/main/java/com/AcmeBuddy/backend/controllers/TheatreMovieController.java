package com.AcmeBuddy.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AcmeBuddy.backend.DTO.MovieDTO;
import com.AcmeBuddy.backend.DTO.ShowtimeDTO;
import com.AcmeBuddy.backend.entities.TheatreMovie;
import com.AcmeBuddy.backend.services.TheatreMovieService;

@RestController
@RequestMapping("/api/theatremovies")
@CrossOrigin(origins = "http://localhost:3000")
public class TheatreMovieController {

    private final TheatreMovieService theatreMovieService;

    @Autowired
    public TheatreMovieController(TheatreMovieService theatreMovieService) {
        this.theatreMovieService = theatreMovieService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<TheatreMovie>> findTheatreMovieById(@PathVariable long id) {
        return ResponseEntity.ok(theatreMovieService.findTheatreMovieById(id));
    }

    @GetMapping("/{id}/movie")
    public ResponseEntity<MovieDTO> getMovieById(@PathVariable long id) {
        return ResponseEntity.ok(theatreMovieService.getMovieById(id));
    }

    @GetMapping("/{id}/showtimes")
    public ResponseEntity<List<ShowtimeDTO>> getShowtimesById(@PathVariable long id) {
        return ResponseEntity.ok(theatreMovieService.getShowtimesById(id));
    }
}
