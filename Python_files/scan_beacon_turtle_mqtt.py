#import turtle
import paho.mqtt.client as mqtt
import ScanUtility
import bluetooth._bluetooth as bluez
import json
d={}
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("$SYS/#")
def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect("192.168.0.199", 1883, 60)

dev_id = 0
try:
	sock = bluez.hci_open_dev(dev_id)
	print ("\n *** Looking for BLE Beacons ***\n")
	print ("\n *** CTRL-C to Cancel ***\n")
except:
	print ("Error accessing bluetooth")

ScanUtility.hci_enable_le_scan(sock)
#Scans for iBeacons
try:
	while True:
		returnedList = ScanUtility.parse_events(sock, 10)
		for item in returnedList:
			if item['macAddress'] == '0c:43:14:f0:2d:3e':
				d={"RSSI":item['rssi'],"MAC":item['macAddress']}
				c=json.dumps(d)
				client.publish("Silicon/Beacon",int(item['rssi']))
				print(d)
				print("")
			else:
				pass
except KeyboardInterrupt:
    pass

client.loop_forever()