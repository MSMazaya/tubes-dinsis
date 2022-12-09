function Home({ changePage }: { changePage: () => void }) {
    return (
        <div class="relative py-3 max-w-[50%] sm:mx-auto">
            <div class="relative px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding border border-gray-200 backdropFilter" style="backdrop-filter: blur(20px);">
                <div class="mx-auto">
                    <div>
                        <h1 class="font-bold text-3xl text-center">Tugas Besar Dinamika Sistem</h1>
                    </div>
                    <div class="divide-y divide-gray-200">
                        <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                            <p>Made by:</p>
                            <ul class="list-disc space-y-2">
                                <li class="flex items-start">
                                    <span class="h-6 flex items-center sm:h-7">
                                        <svg class="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                    <p class="ml-2">
                                        Muhammad Arkan Nuruzzahran (13320010)
                                    </p>
                                </li>
                                <li class="flex items-start">
                                    <span class="h-6 flex items-center sm:h-7">
                                        <svg class="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                    <p class="ml-2">
                                        Muhammad Sulthan Mazaya (13320028)
                                    </p>
                                </li>
                                <li class="flex items-start">
                                    <span class="h-6 flex items-center sm:h-7">
                                        <svg class="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                    <p class="ml-2">
                                        Jihad Zakki Darajad (13320064)
                                    </p>
                                </li>
                            </ul>
                            <p>Software ini dapat digunakan untuk melakukan simulasi terhadap 3 sistem berbeda dengan pendekatan state space.</p>
                        </div>
                        <div class="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7 flex items-center justify-center">
                            <a onClick={changePage} class="cursor-pointer text-cyan-600 hover:text-cyan-700"> Mulai Lakukan Simulasi &rarr; </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home;
