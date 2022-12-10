import { createSignal, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import 'flowbite/dist/flowbite.css'
import { SolidApexCharts } from "solid-apexcharts";
import Home from "./components/Home";
import { Transition } from "solid-js/types/reactive/signal";
import { Motion, Presence } from "@motionone/solid";
import Systems from "./components/Systems";
import Modal from "./components/Modal";

function App() {
    const [page, setPage] = createSignal<Pages>("Home")
    const [greetMsg, setGreetMsg] = createSignal("");
    const [name, setName] = createSignal("");
    const [showModal, setShowModal] = createSignal(false)
    const [tab, setTab] = createSignal(0);

    async function greet() {
        setGreetMsg(await invoke("greet", { name: name() }));
    }

    function currentPage(page: Pages) {
        switch (page) {
            case "Home":
                return <Motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 500 }}
                    transition={{ duration: 1, easing: "ease-in-out" }}
                >
                    <Home changePage={() => setPage("Simulation")} />
                </Motion.div>
            case "Simulation":
                return <Motion.div
                    initial={{ opacity: 0, x: -500 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 500 }}
                    transition={{ duration: 1, easing: "ease-in-out" }}
                >
                    <Systems tab={tab} changeTab={(i: number) => setTab(i)} openModal={() => setShowModal(true)} />
                </Motion.div>
            default:
                return <div />
        }
    }

    return (
        <>
            <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 app-bg" style="background-image: url('https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-3798.jpg?w=1380&t=st=1670590211~exp=1670590811~hmac=e701dec12bbf096d0e0ea5d0cdb3acf399a543fef2a42c7b12223a1ed4f544ea')">
                <Presence exitBeforeEnter>
                    {currentPage(page())}
                </Presence>
                <Show when={showModal()}>
                    <Modal close={() => setShowModal(false)} />
                </Show>
            </div >
        </>
    );
}

export default App;
