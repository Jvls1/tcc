package com.joao.tcc.services;

import com.joao.tcc.entities.Organization;
import com.joao.tcc.model.OrganizationDTO;
import com.joao.tcc.model.UserOrganizationDTO;
import com.joao.tcc.repositories.IOrganizationRepository;
import com.joao.tcc.repositories.IUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OrganizationService {

    private final IOrganizationRepository iOrganizationRepository;
    private final IUserRepository iUserRepository;

    public Long create(OrganizationDTO organizationDTO) {
        var organization = new Organization();
        organization.setName(organizationDTO.getName());
        organization.setDescription(organizationDTO.getDescription());
        organization.setActive(organizationDTO.isActive());
        return iOrganizationRepository.save(organization).getId();
    }

    public OrganizationDTO getById(Long id) {
        return iOrganizationRepository.findById(id).map(organization -> new OrganizationDTO(organization.getId(), organization.getName(), organization.getDescription(), organization.isActive())).orElseThrow();
    }

    public void addUser(Long organizationId, Long userId) {
        var organization = iOrganizationRepository.findById(organizationId).orElseThrow();
        var user = iUserRepository.findById(userId).orElseThrow();
        organization.getUsers().add(user);
        iOrganizationRepository.save(organization);
    }

    public void removeUser(Long organizationId, Long userId) {
        var organization = iOrganizationRepository.findById(organizationId).orElseThrow();
        var user = iUserRepository.findById(userId).orElseThrow();
        organization.getUsers().remove(user);
        iOrganizationRepository.save(organization);
    }

    public List<OrganizationDTO> list() {
        //TODO: adicionar filtro de ativos
        return iOrganizationRepository.findAll().stream().map(organization -> new OrganizationDTO(organization.getId(), organization.getName(), organization.getDescription(), organization.isActive())).toList();
    }

    public List<UserOrganizationDTO> listUsersById(Long id) {
        var organization = iOrganizationRepository.findById(id).orElseThrow();
        return organization.getUsers().stream().map(user -> new UserOrganizationDTO(user.getId(), user.getName(), user.getEmail())).toList();
    }
}
