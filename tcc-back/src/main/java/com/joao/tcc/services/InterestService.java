package com.joao.tcc.services;

import com.joao.tcc.entities.Interest;
import com.joao.tcc.model.InterestDTO;
import com.joao.tcc.repositories.IInterestRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class InterestService {

    private final IInterestRepository iInterestRepository;

    public void create(InterestDTO interestDTO) {
        if(interestDTO == null) {
            throw new RuntimeException("DTO Null");
        }
        var interest = new Interest();
        interest.setDescription(interestDTO.getDescription());
        interest.setActive(interestDTO.isActive());
        iInterestRepository.save(interest);
    }
}
