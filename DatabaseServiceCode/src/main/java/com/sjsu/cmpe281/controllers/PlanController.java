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

import com.sjsu.cmpe281.repositories.PlanRepository;
import com.sjsu.cmpe281.service.PlanServices;
import com.sjsu.cmpe281.user.model.Plan;
import com.sjsu.cmpe281.user.model.User;


/*
 * Author: Atanu Ghosh
 */

@Repository
@RestController
public class PlanController {
	private PlanServices planServices;
	@Autowired
	EntityManager em;

	@Autowired
	PlanRepository planRepository;

	@Autowired
	public void setPlanService(PlanServices planService) {
		this.planServices = planService;
	}

	/*
	 * Shows all plans
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/plan/list")
	public List<Plan> listPlans(Model model){

		ArrayList<Plan> listOfPlan = new ArrayList<Plan>();

		model.addAttribute("plan", planServices.listAll());

		Map<String, Object> modelMap = model.asMap();
		listOfPlan  = (ArrayList<Plan>) modelMap.get("plan");
		return listOfPlan;
	}

	/*
	 * Shows property by planID
	 */
	@RequestMapping("plan/show/{id}")
	public Plan getPlan(@PathVariable String id, Model model){
		model.addAttribute("plan", planServices.getById(Long.valueOf(id)));
		ArrayList<Plan> listOfPlan = new ArrayList<Plan>();        
		Map<String, Object> modelMap = model.asMap();
		listOfPlan=(ArrayList<Plan>) modelMap.get("plan");
		return listOfPlan.get(0);
	}


	/*
	 * Add new plans to the table
	 */
	@RequestMapping(method = RequestMethod.POST, value = "plan/add")
	public void addPlan(@RequestBody Plan plan)
	{
		planServices.savePlan(plan);
	}


	/*
	 * Update plan status from "Pending" to Approved/Reject
	 */
	@RequestMapping(method = RequestMethod.PUT, value="/plan/update")
	public ResponseEntity<Object> updatePlan(@RequestBody Plan plan)
	{
		
		/*
		Optional<Plan> planOptional = planRepository.findById(plan.getPlanid());
		if (!planOptional.isPresent())
			return ResponseEntity.notFound().build();
		plan.setStatus(plan.getStatus());
		planRepository.save(plan);
		*/
		return ResponseEntity.noContent().build();
		

	}

	/*
	 * Delete property by ID
	 */
	@RequestMapping("/plan/delete/{id}")
	public String delete(@PathVariable String id){
		planServices.delete(Long.valueOf(id));
		return "delete successful";
	}
	
	/*
	 * Search plan by any user parameter
	 */
	@RequestMapping(method = RequestMethod.GET, value = "plan/search")
	public List<Plan> getPlan(@RequestParam Map<String, String> customQuery)
	{
		return planServices.constructQuery(customQuery).getResultList();

	}

}
