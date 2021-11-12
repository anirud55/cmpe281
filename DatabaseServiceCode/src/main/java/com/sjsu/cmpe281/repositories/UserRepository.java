package com.sjsu.cmpe281.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.sjsu.cmpe281.user.model.User;

/*
 * Author: Atanu Ghosh
 */

public interface UserRepository extends CrudRepository<User, Long>, JpaRepository<User, Long>{
}
