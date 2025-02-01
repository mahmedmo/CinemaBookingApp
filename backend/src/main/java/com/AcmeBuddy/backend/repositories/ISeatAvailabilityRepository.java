package com.AcmeBuddy.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.AcmeBuddy.backend.entities.SeatAvailability;

@Repository
public interface ISeatAvailabilityRepository extends JpaRepository<SeatAvailability, Long> {

    Optional<SeatAvailability> findBySeatIdAndShowtimeId(long seatId, long showtimeId);
}
