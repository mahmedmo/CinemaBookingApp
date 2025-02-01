package com.AcmeBuddy.backend.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "THEATRE") // Maps to the THEATRE table
public class Theatre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_num") // Maps to Id_num in THEATRE table
    private Integer id;

    @Column(name = "Location", nullable = false) // Maps to Location in THEATRE table
    private String location;
    
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "Theatre_Id") // Maps to THEATRE_MOVIE(Theatre_Id)
    private List<TheatreMovie> theatreMovies;

    // Default constructor
    public Theatre() {}

    // Constructor
    public Theatre(String location) {
        this.location = location;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<TheatreMovie> getTheatreMovies() {
        return theatreMovies;
    }

    public void setTheatreMovies(List<TheatreMovie> theatreMovies) {
        this.theatreMovies = theatreMovies;
    }
}