package com.AcmeBuddy.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.AcmeBuddy.backend.entities.Seat;

@Repository
public interface ISeatRepository extends JpaRepository<Seat, Long> {

    List<Seat> findBySeatmapId(int seatmapId);
}
