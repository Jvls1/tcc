package com.joao.tcc.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Opportunity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "voluntaries_count", nullable = false)
    private int voluntariesCount;

    @Column(name = "event_date", nullable = false)
    private LocalDateTime eventDate;

    @Column(name = "active", nullable = false)
    private boolean active;

    @Column(name = "open", nullable = false)
    private boolean open;

    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;

    @ManyToMany
    @JoinTable(
            name = "opportunity_voluntary",
            joinColumns = @JoinColumn(name = "opportunity_id"),
            inverseJoinColumns = @JoinColumn(name = "voluntary_id")
    )
    private List<Voluntary> voluntaries;
}
