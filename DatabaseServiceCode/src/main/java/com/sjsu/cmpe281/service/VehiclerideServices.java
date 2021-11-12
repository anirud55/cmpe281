package com.sjsu.cmpe281.service;

import java.util.List;
import java.util.Map;

import javax.persistence.TypedQuery;
import com.sjsu.cmpe281.user.model.Vehicleride;



/*
 * Author: Atanu Ghosh
 */

public interface VehiclerideServices
{
    List<Vehicleride> listAll();
    
    Iterable<Vehicleride> getById(String id);

    void delete(String id);

    void saveVehicleride(Vehicleride vehicleride);
    
    TypedQuery<Vehicleride> constructQuery(Map<String, String> customQuery);
    
}
