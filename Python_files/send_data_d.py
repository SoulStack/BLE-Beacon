import time
from beacontools import BeaconScanner, IBeaconFilter, IBeaconAdvertisement
import statistics as st
import json
import paho.mqtt.client as mqtt

my_dict = dict()
my_dict_m = dict()
s = set()

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

def on_message(client, userdata, msg):
    print(msg.topic + " " + str(msg.payload))

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect("192.168.0.227", 1883, 60)

def callback(bt_addr, rssi, packet, additional_info):
    global my_dict
    global s
    value = str(packet)
    tx_power = -60
    n = 3
    s.add(bt_addr)
    distance = 10 ** ((tx_power - rssi) / (10 * n))
    if bt_addr in s:
        my_dict.setdefault(bt_addr, []).append(distance)
        m = st.mean(my_dict[bt_addr])
        my_dict_m[bt_addr] = m
        # print(my_dict)
        print(my_dict_m)
    if bt_addr in s:
        if (len(my_dict[bt_addr]) == 20):
            my_dict.setdefault(bt_addr, []).pop(0)
            # string = "{'Reader1/data':" + str(my_dict_m) + "}"
            # print(string)
            data =json.dumps(my_dict_m)
            client.publish("Reader1/data",data)
scanner = BeaconScanner(callback,packet_filter = IBeaconAdvertisement)
scanner.start()
client.loop_forever()
