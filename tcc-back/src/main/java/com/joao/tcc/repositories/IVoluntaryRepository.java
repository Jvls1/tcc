package com.joao.tcc.repositories;

import com.joao.tcc.entities.User;
import com.joao.tcc.entities.Voluntary;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IVoluntaryRepository extends IBaseRepository<Voluntary> {
    Optional<Voluntary> findByEmail(String email);
}
