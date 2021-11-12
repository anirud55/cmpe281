package com.sjsu.cmpe281.user.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name= "vehicleride")
@Entity
public class Vehicleride {

	

	@Id
	private String vdatetime;
	private String vid;
	private String origin;
	private int passengers;
	private String destination;
	private String email;
	
	public String getVdatetime() {
		return vdatetime;
	}
	public void setVdatetime(String vdatetime) {
		this.vdatetime = vdatetime;
	}
	public String getVid() {
		return vid;
	}
	public void setVid(String vid) {
		this.vid = vid;
	}
	public String getOrigin() {
		return origin;
	}
	public void setOrigin(String origin) {
		this.origin = origin;
	}
	public int getPassengers() {
		return passengers;
	}
	public void setPassengers(int passengers) {
		this.passengers = passengers;
	}
	public String getDestination() {
		return destination;
	}
	public void setDestination(String destination) {
		this.destination = destination;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	
	
    
	

	
}
