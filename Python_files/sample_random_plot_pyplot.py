import random
import numpy as np
from timeit import repeat
import matplotlib.pylab as plt
import matplotlib.animation as animation
from matplotlib.patches import Rectangle

plt.rcParams["figure.figsize"] = [6, 9]
plt.rcParams["figure.autolayout"] = False

fig, ax = plt.subplots()

def animate(frame):
    
    ax.clear()
    
    x1, y1 = 5.31, 6.39 
    x2, y2 = 9.51, 0
    x3, y3 = 5.31, 5.83

    x, y = random.uniform(2,3), random.uniform(2,3)

    plt.plot([-3.07, -3.07], [-5, 25])
    plt.plot([-3.07, 16.91], [25, 25])
    plt.plot([16.91, 16.91], [25, -5])
    plt.plot([16.91, -3.07], [-5, -5])

    ax.add_patch(Rectangle((0, 0), 1.258, 22.5))
    ax.add_patch(Rectangle((5.314, 0), 4.19, 18.19))
    ax.add_patch(Rectangle((12.58, 0), 1.258, 22.5))
    ax.add_patch(Rectangle((3.776, 22.5), 7.55, -1.258))

    ax.scatter(x1, y1, lw = 2, color = 'green')
    ax.scatter(x2, y2, lw = 2, color = 'green')
    ax.scatter(x3, y3, lw = 2, color = 'green')
    ax.scatter(x, y, lw = 2, color = 'red')

    ax.set_xlim(left = -10, right = 20)
    ax.set_ylim(bottom = -10, top = 30)

ani = animation.FuncAnimation(fig, animate, frames = None, repeat = False)
plt.show()