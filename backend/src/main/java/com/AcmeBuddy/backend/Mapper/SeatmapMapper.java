package com.AcmeBuddy.backend.Mapper;

import com.AcmeBuddy.backend.DTO.SeatmapDTO;
import com.AcmeBuddy.backend.entities.Seatmap;

public class SeatmapMapper {

    public static SeatmapDTO toDTO(Seatmap seatmap) {
        return new SeatmapDTO(
                seatmap.getId(),
                seatmap.getCols(),
                seatmap.getRows()
        );
    }

    public static Seatmap toEntity(SeatmapDTO seatmapDTO) {
        Seatmap seatmap = new Seatmap();
        seatmap.setId(seatmapDTO.getId());
        seatmap.setCols(seatmapDTO.getNumOfCols());
        seatmap.setRows(seatmapDTO.getNumOfRows());
        return seatmap;
    }
}
