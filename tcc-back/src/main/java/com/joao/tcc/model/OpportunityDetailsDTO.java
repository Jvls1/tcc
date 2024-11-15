package com.joao.tcc.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OpportunityDetailsDTO {
    private Long id;

    private String name;

    private String description;

    private int voluntariesCount;

    private LocalDateTime eventDate;

    private boolean open;

    private String organizationName;
}
