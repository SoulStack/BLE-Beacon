import random
import numpy as np
from timeit import repeat
import matplotlib.pylab as plt
import matplotlib.animation as animation
from matplotlib.patches import Rectangle
import paho.mqtt.client as mqtt

plt.rcParams["figure.figsize"] = [6, 9]
plt.rcParams["figure.autolayout"] = False

fig, ax = plt.subplots()
incoming_data=[]
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("incoming/data")

def on_message(client, userdata, msg):
    print("Pass 5")
    data=msg.payload
    data=data.decode('utf8')
    #print("incoming data",data)
    print("Pass 6")
    extract=data.split(',')
    for i in extract:
        incoming_data.append(float("{:.2f}".format(float(i))))
    print("Pass 7")
    print(incoming_data)


def animate(frame):
    print("Pass 9")
    ax.clear()
    print("Pass 10")
    x1, y1 = 5.31, 6.39 
    x2, y2 = 9.51, 0
    x3, y3 = 5.31, 5.83
    print("Pass 11")
    x, y = incoming_data[0],incoming_data[1]
    print(x,y)
    print("Pass 12")
    incoming_data.clear()
    plt.plot([-3.07, -3.07], [-5, 25])
    plt.plot([-3.07, 16.91], [25, 25])
    plt.plot([16.91, 16.91], [25, -5])
    plt.plot([16.91, -3.07], [-5, -5])
    print("Pass 13")
    ax.add_patch(Rectangle((0, 0), 1.258, 22.5))
    ax.add_patch(Rectangle((5.314, 0), 4.19, 18.19))
    ax.add_patch(Rectangle((12.58, 0), 1.258, 22.5))
    ax.add_patch(Rectangle((3.776, 22.5), 7.55, -1.258))
    print("Pass 14")
    ax.scatter(x1, y1, lw = 2, color = 'green')
    ax.scatter(x2, y2, lw = 2, color = 'green')
    ax.scatter(x3, y3, lw = 2, color = 'green')
    ax.scatter(x, y, lw = 2, color = 'red')
    print("Pass 15")
    ax.set_xlim(left = -10, right = 20)
    ax.set_ylim(bottom = -10, top = 30)

client = mqtt.Client()
print("Pass 1")
client.on_connect = on_connect
print("Pass 2")
client.on_message = on_message
print("Pass 3")
client.connect("192.168.0.199", 1883, 60)
print("Pass 4")
client.loop_forever()
ani = animation.FuncAnimation(fig, animate, frames = None, repeat = False)
plt.show()


