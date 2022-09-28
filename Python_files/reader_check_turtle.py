from matplotlib import image
from matplotlib import pyplot as plt
import time
import random
import paho.mqtt.client as mqtt
import math
from turtle import *

#x1=-558,y1=358, r1=50, x2=558, y2=-358, r2=10, x3=-558, y3=-358, r3=20
incoming_data=[]
# reader1 = Turtle(shape="circle")
# reader2 = Turtle(shape="circle")
# reader3 = Turtle(shape="circle")

# reader1.penup()
# reader1.goto(-558,358)

# reader1.penup()
# reader1.goto(558,-358)

# reader1.penup()
# reader1.goto(-558,-358)

room_width=int(input("Enter the width of room in 2D"))
room_height=int(input("Enter the height of the room in 2D"))

data = image.imread("C:\\Users\\Asus\\Downloads\\Untitled.png")
draw = Turtle(shape="triangle")
screen = Screen()
draw.speed(15)
screen.setup(width=room_width,height=room_height)
draw.penup()
draw.backward((room_width-5)/2)
draw.left(90)
draw.pendown()
draw.forward((room_height-5)/2)
draw.right(90)
draw.forward(room_width-15)
draw.right(90)
draw.forward(room_height-15)
draw.right(90)
draw.forward(room_width-15)
draw.right(90)
draw.forward((room_height-5)/2)
draw.right(90)
draw.forward(room_width-15)
draw.backward((room_width-5)/2)
draw.left(90)
draw.forward(((room_height-5)/2)-5)
draw.backward(((room_height-5)/2)-5)
draw.backward((room_height-5)/2)
draw.forward(((room_height-5)/2)-5)

# draw.pendown()
# draw.right(220)
# draw.forward(30)
# draw.circle(30*2)
def trackLocation(x1, y1, r1, x2, y2, r2, x3, y3, r3):
           A = 2 * x2 - 2 * x1
           B = 2 * y2 - 2 * y1
           C = r1 ** 2 - r2 ** 2 - x1 ** 2 + x2 ** 2 - y1 ** 2 + y2 ** 2
           D = 2 * x3 - 2 * x2
           E = 2 * y3 - 2 * y2
           F = r2 ** 2 - r3 ** 2 - x2 ** 2 + x3 ** 2 - y2 ** 2 + y3 ** 2
           x = (C * E - F * B) / (E * A - B * D)
           y = (C * D - A * F) / (B * D - A * E)
           return x, y
# print(trackLocation(x1=-558,y1=358, r1=50, x2=558, y2=-358, r2=10, x3=-558, y3=-358, r3=20))
# draw.penup()
#draw.goto(trackLocation(x1=-558,y1=358, r1=50, x2=558, y2=-358, r2=10, x3=-558, y3=-358, r3=20))
# draw.backward((room_height-5)/2)
# draw.forward((room_height-5)/2)

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("incoming/data")

def draw_map(x,y):
	# plt.imshow(data)
	# plt.plot(x,y,marker="v",color="red")
	# plt.pause(0.2)
	# plt.imshow(data)
	# plt.show(block=False)
	draw.penup()
	draw.goto(x,y)
def on_message(client, userdata, msg):
	data=msg.payload
	data=data.decode('utf8')
	#print("incoming data",data)
	extract=data.split(',')
	for i in extract:
		incoming_data.append(float("{:.2f}".format(float(i))))
	print(incoming_data)
	draw_map(incoming_data[0]*100,incoming_data[1]*100)
	incoming_data.clear()
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect("192.168.0.199", 1883, 60)

client.loop_forever()
screen.exitonclick()