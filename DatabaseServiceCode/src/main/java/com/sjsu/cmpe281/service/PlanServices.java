package com.sjsu.cmpe281.service;

import java.util.List;
import java.util.Map;

import javax.persistence.TypedQuery;

import com.sjsu.cmpe281.user.model.Plan;
import com.sjsu.cmpe281.user.model.User;



/*
 * Author: Atanu Ghosh
 */

public interface PlanServices
{
    List<Plan> listAll();
    
    Iterable<Plan> getById(Long id);

    void delete(Long id);

    void savePlan(Plan plan);
    
    TypedQuery<Plan> constructQuery(Map<String, String> customQuery);

}
