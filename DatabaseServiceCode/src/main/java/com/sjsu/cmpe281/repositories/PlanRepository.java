package com.sjsu.cmpe281.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.sjsu.cmpe281.user.model.Plan;


/*
 * Author: Atanu Ghosh
 */

public interface PlanRepository extends CrudRepository<Plan, Long>, JpaRepository<Plan, Long>{
}
