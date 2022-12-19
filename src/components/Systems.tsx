import { createSignal, Show, Switch, onMount, Accessor, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { invoke } from "@tauri-apps/api/tauri";
import { SolidApexCharts, createApexCharts } from "solid-apexcharts";
import Slider from "./Slider";
import SignalSelector from "./SignalSelector";
import Modal from "./Modal";
import Tabs from "./Tabs";
import { createArgs, defaultArgs, generateSignal, signalMode } from "../utils/call-sidecar";
import { constantNameLookup } from "../datas/system";

function makeArr(startValue: number, stopValue: number, cardinality: number): number[] {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
        arr.push(startValue + (step * i));
    }
    return arr;
}

function Systems({ openModal, tab, changeTab, graphData }: {
    openModal: () => void,
    changeTab: (i: number) => void,
    tab: Accessor<number>,
    graphData: Accessor<{
        x: number[],
        y: number[]
    }>
}) {
    const [loading, setLoading] = createSignal(false)
    const [args, setArgs] = createSignal<number[]>(createArgs(tab(), defaultArgs[tab()]))
    const [mode, setMode] = createSignal<signalMode>("STEP")
    const [status, setStatus] = createSignal<string>("")

    const x = makeArr(1, 10, 100)

    createEffect(async () => {
        setLoading(true)
        setStatus("Generating Signal...")
        const newData =
            await generateSignal(args(), mode(), tab())

        setStatus("Updating Graphic...")
        ApexCharts.exec('solidchart-example', 'updateSeries', [
            {
                name: 'x',
                data: newData.x,
            },
            {
                name: 'y',
                data: newData.y,
            },
        ])
        setLoading(false)
    });

    const options = {
        chart: {
            id: 'solidchart-example',
        },
        xaxis: {
            labels: {
                show: false,
            },
        },
    };

    const series = [
        {
            name: "x",
            data: graphData().x,
        },
        {
            name: 'y',
            data: graphData().y,
        },
    ];

    const ApexCharts = createApexCharts();

    const changeSystem = (type: "STEP" | "RAMP" | "IMPULSE") => {
        setMode(type)
    }

    onMount(async function() {
        setLoading(true)
        setStatus("Generating Signal...")
        console.log(args())
        const newData =
            args() ? await generateSignal(args(), mode(), tab()) : { x: [], y: [] }


        setStatus("Updating Graphic...")
        ApexCharts.exec('solidchart-example', 'updateSeries', [
            {
                name: 'x',
                data: newData.x,
            },
            {
                name: 'y',
                data: newData.y,
            },
        ])
        setLoading(false)
    })

    return (
        <>
            <div class="relative py-3 max-w-[50%] sm:mx-auto">
                <div class="relative px-5 py-5 shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding bg-opacity-60 border border-gray-200 backdropFilter" style="backdrop-filter: blur(20px);">
                    <div class="mx-auto">
                        <Tabs tab={tab} changeTab={changeTab} />
                        <div>
                            <br />
                            <div class="flex justify-between">
                                <div class="w-full">
                                    <div class={loading() ? "hidden" : ""}>
                                        <SolidApexCharts type="line" options={options} series={series} />
                                    </div>
                                    <Show when={loading()}>
                                        <div class="flex gap-3 items-center">
                                            <div role="status">
                                                <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                            {status()}
                                        </div>
                                    </Show>
                                </div>
                                <div class="flex flex-col ml-5">
                                    <SignalSelector currentSystem={mode} changeSystem={changeSystem} />
                                    <br />
                                    <button onClick={openModal} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" data-modal-toggle="staticModal">Deskripsi Sistem</button>
                                </div>
                            </div>
                            <div class="p-5 grid grid-cols-3">
                                {constantNameLookup[tab()].map((x: string) => <Slider name={x} />)}
                            </div>
                            <button onClick={
                                () => {
                                    const constants = constantNameLookup[tab()].map((x: string) => {
                                        const el = document.getElementById(x + "_slider_id") as HTMLInputElement
                                        if (el)
                                            return Number(el.value)
                                        else
                                            return Number(1)
                                    })
                                    setArgs(constants)
                                }
                            } type="button" class="p-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full" data-modal-toggle="staticModal">Update Sistem</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Systems;
