import control
from control.matlab import *
import numpy as np
import sys

R1, R2, C1, C2, C3, L1, L2, mode = [int(i) for i in sys.argv[1:]]

# Resistansi (𝛀)
R1 = 1
R2 = 1
# Kapasitor (F)
C1 = 3
C2 = 3
C3 = 3
# Induktansi (H)
L1 = 4
L2 = 4

A = np.array([[-1/(C1*R2)-1/(C1*R1), 1/(C2*R2), 1/(C3*R2), 0, 0],
             [1/(C1*R2), -1/(C2*R2), -1/(C3*R2), -1/L1, 0],
             [1/(C1*R2), -1/(C2*R2), -1/(C3*R2), 0, -1/L2],
             [0, 1/C2, 0, 0, 0],
             [0, 0, 1/C3, 0, 0]])
B = np.array([[1/R1, 1/R2+1/R1],
             [0, -1/R2],
             [0, -1/R2],
             [0, 0],
             [0, 0]])
D = np.array([0, 0])
C = np.array([[1, 0, 0, 0, 0]])

# Untuk Ramp
T = np.linspace(0, 5, 100)
U = np.zeros([100, 2])
for i in range(100):
    for j in range(2):
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
