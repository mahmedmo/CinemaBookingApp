package com.AcmeBuddy.backend.DTO;

public class ValidateResponseDTO {

    private boolean isValid;
    private Long userId;

    // Constructors
    public ValidateResponseDTO() {
    }

    public ValidateResponseDTO(boolean isValid, Long userId) {
        this.isValid = isValid;
        this.userId = userId;
    }

    // Getters and Setters
    public boolean isValid() {
        return isValid;
    }

    public void setValid(boolean isValid) {
        this.isValid = isValid;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
