package com.AcmeBuddy.backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
        name = "SEATMAP",
        uniqueConstraints = @UniqueConstraint(columnNames = {"Num_of_columns", "Num_of_rows"})
)
public class Seatmap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_num")
    private int id;

    @Column(name = "Num_of_columns", nullable = false)
    private int numOfCols;

    @Column(name = "Num_of_rows", nullable = false)
    private int numOfRows;

    public Seatmap() {
    }

    // Constructor
    public Seatmap(int numOfCols, int numOfRows) {
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

    public int getCols() {
        return numOfCols;
    }

    public void setCols(int cols) {
        this.numOfCols = cols;
    }

    public int getRows() {
        return numOfRows;
    }

    public void setRows(int rows) {
        this.numOfRows = rows;
    }
}
