package com.AcmeBuddy.backend.DTO;

public class SeatmapDTO {

    private int id;
    private int numOfCols;
    private int numOfRows;

    // Default constructor
    public SeatmapDTO() {
    }

    public SeatmapDTO(int id, int numOfCols, int numOfRows) {
        this.id = id;
        this.numOfCols = numOfCols;
        this.numOfRows = numOfRows;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNumOfCols() {
        return numOfCols;
    }

    public void setNumOfCols(int numOfCols) {
        this.numOfCols = numOfCols;
    }

    public int getNumOfRows() {
        return numOfRows;
    }

    public void setNumOfRows(int numOfRows) {
        this.numOfRows = numOfRows;
    }
}
