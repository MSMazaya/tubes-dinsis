import control
from control.matlab import *
import numpy as np
import sys

# destructure sys argv to m1, m2, m3, etc
m1, m2, m3, b1, b2, b3, k1, k2, k3, mode = [int(i) for i in sys.argv[1:]]

A = np.array([[0, 0, 0, -1/m1, 0, 0],
             [0, 0, 0, 0, 1/m2, -1/m3],
             [0, 0, 0, 0, 0, 1/m3],
             [1/(1/k1), 0, 0, -b2/m1, b2/m2, 0],
             [0, -1/(1/k2), 0, b2/m1, -b1/m2-b2/m2, 0],
             [0, 1/(1/k2), -1/(1/k3), 0, 0, -b3/m3]])
B = np.array([[0, 1, 0],
             [0, 0, 0],
             [-1, 0, 0],
             [0, 0, 0],
             [0, b1, 1],
             [b3, 0, 0]])
D = np.array([0, 0, 0])
C = np.array([[1, 0, 0, 0, 0, 0]])

# Untuk Ramp
T = np.linspace(0, 5, 100)
U = np.zeros([100, 3])
for i in range(100):
    for j in range(3):
        U[i, j] = T[i]

mysys1 = control.matlab.ss(A, B, C, D)

responImpulse = control.matlab.impulse(mysys1, return_x=True)

responStep = control.matlab.step(mysys1, return_x=True)

responRamp = control.matlab.lsim(mysys1, U, T)
ximpulse, yimpulse = responImpulse[0], responImpulse[1]
xstep, ystep = responStep[0], responStep[1]
xramp, yramp = responRamp[0], responRamp[1]

print("x,y")
if mode == 1:
    ximpulse = [i[0][0] for i in ximpulse]
    for i in range(len(ximpulse)):
        print(f'{ximpulse[i]},{yimpulse[i]}')
elif mode == 2:
    xstep = [i[0][0] for i in xstep]
    for i in range(len(xstep)):
        print(f'{xstep[i]},{ystep[i]}')
else:
    xramp = [i[0] for i in xramp]
    for i in range(len(xramp)):
        print(f'{xramp[i]},{yramp[i]}')
