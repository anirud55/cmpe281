# importing required library 
import mysql.connector
  
# connecting to the database 
mydb = mysql.connector.connect(
                     host = "database-1.cdakxaxb4kup.us-east-1.rds.amazonaws.com",
                     user = "admin",
                     passwd = "cmpe281group3",
                     database = "cmpe281_group3" ) 
  
# preparing a cursor object 
mycursor = mydb.cursor()
    
print("testing database connection: ")

def insert(timestamp_, vechile_id):
    sql = "INSERT INTO vehicledetails (vid, email,vcolor,vmake,vmodel,vmileage,vpassengerspace, vservicestatus, vcurrentstatus, location,roadservice) VALUES (%s, %s, %s, %s, %s, %s,%s,%s,%s,%s,%s)"
    val = (vechile_id,'tarun@sjsu.edu','red',"BMW",'S-class',22,2,'Active', 'moving','San Jose', 'No Service')
  
    mycursor.execute(sql, val)
    mydb.commit()
  
    print(mycursor.rowcount, "details inserted")
  
    # disconnecting from server
   # mydb.close()

def update(status, timestamp_,vechile_id):
    #statement ="UPDATE vehicleride SET status = "+ +" WHERE vdatetime ='"+ +'"
    statement ="UPDATE vehicledetails SET vcurrentstatus = '{0}' WHERE vid ='{1}'".format(status, vechile_id)
    mycursor.execute(statement)
    mydb.commit()
    print('updated')
    
#mydb.close()