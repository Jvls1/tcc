package com.joao.tcc.controllers;

import com.joao.tcc.helpers.HTTPHelper;
import com.joao.tcc.model.*;
import com.joao.tcc.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signUp")
    public ResponseEntity<Object> create(@RequestBody VoluntaryDTO voluntaryDTO) {
        var id = authService.voluntarySignUp(voluntaryDTO);
        return ResponseEntity.created(HTTPHelper.getURIFromEntityId(id)).build();
    }

    @PostMapping("/signIn")
    public ResponseEntity<LoginResponseVoluntaryDTO> voluntaryLogin(@RequestBody LoginDTO loginDTO) {
        LoginResponseVoluntaryDTO loginResponseDTO = authService.voluntaryLogin(loginDTO);
        return ResponseEntity.ok(loginResponseDTO);
    }

    @PostMapping("/users/signUp")
    public ResponseEntity<URI> create(@RequestBody UserDTO userDTO) {
        var id = authService.userSignUp(userDTO);
        return ResponseEntity.created(HTTPHelper.getURIFromEntityId(id)).build();
    }

    @PostMapping("/users/signIn")
    public ResponseEntity<LoginResponseDTO> userLogin(@RequestBody LoginDTO loginDTO) {
        LoginResponseDTO loginResponseDTO = authService.userLogin(loginDTO);
        return ResponseEntity.ok(loginResponseDTO);
    }
}
