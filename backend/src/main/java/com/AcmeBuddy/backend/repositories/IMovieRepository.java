package com.AcmeBuddy.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.AcmeBuddy.backend.entities.Movie;

@Repository
public interface IMovieRepository extends JpaRepository<Movie, Long> {

}
