package com.AcmeBuddy.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AcmeBuddy.backend.entities.AcmeCredit;
import com.AcmeBuddy.backend.services.CreditService;

@RestController
@RequestMapping("/api/credits")
@CrossOrigin(origins = "http://localhost:3000")
public class CreditController {

    private final CreditService creditService;

    @Autowired
    public CreditController(CreditService creditService) {
        this.creditService = creditService;
    }

    @GetMapping
    public ResponseEntity<List<AcmeCredit>> getAllCredits() {
        return ResponseEntity.ok(creditService.findAllCredits());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AcmeCredit>> getCreditsByUserId(@PathVariable Long userId) {
        List<AcmeCredit> credits = creditService.findCreditsByUserId(userId);
        if (credits.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(credits);
    }

    @PostMapping
    public ResponseEntity<AcmeCredit> createCredit(@RequestBody AcmeCredit credit) {
        return ResponseEntity.ok(creditService.saveCredit(credit));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCredit(@PathVariable Long id) {
        creditService.deleteCreditById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<AcmeCredit> addCredit(@PathVariable Long userId, @RequestBody Double amount) {
        Optional<AcmeCredit> updatedCredit = creditService.addCreditToUser(userId, amount);
        return updatedCredit.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/deduct/{userId}")
    public ResponseEntity<AcmeCredit> deductCredit(@PathVariable Long userId, @RequestBody Double amount) {
        Optional<AcmeCredit> updatedCredit = creditService.deductCreditFromUser(userId, amount);
        return updatedCredit.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
