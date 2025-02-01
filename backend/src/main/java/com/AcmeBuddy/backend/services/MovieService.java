package com.AcmeBuddy.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AcmeBuddy.backend.entities.Movie;
import com.AcmeBuddy.backend.repositories.IMovieRepository;

@Service
public class MovieService {

    private final IMovieRepository movieRepository;

    @Autowired
    public MovieService(IMovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Optional<Movie> findMovieById(long id) {
        return movieRepository.findById(id);
    }

}
