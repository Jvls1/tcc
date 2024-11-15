package com.joao.tcc.repositories;

import com.joao.tcc.entities.Opportunity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOpportunityRepository extends IBaseRepository<Opportunity> {
}
