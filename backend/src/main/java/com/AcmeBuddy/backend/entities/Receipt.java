package com.AcmeBuddy.backend.entities;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "RECEIPT")
public class Receipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_num")
    private Integer id;

    @Column(name = "Date_placed", nullable = false)
    @JsonProperty("datePlaced")
    private LocalDateTime datePlaced;

    @Column(name = "Cost", nullable = false)
    @JsonProperty("cost")
    private double cost;

    @Column(name = "User_Id", nullable = false) // Foreign key to USERS table
    @JsonProperty("userId")
    private Integer userId;

    @Column(name = "Ticket_Id", nullable = false) // Foreign key to USERS table
    @JsonProperty("ticketId")
    private Integer ticketId;

    // Default constructor
    public Receipt() {
    }

    // Constructor
    public Receipt(LocalDateTime datePlaced, double cost, Integer userId, Integer ticketId) {
        this.datePlaced = datePlaced;
        this.cost = cost;
        this.userId = userId;
        this.ticketId = ticketId;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getDatePlaced() {
        return datePlaced;
    }

    public void setDatePlaced(LocalDateTime datePlaced) {
        this.datePlaced = datePlaced;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public Integer getUser() {
        return userId;
    }

    public void setUser(Integer userId) {
        this.userId = userId;
    }

    public Integer getTicket() {
        return ticketId;
    }

    public void setTicket(Integer ticketId) {
        this.ticketId = ticketId;
    }
}
