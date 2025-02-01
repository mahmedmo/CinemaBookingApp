package com.AcmeBuddy.backend.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AcmeBuddy.backend.entities.Theatre;
import com.AcmeBuddy.backend.entities.TheatreMovie;
import com.AcmeBuddy.backend.repositories.ITheatreRepository;

@Service
public class TheatreService {

    private final ITheatreRepository theatreRepository;

    @Autowired
    public TheatreService(ITheatreRepository theatreRepository) {
        this.theatreRepository = theatreRepository;
    }

    public String getTheatreLocationById(long id) {
        Optional<Theatre> theatre = theatreRepository.findById(id);
        if (theatre.isPresent()) {
            return theatre.get().getLocation();
        }
        return null;
    }

    public List<Integer> getTheatreMovieIdsById(long id) {
        return theatreRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Theatre not found with id: " + id))
                .getTheatreMovies()
                .stream()
                .map(TheatreMovie::getId)
                .collect(Collectors.toList());
    }

    public List<Theatre> getTheatreList() {
        return theatreRepository.findAll();
    }
}
