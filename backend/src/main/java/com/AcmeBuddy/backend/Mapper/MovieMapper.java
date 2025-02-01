package com.AcmeBuddy.backend.Mapper;

import com.AcmeBuddy.backend.DTO.MovieDTO;
import com.AcmeBuddy.backend.entities.Movie;

public class MovieMapper {

    public static MovieDTO toDTO(Movie movie) {
        return new MovieDTO(
                movie.getId(),
                movie.getTitle(),
                movie.getImage(),
                movie.getRuntime(),
                movie.getPremiere(),
                movie.getDetails()
        );
    }

    public static Movie toEntity(MovieDTO movieDTO) {
        Movie movie = new Movie();
        movie.setId(movieDTO.getId());
        movie.setTitle(movieDTO.getTitle());
        movie.setImage(movieDTO.getImage());
        movie.setRuntime(movieDTO.getRuntime());
        movie.setPremiere(movieDTO.getPremiere());
        movie.setDetails(movieDTO.getDetails());
        return movie;
    }
}
