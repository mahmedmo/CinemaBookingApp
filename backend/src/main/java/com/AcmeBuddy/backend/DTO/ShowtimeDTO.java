package com.AcmeBuddy.backend.DTO;

import java.time.LocalDateTime;

public class ShowtimeDTO {

    private int id;
    private LocalDateTime dateTime;

    // Default constructor
    public ShowtimeDTO() {
    }

    // Parameterized constructor
    public ShowtimeDTO(int id, LocalDateTime dateTime) {
        this.id = id;
        this.dateTime = dateTime;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

}
