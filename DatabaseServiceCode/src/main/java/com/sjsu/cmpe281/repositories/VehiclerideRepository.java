package com.sjsu.cmpe281.repositories;

import org.springframework.data.repository.CrudRepository;

import com.sjsu.cmpe281.user.model.Vehicleride;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface VehiclerideRepository extends CrudRepository<Vehicleride, String>, JpaRepository<Vehicleride, String> {
}