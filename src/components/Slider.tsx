import { createSignal } from "solid-js";

type SliderProps = {
    name: string
}

function Slider({ name }: SliderProps) {
    const [sliderValue, setSliderValue] = createSignal(1)
    return (
        <div class="p-2">
            <label for="default-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{name} = {sliderValue()}</label>
            <input id={name + "_slider_id"} type="range" min="1" onInput={(e: any) => setSliderValue(e.target.value)} value={sliderValue()} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
        </div>
    )
}

export default Slider;
