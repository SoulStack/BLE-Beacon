import paho.mqtt.client as mqtt
import paho.mqtt.subscribe as subscribe
import time
import math
import json
import statistics as st
import numpy as np

beacon1 = []
beacon2 = []
beacon3 = []

topics = ["Reader2/data", "Reader3/data", "Reader4/data"]

# incoming_topic_copy1 = "Reader3/data"
# incoming_topic_copy2 = "Reader2/data"

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe("Reader1/data")
    client.subscribe("Reader2/data")
    client.subscribe("Reader3/data")
    client.subscribe("Reader4/data")

def on_message(client, userdata, msg):
    
    topic = msg.topic
    value = msg.payload.decode('utf-8')
    reading = json.loads(value)
    
    mac_ids = np.sort(list(set(reading.keys())))
    print(mac_ids)
    
    global topics
    global beacon1
    global beacon2
    global beacon3

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

    # def trackLocation2(x1, y1, r1, x2, y2, r2, x3, y3, r3):
    #     R = math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2))
    #     if (R > r1 - r2) and (R < r1 + r2):
    #         A = 0.5 * (x1 + x2)
    #         B = ((r1**2 - r2**2) * (x2 - x1)) / (2 * (R**2))
    #         C = 0.5 * math.sqrt((2 * ((r1**2 + r2**2)) / (R**2)) - (((r1**2 - r2**2)**2) / (R**4)) - 1) * (y2 - y1)
    #         D = 0.5 * (y1 + y2)
    #         E = ((r1**2 - r2**2) * (y2 - y1)) / (2 * (R**2))
    #         F = 0.5 * math.sqrt((2 * ((r1**2 + r2**2)) / (R**2)) - (((r1**2 - r2**2)**2) / (R**4)) - 1) * (x1 - x2)

    #         ix1 = A + B + C
    #         ix2 = A + B - C
    #         iy1 = D + E + F
    #         iy2 = D + E - F

    #         s1 = math.sqrt((ix1 - x3) ** 2 + (iy1 - y3) ** 2)
    #         s2 = math.sqrt((ix2 - x3) ** 2 + (iy2 - y3) ** 2)

    #         if ((s1 - r3) < (s2 - r3)):
    #             a, b = ix1, iy1
    #         else:
    #             a, b = ix2, iy2

    #         return a, b

    # if (topic != incoming_topic_copy1 and incoming_topic != incoming_topic_copy2):
    if topic not in topics:
        # if (len(d1) <= 3 or len(d2) <=3 or len(d3) <=3):
        beacon1.append(reading[mac_ids[0]])
        beacon2.append(reading[mac_ids[1]])
        beacon3.append(reading[mac_ids[2]])
        for i in range(1, len(topics)):
            topics[i - 1] = topics[i]
        topics.append(topic)

    reader_x = [2, 0, 4, 1]
    reader_y = [5, 9, 4, 0]

    def max3(beacon, reader_x, reader_y):
        b = beacon
        l = []
        for i in range(3):
            l.append(b.index(max(b)))
            b.remove(max(b))
        x1 = reader_x[l[0]]
        y1 = reader_y[l[0]]
        r1 = beacon[l[0]]
        x2 = reader_x[l[1]]
        y2 = reader_y[l[1]]
        r2 = beacon[l[1]]
        x3 = reader_x[l[2]]
        y3 = reader_y[l[2]]
        r3 = beacon[l[2]]
        return x1, y1, r1, x2, y2, r2, x3, y3, r3

    x1, y1, b1r1, x2, y2, b1r2, x3, y3, b1r3 = max3(beacon1, reader_x, reader_y)
    x1, y1, b2r1, x2, y2, b2r2, x3, y3, b2r3 = max3(beacon2, reader_x, reader_y)
    x1, y1, b3r1, x2, y2, b3r2, x3, y3, b3r3 = max3(beacon3, reader_x, reader_y)

    b1x, b1y = trackLocation(x1, y1, b1r1, x2, y2, b1r2, x3, y3, b1r3)
    print("beacon1 : ", key[0], round(b1x), round(b1y))
    beacon1.clear()

    b2x, b2y = trackLocation(x1, y1, b2r1, x2, y2, b2r2, x3, y3, b2r3)
    print("beacon2 : ", key[1], round(b2x), round(b2y))
    beacon2.clear()

    b3x, b3y = trackLocation(x1, y1, b3r1, x2, y2, b3r2, x3, y3, b3r3)
    print("beacon3 : ", key[2], round(b3x), round(b3y))
    beacon3.clear()

        # try:
        #     a1, b1 = trackLocation2(x1, y1, b1r1, x2, y2, b1r2, x3, y3, b1r3)
        #     a2, b2 = trackLocation2(x3, y3, b1r3, x1, y1, b1r1, x2, y2, b1r2)
        #     a3, b3 = trackLocation2(x2, y2, b1r2, x3, y3, b1r3, x1, y1, b1r1)
        #     print(((a1 + a2 + a3) / 3), ((b1 + b2 + b3) / 3))
        
        #     d1.clear()
        # except:
        #     pass

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect("192.168.0.227", 1883, 60)
client.loop_forever()
