package com.joao.tcc.controllers;

import com.joao.tcc.model.InterestDTO;
import com.joao.tcc.services.InterestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/interests")
@RequiredArgsConstructor
public class InterestController {

    private final InterestService interestService;

    //create (admin)
    //update (admin)
    //delete (admin)

    @PostMapping
    public ResponseEntity<String> create(@RequestBody InterestDTO interestDTO) {
        interestService.create(interestDTO);
        return ResponseEntity.ok("Created");
    }
}
