import control
from control.matlab import *
import numpy as np
import sys

R, L, km, J, N1, N2, β, mode = [int(i) for i in sys.argv[1:]]

A = np.array([[-R/L,             -km/J],
              [km/L, -((N1/N2)**2)*β/J]])
B = np.array([[1],
              [0]])
D = np.array([0])

# Untuk Ramp
T = np.linspace(0, 5, 100)
U = T
# Omega 2
C = np.array([[0, -(N1/N2)*1/J]])
mysys1 = control.matlab.ss(A, B, C, D)

responImpulse = control.matlab.impulse(mysys1, return_x=True)

responStep = control.matlab.step(mysys1, return_x=True)

responRamp = control.matlab.lsim(mysys1, U, T)

ximpulse, yimpulse = responImpulse[0], responImpulse[1]
xstep, ystep = responStep[0], responStep[1]
xramp, yramp = responRamp[0], responRamp[1]

print("x,y")
if mode == 1:
    ximpulse = [i for i in ximpulse]
    for i in range(len(ximpulse)):
        print(f'{ximpulse[i]},{yimpulse[i]}')
elif mode == 2:
    xstep = [i for i in xstep]
    for i in range(len(xstep)):
        print(f'{xstep[i]},{ystep[i]}')
else:
    xramp = [i for i in xramp]
    for i in range(len(xramp)):
        print(f'{xramp[i]},{yramp[i]}')
