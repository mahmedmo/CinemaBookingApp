package com.AcmeBuddy.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AcmeBuddy.backend.entities.Receipt;
import com.AcmeBuddy.backend.services.ReceiptService;

@RestController
@RequestMapping("/api/receipts")
@CrossOrigin(origins = "http://localhost:3000")
public class ReceiptController {

    private final ReceiptService receiptService;

    @Autowired
    public ReceiptController(ReceiptService receiptService) {
        this.receiptService = receiptService;
    }

    @PostMapping
    public ResponseEntity<Receipt> createReceipt(@RequestBody Receipt receipt) {
        Receipt savedReceipt = receiptService.saveReceipt(receipt);
        return new ResponseEntity<>(savedReceipt, HttpStatus.CREATED);
    }

}
