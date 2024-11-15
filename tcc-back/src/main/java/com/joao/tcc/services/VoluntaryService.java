package com.joao.tcc.services;

import com.joao.tcc.entities.Interest;
import com.joao.tcc.entities.Skill;
import com.joao.tcc.entities.Voluntary;
import com.joao.tcc.model.LoginResponseDTO;
import com.joao.tcc.model.LoginDTO;
import com.joao.tcc.model.VoluntaryDTO;
import com.joao.tcc.model.VoluntaryProfileDTO;
import com.joao.tcc.repositories.IInterestRepository;
import com.joao.tcc.repositories.ISkillRepository;
import com.joao.tcc.repositories.IVoluntaryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class VoluntaryService {
    private final IVoluntaryRepository iVoluntaryRepository;
    private final IInterestRepository iInterestRepository;
    private final ISkillRepository iSkillRepository;

    public VoluntaryProfileDTO getById(Long id) {
        return iVoluntaryRepository.findById(id).map(voluntary -> new VoluntaryProfileDTO(voluntary.getId(), voluntary.getName(), voluntary.getEmail())).orElseThrow();
    }

    public void update(Long voluntaryId, VoluntaryDTO voluntaryDTO) {
        var voluntary = iVoluntaryRepository.findById(voluntaryId).orElseThrow();
        voluntary.setName(voluntaryDTO.getName());
        iVoluntaryRepository.save(voluntary);
    }

    public void addInterest(Long voluntaryId, Long interestId) {
        var voluntary = iVoluntaryRepository.findById(voluntaryId).orElseThrow();
        Interest interest = iInterestRepository.findById(interestId).orElseThrow();
        voluntary.getInterests().add(interest);
        iVoluntaryRepository.save(voluntary);
    }

    public void addSkill(Long voluntaryId, Long skillId) {
        var voluntary = iVoluntaryRepository.findById(voluntaryId).orElseThrow();
        Skill skill = iSkillRepository.findById(skillId).orElseThrow();
        voluntary.getSkills().add(skill);
        iVoluntaryRepository.save(voluntary);
    }
}
