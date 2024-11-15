package com.joao.tcc.services;

import com.joao.tcc.entities.Skill;
import com.joao.tcc.model.SkillDTO;
import com.joao.tcc.repositories.ISkillRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SkillService {

    private final ISkillRepository iSkillRepository;

    public Long create(SkillDTO skillDTO) {
        Skill skill = new Skill();
        skill.setDescription(skillDTO.getDescription());
        skill.setActive(skillDTO.isActive());
        return iSkillRepository.save(skill).getId();
    }

//    public void update(Long voluntaryId, UpdateVoluntaryDTO updateVoluntaryDTO) {
//        Optional<Skill> skillOpt = iSkillRepository.findById(voluntaryId);
//        var skill = skillOpt.orElseThrow();
//        skill.setActive(updateVoluntaryDTO.isActive());
//        iSkillRepository.save(skill);
//    }
}
