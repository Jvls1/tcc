package com.joao.tcc.services;

import com.joao.tcc.entities.User;
import com.joao.tcc.entities.Voluntary;
import com.joao.tcc.model.*;
import com.joao.tcc.repositories.IUserRepository;
import com.joao.tcc.repositories.IVoluntaryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class AuthService {

    private final IUserRepository iUserRepository;
    private final IVoluntaryRepository iVoluntaryRepository;

    public Long userSignUp(UserDTO userDTO) {
        var user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setActive(userDTO.isActive());
        return iUserRepository.save(user).getId();
    }

    public LoginResponseDTO userLogin(LoginDTO loginDTO) {
        var user = iUserRepository.findByEmail(loginDTO.getEmail()).orElseThrow();
        if (!Objects.equals(user.getPassword(), loginDTO.getPassword())) {
            throw new RuntimeException("Email ou senha incorretos.");
        }
        var voluntaryId = iVoluntaryRepository.findByEmail(user.getEmail()).orElseThrow().getId();
        List<LoginOrganizationsDTO> organizations = user.getOrganizations().stream().map(organization -> new LoginOrganizationsDTO(organization.getId(), organization.getName())).toList();
        return new LoginResponseDTO(user.getId(), voluntaryId, organizations, user.isAdmin());
    }

    public Long voluntarySignUp(VoluntaryDTO voluntaryDTO) {
        Voluntary voluntary = new Voluntary();
        voluntary.setName(voluntaryDTO.getName());
        voluntary.setActive(voluntaryDTO.isActive());
        voluntary.setEmail(voluntaryDTO.getEmail());
        voluntary.setPassword(voluntaryDTO.getPassword());
        return iVoluntaryRepository.save(voluntary).getId();
    }

    public LoginResponseVoluntaryDTO voluntaryLogin(LoginDTO loginDTO) {
        var voluntary = iVoluntaryRepository.findByEmail(loginDTO.getEmail()).orElseThrow();
        if (!Objects.equals(voluntary.getPassword(), loginDTO.getPassword())) {
            throw new RuntimeException("Email ou senha incorretos.");
        }
        return new LoginResponseVoluntaryDTO(voluntary.getId());
    }
}
