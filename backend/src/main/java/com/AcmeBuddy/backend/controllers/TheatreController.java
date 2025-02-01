package com.AcmeBuddy.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AcmeBuddy.backend.entities.Theatre;
import com.AcmeBuddy.backend.services.TheatreService;

@RestController
@RequestMapping("/api/theatres")
@CrossOrigin(origins = "http://localhost:3000")
public class TheatreController {

    private final TheatreService theatreService;

    @Autowired
    public TheatreController(TheatreService theatreService) {
        this.theatreService = theatreService;
    }

    @GetMapping("/{id}/location")
    public ResponseEntity<String> getTheatreLocationById(@PathVariable long id) {
        return ResponseEntity.ok(theatreService.getTheatreLocationById(id));
    }

    @GetMapping("/{id}/movies")
    public ResponseEntity<List<Integer>> getTheatreMoviesById(@PathVariable long id) {
        return ResponseEntity.ok(theatreService.getTheatreMovieIdsById(id));
    }

    @GetMapping
    public ResponseEntity<List<Theatre>> getTheatreList() {
        return ResponseEntity.ok(theatreService.getTheatreList());
    }
}
