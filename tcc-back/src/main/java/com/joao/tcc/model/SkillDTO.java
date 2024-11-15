package com.joao.tcc.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class SkillDTO {
    private Long id;

    private String description;

    private boolean active;
}
