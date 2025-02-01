package com.AcmeBuddy.backend.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "THEATRE_MOVIE")
public class TheatreMovie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_num") // Maps to Id_num in THEATRE_MOVIE table
    private Integer id;

    @Column(name = "Theatre_Id", nullable = false) // References THEATRE table
    private Integer theatreId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Movie_Id", nullable = false) // References MOVIE
    private Movie movie;

    @JsonIgnore
    @OneToMany(mappedBy = "theatreMovie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Showtime> showtimes;

    // Default constructor
    public TheatreMovie() {
    }

    // Constructor
    public TheatreMovie(Integer theatreId, Movie movie) {
        this.theatreId = theatreId;
        this.movie = movie;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getTheatreId() {
        return theatreId;
    }

    public void setTheatreId(int theatreId) {
        this.theatreId = theatreId;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public List<Showtime> getShowtimes() {
        return showtimes;
    }

    public void setShowtimes(List<Showtime> showtimes) {
        this.showtimes = showtimes;
    }
}
