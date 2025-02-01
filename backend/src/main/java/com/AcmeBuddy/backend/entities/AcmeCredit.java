package com.AcmeBuddy.backend.entities;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "CREDITS")
public class AcmeCredit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_num")
    private Integer id;

    @Column(name = "User_Id", nullable = true)
    private Integer userId;

    @Column(name = "Credit_Amount", nullable = true)
    private Double creditAmount;

    @Column(name = "Created_On", nullable = true)
    private Timestamp createdOn;

    // Default constructor
    public AcmeCredit() {
    }

    // Constructor
    public AcmeCredit(Double creditAmount, Timestamp createdOn, Integer userId) {
        this.creditAmount = creditAmount;
        this.createdOn = createdOn;
        this.userId = userId;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getCreditAmount() {
        return creditAmount;
    }

    public void setCreditAmount(Double creditAmount) {
        this.creditAmount = creditAmount;
    }

    public Timestamp getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Timestamp createdOn) {
        this.createdOn = createdOn;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
