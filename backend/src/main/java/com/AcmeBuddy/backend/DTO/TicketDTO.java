package com.AcmeBuddy.backend.DTO;

public class TicketDTO {

    private Integer id;
    private Integer userId;
    private Integer showtimeId;
    private Integer seatId;
    private int state;
    private int age;

    // Default constructor
    public TicketDTO() {
    }

    // Constructor
    public TicketDTO(Integer id, Integer userId, Integer showtimeId, Integer seatId, int state, int age) {
        this.id = id;
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

    public void setAge(Integer age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }

}
