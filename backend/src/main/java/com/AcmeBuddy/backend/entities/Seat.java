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
@Table(name = "SEAT") // Maps to the SEAT table in the database
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_num") // Maps to Id_num in SEAT table
    private Integer id;

    @Column(name = "Row_num", nullable = false) // Maps to Row_num in SEAT table
    private int row;

    @Column(name = "Column_num", nullable = false) // Maps to Column_num in SEAT table
    private int column;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Seatmap_Id", nullable = false) // Foreign key to SEATMAP table
    private Seatmap seatmap;

    // Default constructor
    public Seat() {
    }

    // Constructor
    public Seat(int row, int column, Seatmap seatmap) {
        this.row = row;
        this.column = column;
        this.seatmap = seatmap;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getColumn() {
        return column;
    }

    public void setColumn(int column) {
        this.column = column;
    }

    public Seatmap getSeatmap() {
        return seatmap;
    }

    public void setSeatmap(Seatmap seatmap) {
        this.seatmap = seatmap;
    }
}
