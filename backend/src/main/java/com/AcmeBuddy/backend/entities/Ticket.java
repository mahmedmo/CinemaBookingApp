package com.AcmeBuddy.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "TICKET")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_num")
    private Integer id;

    @Column(name = "User_Id", nullable = false) // Foreign key to USERS table
    private Integer userId;

    @Column(name = "Showtime_Id", nullable = false) // Foreign key to SHOWTIME table
    private Integer showtimeId;

    @Column(name = "Seat_Id", nullable = false) // Foreign key to SEAT table
    private Integer seatId;

    @Column(name = "State", nullable = false, columnDefinition = "INT DEFAULT 0") // 0: Valid, 1: Invalid
    private int state;

    @Column(name = "Age", nullable = false) // 0: Adult, 1: Child
    private int age;

    // Default constructor
    public Ticket() {
    }

    // Constructor
    public Ticket(Integer userId, Integer showtimeId, Integer seatId, int state, int age) {
        this.userId = userId;
        this.showtimeId = showtimeId;
        this.seatId = seatId;
        this.state = state;
        this.age = age;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(Integer showtimeId) {
        this.showtimeId = showtimeId;
    }

    public Integer getSeatId() {
        return seatId;
    }

    public void setSeatId(Integer seatId) {
        this.seatId = seatId;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
