package com.AcmeBuddy.backend.services;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AcmeBuddy.backend.DTO.MovieDTO;
import com.AcmeBuddy.backend.DTO.ShowtimeDTO;
import com.AcmeBuddy.backend.Mapper.MovieMapper;
import com.AcmeBuddy.backend.Mapper.ShowtimeMapper;
import com.AcmeBuddy.backend.entities.TheatreMovie;
import com.AcmeBuddy.backend.repositories.ITheatreMovieRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TheatreMovieService {

    private final ITheatreMovieRepository theatreMovieRepository;

    @Autowired
    public TheatreMovieService(ITheatreMovieRepository theatreMovieRepository) {
        this.theatreMovieRepository = theatreMovieRepository;
    }

    public Optional<TheatreMovie> findTheatreMovieById(long id) {
        return theatreMovieRepository.findById(id);
    }

    public MovieDTO getMovieById(long id) {
        return theatreMovieRepository.findById(id)
                .map(TheatreMovie::getMovie)
                .map(MovieMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("TheatreMovie not found with id: " + id));
    }

    public List<ShowtimeDTO> getShowtimesById(long id) {
        Optional<TheatreMovie> theatreMovie = theatreMovieRepository.findById(id);

        return theatreMovie.map(movie -> movie.getShowtimes()
                .stream()
                .map(ShowtimeMapper::toDTO)
                .collect(Collectors.toList()))
                .orElse(Collections.emptyList());
    }
}
