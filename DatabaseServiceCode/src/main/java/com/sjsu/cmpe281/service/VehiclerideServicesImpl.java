package com.sjsu.cmpe281.service;
import java.util.ArrayList;
import java.util.HashSet;
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

import com.sjsu.cmpe281.repositories.VehicleRepository;
import com.sjsu.cmpe281.repositories.VehiclerideRepository;
import com.sjsu.cmpe281.user.model.User;
import com.sjsu.cmpe281.user.model.Vehicle;
import com.sjsu.cmpe281.user.model.Vehicleride;
import com.sjsu.cmpe281.user.model.VehicleStatus;



/*
 * Author: Atanu Ghosh
 */

@Service
public class VehiclerideServicesImpl implements VehiclerideServices {

    private VehiclerideRepository vehiclerideRepository;

    @Autowired
    EntityManager em;
    
    @Autowired
    public VehiclerideServicesImpl(VehiclerideRepository vehiclerideRepository) {
        this.vehiclerideRepository = vehiclerideRepository;
    }
    /*
     * Service method to list all vehiclesride
     */
    @Override
    public List<Vehicleride> listAll() {
        List<Vehicleride> vehiclesride = new ArrayList<>();
        vehiclerideRepository.findAll().forEach(vehiclesride::add);
        return vehiclesride;
    }

    /*
     * Service method to list vehicleride by id
     */
    @Override
    public Iterable<Vehicleride> getById(String id) {
    	
        List <String> ids = new ArrayList<String>();
        ((ArrayList<String>) ids).add(id);
		return vehiclerideRepository.findAllById(ids);
    }

   
    /*
     * Service method to save new vehiclesride. This method is to be used for new vehicleride registration.
     */
	@Override
	public void saveVehicleride(Vehicleride vehicleride) {
		// TODO Auto-generated method stub
		try {
		Vehicleride savedVehicle=vehiclerideRepository.save(vehicleride);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	/*
	 * Service method to delete vehiclesride, when Administrator wants to delete any vehicleride.
	 */
    @Override
    public void delete(String id) {
        vehiclerideRepository.deleteById(id);

    }
    
    
    /*
	 * Service method to search vehicleride using any vehicleride parameters.
	 */
	@Override
	public TypedQuery<Vehicleride> constructQuery(Map<String, String> customQuery) {
		CriteriaBuilder cb = null;
		try {
			cb = em.getCriteriaBuilder();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		CriteriaQuery<Vehicleride> cq = cb.createQuery(Vehicleride.class);
		Root<Vehicleride> vehicleride = cq.from(Vehicleride.class);
		Predicate existingpredicate = null;
		int predicateCount=0;
		Predicate masterPredicate=null;

		try {

			for (Map.Entry<String,String> entry : customQuery.entrySet())  
			{
				if(vehicleride.get(entry.getKey().toString()) != null)
				{
					
					//Query for range values with comma(,) as delimiter
					if(entry.getValue().contains(","))
					{
						int minRange=Integer.parseInt(customQuery.get(entry.getKey().toString()).split(",")[0]);
						int maxRange=Integer.parseInt(customQuery.get(entry.getKey().toString()).split(",")[1]);
						if(predicateCount==0)
						{
							masterPredicate = cb.between(vehicleride.get(entry.getKey().toString()),minRange, maxRange );
						}
						else
						{
							existingpredicate = cb.between(vehicleride.get(entry.getKey().toString()),minRange, maxRange );
							masterPredicate=cb.and(masterPredicate,existingpredicate);
						}
						predicateCount++;
					}
					//Query for equals values
					else
					{
						
						if(predicateCount==0)
						{
							masterPredicate = cb.equal(vehicleride.get(entry.getKey().toString()), customQuery.get(entry.getKey().toString()));
						}
						else
						{
							existingpredicate = cb.equal(vehicleride.get(entry.getKey().toString()), customQuery.get(entry.getKey().toString()));
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
		TypedQuery<Vehicleride> query = em.createQuery(cq);
		return query;
	}
	

    
 
	

}
