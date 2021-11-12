package com.sjsu.cmpe281.user.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name= "vehicledetails")
@Entity
public class Vehicle {

	

	@Id
	private String vid;
	private String email;
	private String vcolor;
	private String vmake;
	private String vmodel;
	private int vmileage;
	private int vpassengerspace;
	private String vservicestatus;
	private String vcurrentstatus;
	private String location;
	private String roadservice;
	
	
	public String getVid() {
		return vid;
	}
	public void setVid(String vid) {
		this.vid = vid;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getVcolor() {
		return vcolor;
	}
	public void setVcolor(String vcolor) {
		this.vcolor = vcolor;
	}
	public String getVmake() {
		return vmake;
	}
	public void setVmake(String vmake) {
		this.vmake = vmake;
	}
	public String getVmodel() {
		return vmodel;
	}
	public void setVmodel(String vmodel) {
		this.vmodel = vmodel;
	}
	public int getVmileage() {
		return vmileage;
	}
	public void setVmileage(int vmileage) {
		this.vmileage = vmileage;
	}
	public int getVpassengerspace() {
		return vpassengerspace;
	}
	public void setVpassengerspace(int vpassengerspace) {
		this.vpassengerspace = vpassengerspace;
	}
	public String getVservicestatus() {
		return vservicestatus;
	}
	public void setVservicestatus(String vservicestatus) {
		this.vservicestatus = vservicestatus;
	}
	public String getVcurrentstatus() {
		return vcurrentstatus;
	}
	public void setVcurrentstatus(String vcurrentstatus) {
		this.vcurrentstatus = vcurrentstatus;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getRoadservice() {
		return roadservice;
	}
	public void setRoadservice(String roadservice) {
		this.roadservice = roadservice;
	}

    
    
	

	
}
