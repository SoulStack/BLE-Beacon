import time
from beacontools import BeaconScanner, IBeaconFilter, IBeaconAdvertisement

import json

import paho.mqtt.client as mqtt

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect("mqtt.eclipseprojects.io", 1883, 60)

def callback(bt_addr, rssi, packet, additional_info):
    #print("<%s, %d> %s %s" % (bt_addr, rssi, packet, additional_info))
    value = str(packet)
    measured_power = -69
    instance_rssi = rssi
    n = 2
    convert = 10**((measured_power - instance_rssi)/10*n)
    d={"Mac":bt_addr,"Distance":convert,"Datagram":value[34:76]}
    data =json.dumps(d)
    client.publish(data,"Reader1/data",data)
scanner = BeaconScanner(callback,device_filter=IBeaconFilter(uuid="e5b9e3a6-27e2-4c36-a257-7698da5fc140"))
scanner.start()
time.sleep(5)
scanner.stop()
scanner = BeaconScanner(callback,packet_filter=IBeaconAdvertisement)
scanner.start()
time.sleep(5)
client.loop_forever()
