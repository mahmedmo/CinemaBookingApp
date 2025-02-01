package com.AcmeBuddy.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AcmeBuddy.backend.entities.AcmeCredit;
import com.AcmeBuddy.backend.repositories.ICreditRepository;

@Service
public class CreditService {

    private final ICreditRepository creditRepository;

    @Autowired
    public CreditService(ICreditRepository creditRepository) {
        this.creditRepository = creditRepository;
    }

    public List<AcmeCredit> findAllCredits() {
        return creditRepository.findAll();
    }

    public Optional<AcmeCredit> findCreditById(Long id) {
        return creditRepository.findById(id);
    }

    public AcmeCredit saveCredit(AcmeCredit credit) {
        return creditRepository.save(credit);
    }

    public void deleteCreditById(Long id) {
        creditRepository.deleteById(id);
    }

    public List<AcmeCredit> findCreditsByUserId(Long userId) {
        return creditRepository.findByUserId(userId);
    }

    public Optional<AcmeCredit> addCreditToUser(Long userId, Double amount) {
        List<AcmeCredit> credits = creditRepository.findByUserId(userId);
        if (credits.isEmpty()) {
            return Optional.empty();
        }

        AcmeCredit userCredit = credits.get(0);
        userCredit.setCreditAmount(userCredit.getCreditAmount() + amount);
        return Optional.of(creditRepository.save(userCredit));
    }

    public Optional<AcmeCredit> deductCreditFromUser(Long userId, Double amount) {
        List<AcmeCredit> credits = creditRepository.findByUserId(userId);
        if (credits.isEmpty()) {
            return Optional.empty();
        }

        AcmeCredit userCredit = credits.get(0);
        double currentAmount = userCredit.getCreditAmount();

        if (currentAmount < amount) {
            throw new IllegalArgumentException("Insufficient credit to deduct.");
        }

        userCredit.setCreditAmount(currentAmount - amount);
        return Optional.of(creditRepository.save(userCredit));
    }
}
