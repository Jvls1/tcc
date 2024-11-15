package com.joao.tcc.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class InterestDTO {
    private Long id;

    private String description;

    private boolean active;
}
