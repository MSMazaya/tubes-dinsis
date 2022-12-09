function SignalSelector({ changeSystem }: {
    changeSystem: (type: "STEP" | "RAMP" | "IMPULSE") => void
}) {
    return (
        <>
            <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">Tipe Signal</h3>
            <ul class="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                    <div class="flex items-center pl-3">
                        <input id="list-radio-license" onClick={() => changeSystem("STEP")} type="radio" value="step" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label for="list-radio-license" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Step</label>
                    </div>
                </li>
                <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                    <div class="flex items-center pl-3">
                        <input id="list-radio-id" onClick={() => changeSystem("RAMP")} type="radio" value="ramp" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label for="list-radio-id" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Ramp</label>
                    </div>
                </li>
                <li class="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                    <div class="flex items-center pl-3">
                        <input id="list-radio-passport" onClick={() => changeSystem("IMPULSE")} type="radio" value="lain" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label for="list-radio-passport" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Impulse</label>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default SignalSelector;
