const cards = document.getElementById("cards")
const modal = document.getElementById("modal")
let basket = []
let allProducts = []

function openClose() { modal.style.display === 'none' ? modal.style.display = 'block' : modal.style.display = 'none'; }

function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(res => {
            allProducts = res
            Products()
        })
}
function Products() {
    cards.innerHTML = ""
    allProducts.map(item => {
        cards.innerHTML += `
        <div class="group overflow-hidden relative">
            <a href="javascript:void(0)" class="block">
                <div class="aspect-[5/4] bg-slate-100 w-full overflow-hidden">
                    <img src="${item.image}" alt="Product-1"
                    class="w-full h-full object-cover object-top hover:scale-110 transition-all duration-700" />
                </div>
            </a>
            <div class="p-4 relative">
                <div class="flex flex-wrap justify-between gap-2 w-full absolute px-4 pt-3 z-10 transition-all duration-500 left-0 right-0 group-hover:bottom-20
                    lg:bottom-5 lg:opacity-0 lg:bg-white lg:group-hover:opacity-100
                    max-lg:bottom-20 max-lg:py-3 max-lg:bg-white/60">
                    <button type="button" title="Add to wishlist" class="bg-transparent outline-0 border-0 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="fill-slate-800 w-5 h-5 inline-block" viewBox="0 0 64 64">
                            <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"></path>
                        </svg>
                    </button>
                    <button onclick="addBasket(${item.id})" type="button" title="Add to cart" class="bg-transparent outline-0 border-0 cursor-pointer"><b>Add</b>
                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-slate-800 w-5 h-5 inline-block" viewBox="0 0 512 512"> 
                    <path d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0" data-original="#000000"></path> 
                    </svg>
                    </button>
                </div>
                <div class="z-20 relative bg-white">
                    <h6 class="text-[15px] font-semibold text-slate-900 truncate">${item.title}</h6>
                    <h6 class="text-sm text-red-600 font-medium mt-2">${item.price}$</h6>
                </div>
            </div>
        </div>
        `;
    });
}
let proCount = document.getElementById("proCount")
function addBasket(id) {
    let item = basket.find(n => n.id === id)
    if (item) {
        item.count += 1
    } else {
        basket.push({ id, count: 1 })
    }
    proCount.innerHTML = basket.length
    showBasket()
}
function remove(id) {
    let item = basket.find(n => n.id === id)

    if (item.count > 1) {
        item.count -= 1
    } else {
        basket = basket.filter(n => n.id !== id)
        total.innerHTML = ""
        proCount.innerHTML = basket.length
    }
    if(basket.length === 0){proCount.innerHTML =" "}
    showBasket()
}
function delet(id) {
    let index = basket.findIndex(n => n.id === id);
    if (index !== -1) {
        basket.splice(index, 1)
        proCount.innerHTML = basket.length
        total.innerHTML = ""
    }
    if(basket.length === 0){proCount.innerHTML =" "}
    showBasket();
}

let sebet = document.getElementById("sebet")
let total = document.getElementById("total")

function showBasket() {
    sebet.innerHTML = ""
    let totalPrice = 0
    if (basket.length === 0) {sebet.innerHTML =`<p class="text-grey-500 text-lg font-bold">Səbət Boşdur!</p>` }
    basket.map(({id,count}) => {
        const product = allProducts.find(pro => pro.id === id);
        totalPrice += product.price * count;

        sebet.innerHTML += ` <div class="lg:col-span-2 space-y-6">
                <div class="flex gap-4 bg-white px-4 py-6 rounded-md shadow-sm border border-gray-200">
                    <div class="flex gap-6 sm:gap-4 max-sm:flex-col">
                        <div class="w-24 h-24 max-sm:w-24 max-sm:h-24 shrink-0">
                            <img src='${product.image}' class="w-full h-full object-contain" />
                        </div>
                        <div class="flex flex-col gap-4">
                            <div>
                                <h3 class="text-sm sm:text-base font-semibold text-slate-900">${product.title}</h3>
                            </div>
                            <div class="mt-auto">
                                <h3 class="text-sm font-semibold text-slate-900">${product.price}$</h3>
                            </div>
                        </div>
                    </div>
                    <div class="ml-auto flex flex-col">
                        <div class="flex items-start gap-4 justify-end">
                            <svg  xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 cursor-pointer fill-red-400 hover:fill-pink-600 inline-block" viewBox="0 0 64 64">
                                <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" data-original="#000000"></path>
                            </svg>
                            <svg onclick="delet(${id})" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 cursor-pointer fill-slate-400 hover:fill-red-600 inline-block" viewBox="0 0 24 24">
                                <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"></path>
                                <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000"></path>
                            </svg>
                        </div>
                        <div class="flex items-center gap-3 mt-auto">
                            <button onclick="remove(${id})" type="button"
                                class="flex items-center justify-center w-[18px] h-[18px] cursor-pointer bg-slate-400 outline-none rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-2 fill-white" viewBox="0 0 124 124">
                                    <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                                </svg>
                            </button>
                            <span class="font-semibold text-base leading-[18px]">${count}</span>
                            <button onclick="addBasket(${id})" type="button"
                                class="flex items-center justify-center w-[18px] h-[18px] cursor-pointer bg-slate-800 outline-none rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-2 fill-white" viewBox="0 0 42 42">
                                    <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
        `
    })
    if (totalPrice != 0) {
        total.innerHTML = `<li class="flex flex-wrap gap-4 text-sm font-semibold text-slate-900 bg-gray-200 p-4 rounded-xl">Total <span class="ml-auto">${totalPrice.toFixed(3)}$</span></li>`
    }
}
fetchProducts()
showBasket()