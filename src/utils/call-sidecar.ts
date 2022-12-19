import { Command } from "@tauri-apps/api/shell"
import { CSVToArray } from "./csv"

export type signalMode = 'IMPULSE' | 'STEP' | 'RAMP'

const modeMap: {
    [K in signalMode]: string
} = {
    'IMPULSE': '1',
    'STEP': '2',
    'RAMP': '3'
}

const sidecarPaths = [
    "../src/script/system-1/dists/main-1",
    "../src/script/system-2/dists/main-2",
    "../src/script/system-3/dists/main-3"
]

export type inputSystem1 = {
    m1: number
    m2: number
    m3: number
    b1: number
    b2: number
    b3: number
    k1: number
    k2: number
    k3: number
}

export type inputSystem2 = {
    R1: number
    R2: number
    C1: number
    C2: number
    C3: number
    L1: number
    L2: number
}

export type inputSystem3 = {
    R: number
    L: number
    km: number
    J: number
    N1: number
    N2: number
    β: number
}

export const defaultArgs = {
    0: {
        m1: 1,
        m2: 1,
        m3: 1,
        b1: 1,
        b2: 1,
        b3: 1,
        k1: 1,
        k2: 1,
        k3: 1
    } as inputSystem1,
    1: {
        R1: 1,
        R2: 1,
        C1: 1,
        C2: 1,
        C3: 1,
        L1: 1,
        L2: 1,
    } as inputSystem2,
    2: {
        R: 1,
        L: 1,
        km: 1,
        J: 1,
        N1: 1,
        N2: 1,
        β: 1,
    }
} as any

export function createArgs(sys: number, input: any): any {
    const system = sys + 1;
    if (system === 1) {
        return [
            input.m1,
            input.m2,
            input.m3,
            input.b1,
            input.b2,
            input.b3,
            input.k1,
            input.k2,
            input.k3
        ]
    } else if (system === 2) {
        return [
            input.R1,
            input.R2,
            input.C1,
            input.C2,
            input.C3,
            input.L1,
            input.L2
        ]
    } else if (system === 3) {
        return [
            input.R,
            input.L,
            input.km,
            input.J,
            input.N1,
            input.N2,
            input.β
        ]
    }
}

export async function generateSignal(constants: number[], mode: signalMode, system: number) {
    const path = sidecarPaths[system]
    const modeCode = modeMap[mode]

    const args = constants.map(constant => constant.toString()).concat(modeCode)

    const command = Command.sidecar(path, args)

    const output = await command.execute()

    return CSVToArray(output.stdout)
}
