package com.joao.tcc.controllers;

import com.joao.tcc.entities.Voluntary;
import com.joao.tcc.helpers.HTTPHelper;
import com.joao.tcc.model.LoginResponseDTO;
import com.joao.tcc.model.UserDTO;
import com.joao.tcc.model.VoluntaryDTO;
import com.joao.tcc.model.VoluntaryProfileDTO;
import com.joao.tcc.services.VoluntaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/voluntaries")
@RequiredArgsConstructor
public class VoluntaryController {

    private final VoluntaryService voluntaryService;

    @GetMapping("/{id}")
    public ResponseEntity<VoluntaryProfileDTO> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(voluntaryService.getById(id));
    }

    @PostMapping("/{id}/interests/{interestId}")
    public ResponseEntity<String> addInterest(@PathVariable("id") Long id, @PathVariable("interestId") Long interestId) {
        voluntaryService.addInterest(id, interestId);
        return ResponseEntity.ok("Added");
    }

    @PostMapping("/{id}/skills/{interestId}")
    public ResponseEntity<String> addSkill(@PathVariable("id") Long id, @PathVariable("interestId") Long skillId) {
        voluntaryService.addSkill(id, skillId);
        return ResponseEntity.ok("Added");
    }
}
