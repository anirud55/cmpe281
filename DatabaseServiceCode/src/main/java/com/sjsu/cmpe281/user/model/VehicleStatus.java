package com.sjsu.cmpe281.user.model;

public class VehicleStatus {
	
	
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	private String state;
	private int count;

}
