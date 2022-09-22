from matplotlib import image
from matplotlib import pyplot as plt
import time
import random
import paho.mqtt.client as mqtt
import math
data = image.imread("C:\\Users\\Asus\\Downloads\\Untitled.png")

incoming_data=[]
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("incoming/data")

def draw_map(x,y):
	plt.imshow(data)
	plt.plot(x,y,marker="v",color="red")
	plt.pause(0.2)
	plt.imshow(data)
	plt.show(block=False)
def on_message(client, userdata, msg):
	data=msg.payload
	data=data.decode('utf8')
	#print("incoming data",data)
	extract=data.split(',')
	for i in extract:
		incoming_data.append(float("{:.2f}".format(float(i))))
	print(incoming_data)
	draw_map(incoming_data[0]*106,incoming_data[1]*106)
	incoming_data.clear()
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect("192.168.0.199", 1883, 60)

client.loop_forever()