package com.sjsu.cmpe281.service;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsu.cmpe281.repositories.PlanRepository;
import com.sjsu.cmpe281.user.model.Plan;




/*
 * Author: Atanu Ghosh
 */

@Service
public class PlanServicesImpl implements PlanServices {

    private PlanRepository planRepository;

    @Autowired
    EntityManager em;
    
    @Autowired
    public PlanServicesImpl(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }
    /*
     * Service method to list all plans
     */
    @Override
    public List<Plan> listAll() {
        List<Plan> plans = new ArrayList<>();
        planRepository.findAll().forEach(plans::add);
        return plans;
    }

    /*
     * Service method to list plan by id
     */
    @Override
    public Iterable<Plan> getById(Long id) {
    	
        List <Long> ids = new ArrayList<Long>();
        ((ArrayList<Long>) ids).add(id);
		return planRepository.findAllById(ids);
    }

   
    /*
     * Service method to save new plans. This method is to be used for new plan registration.
     */
	@Override
	public void savePlan(Plan plan) {
		// TODO Auto-generated method stub
		try {
		Plan savedPlan=planRepository.save(plan);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	/*
	 * Service method to delete plans, when Administrator wants to delete any plan.
	 */
    @Override
    public void delete(Long id) {
        planRepository.deleteById(id);

    }
    
    /*
	 * Service method to search plan using any plan parameters.
	 */
	@Override
	public TypedQuery<Plan> constructQuery(Map<String, String> customQuery) {
		CriteriaBuilder cb = null;
		try {
			cb = em.getCriteriaBuilder();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		CriteriaQuery<Plan> cq = cb.createQuery(Plan.class);
		Root<Plan> plan = cq.from(Plan.class);
		Predicate existingpredicate = null;
		int predicateCount=0;
		Predicate masterPredicate=null;

		try {

			for (Map.Entry<String,String> entry : customQuery.entrySet())  
			{
				if(plan.get(entry.getKey().toString()) != null)
				{
					
					//Query for range values with comma(,) as delimiter
					if(entry.getValue().contains(","))
					{
						int minRange=Integer.parseInt(customQuery.get(entry.getKey().toString()).split(",")[0]);
						int maxRange=Integer.parseInt(customQuery.get(entry.getKey().toString()).split(",")[1]);
						if(predicateCount==0)
						{
							masterPredicate = cb.between(plan.get(entry.getKey().toString()),minRange, maxRange );
						}
						else
						{
							existingpredicate = cb.between(plan.get(entry.getKey().toString()),minRange, maxRange );
							masterPredicate=cb.and(masterPredicate,existingpredicate);
						}
						predicateCount++;
					}
					//Query for equals values
					else
					{
						
						if(predicateCount==0)
						{
							masterPredicate = cb.equal(plan.get(entry.getKey().toString()), customQuery.get(entry.getKey().toString()));
						}
						else
						{
							existingpredicate = cb.equal(plan.get(entry.getKey().toString()), customQuery.get(entry.getKey().toString()));
							masterPredicate=cb.and(masterPredicate,existingpredicate);
						}
						predicateCount++;
						//cq.where(predicate);
					}
				}
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		cq.where(masterPredicate);
		TypedQuery<Plan> query = em.createQuery(cq);
		return query;
	}

	
	

}
