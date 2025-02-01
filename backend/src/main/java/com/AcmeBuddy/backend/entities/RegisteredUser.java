package com.AcmeBuddy.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "REGISTEREDUSERS")
public class RegisteredUser {

    @Id
    @Column(name = "User_Id")
    private Integer id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "User_Id")
    @JsonBackReference
    private User user;

    @Column(name = "Payment_Id", nullable = false)
    private Integer paymentId;

    @Column(name = "Address_Id", nullable = false)
    private Integer addressId;

    @JsonIgnore
    @Column(name = "Pass", nullable = false)
    private String password;

    // Default constructor
    public RegisteredUser() {
    }

    // Constructor with User
    public RegisteredUser(User user, Integer paymentId, Integer addressId, String password) {
        this.user = user;
        this.paymentId = paymentId;
        this.addressId = addressId;
        this.password = password;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Integer paymentId) {
        this.paymentId = paymentId;
    }

    public Integer getAddressId() {
        return addressId;
    }

    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
