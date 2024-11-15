package com.joao.tcc.controllers;

import com.joao.tcc.model.SkillDTO;
import com.joao.tcc.services.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @PostMapping
    public ResponseEntity<String> create(@RequestBody SkillDTO skillDTO) {
        skillService.create(skillDTO);
        return ResponseEntity.ok("Created");
    }
}
