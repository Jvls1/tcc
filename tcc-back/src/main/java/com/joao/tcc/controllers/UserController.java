package com.joao.tcc.controllers;

import com.joao.tcc.entities.User;
import com.joao.tcc.helpers.HTTPHelper;
import com.joao.tcc.model.LoginResponseDTO;
import com.joao.tcc.model.UserDTO;
import com.joao.tcc.model.UserOrganizationDTO;
import com.joao.tcc.services.AuthService;
import com.joao.tcc.services.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<UserOrganizationDTO>> list() {
        return ResponseEntity.ok(userService.list());
    }

}
