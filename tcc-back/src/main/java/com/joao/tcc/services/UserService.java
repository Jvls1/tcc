package com.joao.tcc.services;

import com.joao.tcc.entities.User;
import com.joao.tcc.entities.Voluntary;
import com.joao.tcc.model.LoginOrganizationsDTO;
import com.joao.tcc.model.LoginResponseDTO;
import com.joao.tcc.model.UserDTO;
import com.joao.tcc.model.UserOrganizationDTO;
import com.joao.tcc.repositories.IUserRepository;
import com.joao.tcc.repositories.IVoluntaryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {

    private final IUserRepository iUserRepository;

    public User getById(Long id) {
        return iUserRepository.findById(id).orElseThrow();
    }

    public List<UserOrganizationDTO> list() {
        return iUserRepository.findAll().stream().map(user -> new UserOrganizationDTO(user.getId(), user.getName(), user.getEmail())).toList();
    }
}
