package com.AcmeBuddy.backend.DTO;

public class RegisterUserDTO {

    private String email;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String cardNumber;
    private String expiry;
    private String cvv;
    private String password;

    public RegisterUserDTO() {
    }

    public RegisterUserDTO(String email, String street, String city, String state, String zipCode, String cardNumber, String expiry, String cvv, String password) {
        this.email = email;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.cardNumber = cardNumber;
        this.expiry = expiry;
        this.cvv = cvv;
        this.password = password;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getExpiry() {
        return expiry;
    }

    public void setExpiry(String expiry) {
        this.expiry = expiry;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
