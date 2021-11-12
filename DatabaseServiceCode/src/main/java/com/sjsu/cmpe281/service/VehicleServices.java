package com.sjsu.cmpe281.service;

import java.util.List;
import java.util.Map;

import javax.persistence.TypedQuery;

import com.sjsu.cmpe281.user.model.User;
import com.sjsu.cmpe281.user.model.Vehicle;
import com.sjsu.cmpe281.user.model.VehicleStatus;



/*
 * Author: Atanu Ghosh
 */

public interface VehicleServices
{
    List<Vehicle> listAll();
    
    Iterable<Vehicle> getById(String id);

    void delete(String id);

    void saveVehicle(Vehicle vehicle);
    
    TypedQuery<Vehicle> constructQuery(Map<String, String> customQuery);
    
    int numberOfAVs();
    
    List<VehicleStatus> getVehicleStatus();

}
