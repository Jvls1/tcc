package com.joao.tcc.services;

import com.joao.tcc.entities.Opportunity;
import com.joao.tcc.model.*;
import com.joao.tcc.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OpportunityService {

    private final IVoluntaryRepository iVoluntaryRepository;
    private final IOpportunityRepository iOpportunityRepository;
    private final IOrganizationRepository iOrganizationRepository;
    private final IUserRepository iUserRepository;

    public Long create(OpportunityDTO opportunityDTO) {
        var organization = iOrganizationRepository.findById(opportunityDTO.getOrganizationId()).orElseThrow();
        var opportunity = new Opportunity();
        opportunity.setName(opportunityDTO.getName());
        opportunity.setDescription(opportunityDTO.getDescription());
        opportunity.setEventDate(opportunityDTO.getEventDate());
        opportunity.setActive(opportunityDTO.isActive());
        opportunity.setOpen(opportunityDTO.isOpen());
        opportunity.setOrganization(organization);
        return iOpportunityRepository.save(opportunity).getId();
    }

    public OpportunityDetailsDTO getById(Long id) {
        return iOpportunityRepository.findById(id).map(opportunity -> new OpportunityDetailsDTO(opportunity.getId(), opportunity.getName(), opportunity.getDescription(), opportunity.getVoluntariesCount(), opportunity.getEventDate(), opportunity.isOpen(), opportunity.getOrganization().getName())).orElseThrow();
    }

    public List<OpportunityDTO> list() {
        //TODO: adicionar filtro de ativos
        return iOpportunityRepository.findAll().stream().map(opportunity -> new OpportunityDTO(opportunity.getId(), opportunity.getName(), opportunity.getDescription(), opportunity.getVoluntariesCount(), opportunity.getEventDate(), opportunity.isActive(), opportunity.isOpen(), opportunity.getOrganization().getId())).collect(Collectors.toList());
    }

    public List<OpportunityDetailsDTO> listByVoluntaryId(Long id) {
        var voluntary = iVoluntaryRepository.findById(id).orElseThrow();
        return voluntary.getOpportunities().stream().map(opportunity -> new OpportunityDetailsDTO(opportunity.getId(), opportunity.getName(), opportunity.getDescription(), opportunity.getVoluntariesCount(), opportunity.getEventDate(), opportunity.isOpen(), opportunity.getOrganization().getName())).toList();
    }

    public List<OpportunityDetailsDTO> listByUserId(Long userId) {
        var user = iUserRepository.findById(userId).orElseThrow();
        var voluntary = iVoluntaryRepository.findByEmail(user.getEmail()).orElseThrow();
        return voluntary.getOpportunities().stream().map(opportunity -> new OpportunityDetailsDTO(opportunity.getId(), opportunity.getName(), opportunity.getDescription(), opportunity.getVoluntariesCount(), opportunity.getEventDate(), opportunity.isOpen(), opportunity.getOrganization().getName())).toList();
    }

    public List<VoluntaryNameDTO> listVoluntariesById(Long id) {
        var opportunity = iOpportunityRepository.findById(id).orElseThrow();
        return opportunity.getVoluntaries().stream().map(voluntary -> new VoluntaryNameDTO(voluntary.getName())).toList();
    }

    public void addVoluntary(Long opportunityId, Long voluntaryId) {
        var opportunity = iOpportunityRepository.findById(opportunityId).orElseThrow();
        var voluntary = iVoluntaryRepository.findById(voluntaryId).orElseThrow();
        opportunity.getVoluntaries().add(voluntary);
        opportunity.setVoluntariesCount(opportunity.getVoluntariesCount() + 1);
        iOpportunityRepository.save(opportunity);
    }

    public void removeVoluntary(Long opportunityId, Long voluntaryId) {
        var opportunity = iOpportunityRepository.findById(opportunityId).orElseThrow();
        var voluntary = iVoluntaryRepository.findById(voluntaryId).orElseThrow();
        opportunity.getVoluntaries().remove(voluntary);
        iOpportunityRepository.save(opportunity);
    }
}
