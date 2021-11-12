package com.sjsu.cmpe281.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sjsu.cmpe281.repositories.VehicleRepository;
import com.sjsu.cmpe281.service.VehicleServices;
import com.sjsu.cmpe281.user.model.User;
import com.sjsu.cmpe281.user.model.Vehicle;
import com.sjsu.cmpe281.user.model.VehicleStatus;

/*
 * Author: Atanu Ghosh
 */

@Repository
@RestController
public class VehicleController {
	private VehicleServices vehicleServices;
	@Autowired
	EntityManager em;

	@Autowired
	VehicleRepository vehicleRepository;

	@Autowired
	public void setVehicleService(VehicleServices vehicleService) {
		this.vehicleServices = vehicleService;
	}

	/*
	 * Shows all vehicles
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/vehicle/list")
	public List<Vehicle> listVehicles(Model model){

		ArrayList<Vehicle> listOfVehicle = new ArrayList<Vehicle>();

		model.addAttribute("vehicle", vehicleServices.listAll());

		Map<String, Object> modelMap = model.asMap();
		listOfVehicle  = (ArrayList<Vehicle>) modelMap.get("vehicle");
		return listOfVehicle;
	}

	/*
	 * Shows property by vehicleID
	 */
	@RequestMapping("vehicle/show/{id}")
	public Vehicle getVehicle(@PathVariable String id, Model model){
		model.addAttribute("vehicle", vehicleServices.getById(String.valueOf(id)));
		ArrayList<Vehicle> listOfVehicle = new ArrayList<Vehicle>();        
		Map<String, Object> modelMap = model.asMap();
		listOfVehicle=(ArrayList<Vehicle>) modelMap.get("vehicle");
		return listOfVehicle.get(0);
	}


	/*
	 * Add new vehicles to the table
	 */
	@RequestMapping(method = RequestMethod.POST, value = "vehicle/add")
	public void addVehicle(@RequestBody Vehicle vehicle)
	{
		vehicleServices.saveVehicle(vehicle);
	}


	/*
	 * Update vehicle status from "Pending" to Approved/Reject
	 */
	@RequestMapping(method = RequestMethod.PUT, value="/vehicle/update")
	public ResponseEntity<Object> updateVehicle(@RequestBody Vehicle vehicle)
	{
		
		/*
		Optional<Vehicle> vehicleOptional = vehicleRepository.findById(vehicle.getVehicleid());
		if (!vehicleOptional.isPresent())
			return ResponseEntity.notFound().build();
		vehicle.setStatus(vehicle.getStatus());
		vehicleRepository.save(vehicle);
		*/
		return ResponseEntity.noContent().build();
		

	}

	/*
	 * Delete property by ID
	 */
	@RequestMapping("/vehicle/delete/{id}")
	public String delete(@PathVariable String id){
		vehicleServices.delete(id);
		return "delete successful";
	}
	
	/*
	 * Search vehicle by any vehicle parameter
	 */
	@RequestMapping(method = RequestMethod.GET, value = "vehicle/search")
	public List<Vehicle> getVehicle(@RequestParam Map<String, String> customQuery)
	{
		return vehicleServices.constructQuery(customQuery).getResultList();

	}
		

	/*
	 * Count of AVs
	 */
	@RequestMapping("/vehicle/numberOfConnectedAVs")
	public int numberOfConnectedAV(){
		return vehicleServices.numberOfAVs();
	}	
	
	

	/*
	 * Count of AV Status
	 */
	@RequestMapping("/vehicle/status")
	public List<VehicleStatus> stausAVs(){
		return vehicleServices.getVehicleStatus();
	}	
	

}
