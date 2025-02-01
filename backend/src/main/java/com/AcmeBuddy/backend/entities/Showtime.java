package com.AcmeBuddy.backend.entities;

import java.time.LocalDateTime;
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
@Table(name = "SHOWTIME")
public class Showtime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_num") // Maps to Id_num in SHOWTIME table
    private Integer id;

    @Column(name = "Date_time", nullable = false)
    private LocalDateTime dateTime;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Theatre_Movie_Id", nullable = false) // References THEATRE_MOVIE
    private TheatreMovie theatreMovie;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Seatmap_Id", nullable = false) // Foreign key to SEATMAP table
    private Seatmap seatmap;

    @OneToMany(mappedBy = "showtime", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SeatAvailability> seatAvailabilityList;

    // Default constructor
    public Showtime() {
    }

    // Constructor
    public Showtime(LocalDateTime dateTime, TheatreMovie theatreMovie, Seatmap seatmap) {
        this.dateTime = dateTime;
        this.theatreMovie = theatreMovie;
        this.seatmap = seatmap;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public TheatreMovie getTheatreMovie() {
        return theatreMovie;
    }

    public void setTheatreMovie(TheatreMovie theatreMovie) {
        this.theatreMovie = theatreMovie;
    }

    public Seatmap getSeatmap() {
        return seatmap;
    }

    public void setSeatmap(Seatmap seatmap) {
        this.seatmap = seatmap;
    }

    public List<SeatAvailability> getSeatAvailabilityList() {
        return seatAvailabilityList;
    }

    public void setSeatAvailabilityList(List<SeatAvailability> seatAvailabilityList) {
        this.seatAvailabilityList = seatAvailabilityList;
    }
}
