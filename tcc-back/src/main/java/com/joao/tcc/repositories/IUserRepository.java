package com.joao.tcc.repositories;

import com.joao.tcc.entities.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends IBaseRepository<User> {

    Optional<User> findByEmail(String email);
}
