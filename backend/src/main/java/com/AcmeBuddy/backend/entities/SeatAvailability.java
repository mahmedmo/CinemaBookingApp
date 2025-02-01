package com.AcmeBuddy.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "SEAT_AVAILABILITY") // Maps to the SEAT_AVAILABILITY table
public class SeatAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_num") // Maps to Id_num in SEAT_AVAILABILITY table
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Showtime_Id", nullable = false) // Foreign key to SHOWTIME
    private Showtime showtime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Seat_Id", nullable = false) // Foreign key to SEAT
    private Seat seat;

    @Column(name = "State", nullable = false, columnDefinition = "INT DEFAULT 0") // Maps to State in SEAT_AVAILABILITY table
    private boolean reserved;

    // Default constructor
    public SeatAvailability() {}

    // Constructor
    public SeatAvailability(Showtime showtime, Seat seat) {
        this.showtime = showtime;
        this.seat = seat;
        this.reserved = false; // Default to available
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Showtime getShowtime() {
        return showtime;
    }

    public void setShowtime(Showtime showtime) {
        this.showtime = showtime;
    }

    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }

    public boolean isReserved() {
        return reserved;
    }

    public void reserve() {
        this.reserved = true;
    }

    public void unreserve() {
        this.reserved = false;
    }
}