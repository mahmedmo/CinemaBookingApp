package com.AcmeBuddy.backend.DTO;

import java.sql.Date;

public class MovieDTO {

    private Integer id;
    private String title;
    private String image;
    private String runtime;
    private Date premiere;
    private String details;

    // Default constructor
    public MovieDTO() {
    }

    // Parameterized constructor
    public MovieDTO(Integer id, String title, String image, String runtime, Date premiere, String details) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.runtime = runtime;
        this.premiere = premiere;
        this.details = details;
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
