from turtle import *

draw = Turtle(shape="triangle")
screen = Screen()
draw.speed(1)
screen.setup(width=1116,height=716)
draw.penup()
draw.goto(x=-547,y=0)
draw.pendown()
draw.left(90)
draw.backward(50)
draw.circle(100,45)
screen.exitonclick()



# class Indoor_Map(object):
# 	"""docstring for Indoor_Map"""
# 	def __init__(self,room_length,room_width):
# 		self.room_width = room_width
# 		self.room_length = room_length
# 		print("Screen Done")
# 	def receive
