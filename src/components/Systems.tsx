import { createSignal, Show, Switch, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { invoke } from "@tauri-apps/api/tauri";
import { SolidApexCharts, createApexCharts } from "solid-apexcharts";
import Slider from "./Slider";
import SignalSelector from "./SignalSelector";
import Modal from "./Modal";
import Tabs from "./Tabs";

function makeArr(startValue: number, stopValue: number, cardinality: number): number[] {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
        arr.push(startValue + (step * i));
    }
    return arr;
}

function Systems({ openModal }: {
    openModal: () => void
}) {
    const [page, setPage] = createSignal<Pages>("Home")
    const [greetMsg, setGreetMsg] = createSignal("");
    const [name, setName] = createSignal("");
    const [loading, setLoading] = createSignal(false)

    const x = makeArr(1, 10, 100)

    const options = {
        chart: {
            id: 'solidchart-example',
        },
        xaxis: {
            labels: {
                show: false,
            },
            categories: x,
        },
    };

    const series = [
        {
            name: 'series-1',
            data: x.map(i => 1 - Math.exp(-i)),
        },
        {
            name: 'series-2',
            data: x.map(i => 1),
        },
    ];

    const ApexCharts = createApexCharts();

    const changeSystem = (type: "STEP" | "RAMP" | "IMPULSE") => {
        if (type === "STEP") {
            ApexCharts.exec('solidchart-example', 'updateSeries', [

                {
                    name: 'series-1',
                    data: x.map(i => 1 - Math.exp(-i)),
                },
                {
                    name: 'series-2',
                    data: x.map(i => 1),
                },
            ])
        } else if (type === "RAMP") {
            const newX: number[] = []
            x.forEach((i, index) => {
                newX.push(i + index * 0.1)
            })
            ApexCharts.exec('solidchart-example', 'updateSeries', [
                {
                    name: 'series-1',
                    data: newX.map(i => (i - 3) + Math.exp(-i - 3)),
                },
                {
                    name: 'series-2',
                    data: newX,
                },
            ])
        } else {
            const newX: number[] = []
            x.forEach((index, i) => {
                const middle = x.length / 2
                if (!(i > middle && i < middle + 2)) {
                    newX.push(1)
                } else {
                    newX.push(10)
                }
            })
            ApexCharts.exec('solidchart-example', 'updateSeries', [
                {
                    name: 'series-1',
                    data: newX.map(i => i + Math.exp(-i - 3)),
                },
                {
                    name: 'series-2',
                    data: newX,
                },
            ])
        }
    }

    onMount(async function() {
        await new Promise(r => setTimeout(r, 5000));
        setLoading(true)
        console.log("done")
    })

    return (
        <>
            <div class="relative py-3 max-w-[50%] sm:mx-auto">
                <div class="relative px-5 py-5 shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding bg-opacity-60 border border-gray-200 backdropFilter" style="backdrop-filter: blur(20px);">
                    <div class="mx-auto">
                        <Tabs />
                        <div>
                            <br />
                            <div class="flex justify-between">
                                <div class="w-full">
                                    <Show when={loading()}>
                                        <SolidApexCharts type="line" options={options} series={series} />
                                    </Show>
                                </div>
                                <div class="flex flex-col ml-5">
                                    <SignalSelector changeSystem={changeSystem} />
                                    <br />
                                    <button onClick={openModal} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" data-modal-toggle="staticModal">Deskripsi Sistem</button>
                                </div>
                            </div>
                            <div class="p-5 grid grid-cols-3">
                                <Slider name="k" />
                                <Slider name="k" />
                                <Slider name="k" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Systems;
