package com.AcmeBuddy.backend.entities;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "MOVIE")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "Id_num")
    private Integer id;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "Image")
    private String image;

    @Column(name = "Runtime")
    private String runtime;

    @Column(name = "Premiere_date")
    private Date premiere;

    @Column(name = "Details", columnDefinition = "TEXT")
    private String details;

    // Default constructor
    public Movie() {
    }

    // Constructor
    public Movie(String title, String runtime) {
        this.title = title;
        this.runtime = runtime;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getRuntime() {
        return runtime;
    }

    public void setRuntime(String runtime) {
        this.runtime = runtime;
    }

    public Date getPremiere() {
        return premiere;
    }

    public void setPremiere(Date premiere) {
        this.premiere = premiere;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
