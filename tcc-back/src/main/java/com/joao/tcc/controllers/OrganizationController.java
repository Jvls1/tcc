package com.joao.tcc.controllers;

import com.joao.tcc.model.OrganizationDTO;
import com.joao.tcc.model.UserOrganizationDTO;
import com.joao.tcc.services.OrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/organizations")
@RequiredArgsConstructor
public class OrganizationController {

    private final OrganizationService organizationService;

    @PostMapping
    public ResponseEntity<URI> create(@RequestBody OrganizationDTO organizationDTO) {
        var id = organizationService.create(organizationDTO);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(id)
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrganizationDTO> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(organizationService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<OrganizationDTO>> list() {
        return ResponseEntity.ok(organizationService.list());
    }

    @GetMapping("/{id}/users")
    public ResponseEntity<List<UserOrganizationDTO>> getUsersById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(organizationService.listUsersById(id));
    }

    @PostMapping("/{id}/users/{userId}")
    public ResponseEntity<String> addUser(@PathVariable("id") Long id, @PathVariable("userId") Long userId) {
        organizationService.addUser(id, userId);
        return ResponseEntity.ok("Added");
    }

    @DeleteMapping("/{id}/users/{userId}")
    public ResponseEntity<String> removeUser(@PathVariable("id") Long id, @PathVariable("userId") Long userId) {
        organizationService.removeUser(id, userId);
        return ResponseEntity.ok("Removed");
    }
}
