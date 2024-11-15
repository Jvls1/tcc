package com.joao.tcc.controllers;

import com.joao.tcc.helpers.HTTPHelper;
import com.joao.tcc.model.OpportunityDTO;
import com.joao.tcc.model.OpportunityDetailsDTO;
import com.joao.tcc.model.VoluntaryNameDTO;
import com.joao.tcc.services.OpportunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/opportunities")
@RequiredArgsConstructor
public class OpportunityController {

    private final OpportunityService opportunityService;

    @PostMapping
    public ResponseEntity<URI> create(@RequestBody OpportunityDTO opportunityDTO) {
        var id = opportunityService.create(opportunityDTO);
        return ResponseEntity.created(HTTPHelper.getURIFromEntityId(id)).build();
    }

    @GetMapping
    public ResponseEntity<List<OpportunityDTO>> list() {
        return ResponseEntity.ok(opportunityService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OpportunityDetailsDTO> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(opportunityService.getById(id));
    }

    @GetMapping("/{id}/users")
    public ResponseEntity<List<VoluntaryNameDTO>> listVoluntariesByOpportunityId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(opportunityService.listVoluntariesById(id));
    }

//    @GetMapping("/users/{voluntaryId}")
//    public ResponseEntity<List<OpportunityDetailsDTO>> listById(@PathVariable("voluntaryId") Long voluntaryId) {
//        return ResponseEntity.ok(opportunityService.listById(voluntaryId));
//    }

    @GetMapping("/voluntaries/{voluntaryId}")
    public ResponseEntity<List<OpportunityDetailsDTO>> listByVoluntaryId(@PathVariable("voluntaryId") Long voluntaryId) {
        return ResponseEntity.ok(opportunityService.listByVoluntaryId(voluntaryId));
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<OpportunityDetailsDTO>> listByUserId(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(opportunityService.listByUserId(userId));
    }

    @PostMapping("/{id}/voluntaries/{voluntaryId}")
    public ResponseEntity<String> addVoluntary(@PathVariable("id") Long id, @PathVariable("voluntaryId") Long voluntaryId) {
        opportunityService.addVoluntary(id, voluntaryId);
        return ResponseEntity.ok("Added");
    }

    @DeleteMapping("/{id}/voluntaries/{voluntaryId}")
    public ResponseEntity<String> removeVoluntary(@PathVariable("id") Long id, @PathVariable("voluntaryId") Long voluntaryId) {
        opportunityService.removeVoluntary(id, voluntaryId);
        return ResponseEntity.noContent().build();
    }
}
