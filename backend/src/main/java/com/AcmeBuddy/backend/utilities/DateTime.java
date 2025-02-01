package com.AcmeBuddy.backend.utilities;
import java.time.LocalDateTime;

public class DateTime{
    private LocalDateTime dateTime;

    // Constructor
    public DateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    // Getters and Setters
    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
}
