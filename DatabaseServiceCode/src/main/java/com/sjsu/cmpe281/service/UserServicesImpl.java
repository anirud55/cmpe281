package com.sjsu.cmpe281.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

import com.sjsu.cmpe281.repositories.UserRepository;
import com.sjsu.cmpe281.user.model.User;
import com.sjsu.cmpe281.user.model.Vehicle;


/*
 * Author: Atanu Ghosh
 */

@Service
public class UserServicesImpl implements UserServices {

    private UserRepository userRepository;

    @Autowired
    EntityManager em;
    
    @Autowired
    public UserServicesImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    /*
     * Service method to list all users
     */
    @Override
    public List<User> listAll() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    /*
     * Service method to list user by id
     */
    @Override
    public Iterable<User> getById(Long id) {
    	
        List <Long> ids = new ArrayList<Long>();
        ((ArrayList<Long>) ids).add(id);
		return userRepository.findAllById(ids);
    }

   
    /*
     * Service method to save new users. This method is to be used for new user registration.
     */
	@Override
	public List<User> saveUser(User user) {
		// TODO Auto-generated method stub
		 List<User> users = new ArrayList<>();
		try {
			User savedUser=userRepository.save(user);
			users.add(savedUser);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return users;
		
	}

	/*
	 * Service method to delete users, when Administrator wants to delete any user.
	 */
    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);

    }

    
    /*
	 * Service method to search user using any user parameters.
	 */
	@Override
	public TypedQuery<User> constructQuery(Map<String, String> customQuery) {
		CriteriaBuilder cb = null;
		try {
			cb = em.getCriteriaBuilder();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		CriteriaQuery<User> cq = cb.createQuery(User.class);
		Root<User> user = cq.from(User.class);
		Predicate existingpredicate = null;
		int predicateCount=0;
		Predicate masterPredicate=null;

		try {

			for (Map.Entry<String,String> entry : customQuery.entrySet())  
			{
				if(user.get(entry.getKey().toString()) != null)
				{
					
					//Query for range values with comma(,) as delimiter
					if(entry.getValue().contains(","))
					{
						int minRange=Integer.parseInt(customQuery.get(entry.getKey().toString()).split(",")[0]);
						int maxRange=Integer.parseInt(customQuery.get(entry.getKey().toString()).split(",")[1]);
						if(predicateCount==0)
						{
							masterPredicate = cb.between(user.get(entry.getKey().toString()),minRange, maxRange );
						}
						else
						{
							existingpredicate = cb.between(user.get(entry.getKey().toString()),minRange, maxRange );
							masterPredicate=cb.and(masterPredicate,existingpredicate);
						}
						predicateCount++;
					}
					//Query for equals values
					else
					{
						
						if(predicateCount==0)
						{
							masterPredicate = cb.equal(user.get(entry.getKey().toString()), customQuery.get(entry.getKey().toString()));
						}
						else
						{
							existingpredicate = cb.equal(user.get(entry.getKey().toString()), customQuery.get(entry.getKey().toString()));
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
		TypedQuery<User> query = em.createQuery(cq);
		return query;
	}
	
	
	@Override
	public int numberOfUsers() {
		List<User> user = new ArrayList<>();
		HashSet<String> userAV = new HashSet<String>();
        userRepository.findAll().forEach(user::add);
        
        for (int i = 0; i < user.size(); i++) {
        	
            userAV.add(user.get(i).getEmail());
        }
        
        
		return userAV.size();
	}

}
