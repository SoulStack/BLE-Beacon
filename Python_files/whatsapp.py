import pywhatkit as w
import time
import pyautogui
import keyboard as k
import csv
from datetime import datetime
from datetime import timedelta


filename = "C:\\Users\\Asus\\Documents\\OKCL\\contact.csv"
fields = []
rows=[]
with open (filename,'r') as csvfile:
	csvreader = csv.reader(csvfile)
	fields = next(csvreader)
	for row in csvreader:
		rows.append(row)
		print(row[2])
		current_time = datetime.now()
		print('Current timestamp: ', current_time)
		n = 1
		future_time = current_time + timedelta(minutes=n)
		print('Future Time (1 minutes from now ): ', future_time)
		future_time_str = future_time.strftime('%m-%d-%Y %H:%M:%S.%f')
		hour=future_time_str[11:13]
		minti=future_time_str[14:16]
		print(int(hour))
		print(int(minti))
		w.sendwhatmsg(row[2], 'hELLO', int(hour), int(minti),tab_close= True,close_time=1)
		w.sendwhats_image(row[2],"C:\\Users\\Asus\\Downloads\\building-839362.jpg",tab_close= True,close_time=1)
		pyautogui.click(1050, 950)
		time.sleep(2)
		k.press_and_release('enter')
	print("Total no. of rows: %d"%(csvreader.line_num))
 
# printing the field names
print('Field names are:' + ', '.join(field for field in fields))