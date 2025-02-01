package com.AcmeBuddy.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.AcmeBuddy.backend.entities.TheatreMovie;

@Repository
public interface ITheatreMovieRepository extends JpaRepository<TheatreMovie, Long> {
}
