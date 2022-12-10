import { Accessor, createSignal } from 'solid-js'

function Tabs({ tab: currentTab, changeTab }: {
    tab: Accessor<number>,
    changeTab: (i: number) => void
}) {
    const tabs = [
        "System 1",
        "System 2",
        "System 3",
    ]

    const activeClass = "cursor-pointer inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
    const nonActiveClass = "cursor-pointer inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"

    return (
        <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px">
                {
                    tabs.map((tab, i) => {
                        return (
                            <li class="mr-2">
                                <div
                                    onClick={() => changeTab(i)}
                                    class={currentTab() === i ? activeClass : nonActiveClass}
                                >{tab}</div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Tabs;
