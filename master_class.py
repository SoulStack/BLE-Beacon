import paho.mqtt.client as mqtt
import paho.mqtt.subscribe as subscribe
import time
import math
import json
import statistics as st
import numpy as np

n=1
readers=[]
subscribe_list=[]

print("Please fill the below details")
while n!=0:
readers_number=int(input("Please enter how many reader are present in the room"))
n=readers_number
if type(readers_number)==int:
for i in range(0,readers_number):
#please enter name like "Reader112455:Serial"
readers[i]=str(input("Enter Reader {} Name".format(i)))
n-=1
else:
print("Wrong input, please enter a valid number")

class bletrack(object):
"""docstring for ble"""

# the below details are used create an instance of an room, the can consist of such details below and may some data might remain same such as databawe and mqtt protocols.
# The *readers variable must be provided with list, example: *args, object(1,2,3,4) so on.
# Each object created represent an instance of a room or an area.

def __init__(self,room="",buliding="",readers,block="",mqtt_server_ip="",database_servername="",database_name="",database_username="",database_password=""):
self.room = room
self.buliding = buliding
self.readers = readers
self.block = block
self.mqtt_server_ip = mqtt_server_ip
self.database_servername = database_servername
self.database_username = database_username
self.database_password = database_password
self.database_name = database_name
print("All variable has been intitalised")
#all the principal detail are taken and instace in created

def on_connect(client,userdata,flags,rc):
print("MQTT Server Connected, result code = {}".format(str(rc)))
for i in range(0,len(readers)):
subscribe_list.append((i,0))
client.subscribe(subscribe_list)
subscribe_list.clear()

def extract_data(payload):
filter_data = str(payload)
return filter_data
#currently we can just extacting the data and keeping
def on_message(client,userdata,flags,rc): # this message is called everytime the program runs client.forever()
if str(msg.topic) in readers:
index = readers.index(str(msg.topic))
client = mqtt.Client()
client.on_connect = on_connect()
client.on_message = on_message()
client.connect(mqtt_server_ip,1883,60)
client.loop_forever()
