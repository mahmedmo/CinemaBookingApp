package com.AcmeBuddy.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AcmeBuddy.backend.entities.Receipt;
import com.AcmeBuddy.backend.repositories.IReceiptRepository;

@Service
public class ReceiptService {

    private final IReceiptRepository receiptRepository;

    @Autowired
    public ReceiptService(IReceiptRepository receiptRepository) {
        this.receiptRepository = receiptRepository;
    }

    public Receipt saveReceipt(Receipt receipt) {
        return receiptRepository.save(receipt);
    }
}
