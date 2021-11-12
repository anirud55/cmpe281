package com.sjsu.cmpe281.repositories;

import org.springframework.data.repository.CrudRepository;

import com.sjsu.cmpe281.user.model.Vehicle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface VehicleRepository extends CrudRepository<Vehicle, String>, JpaRepository<Vehicle, String> {
}