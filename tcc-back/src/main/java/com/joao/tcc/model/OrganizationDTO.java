package com.joao.tcc.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationDTO {
    private Long id;

    private String name;

    private String description;

    private boolean active;
}
