const checkLogin = () => {
    const user = localStorage.getItem('email');
    const pass = localStorage.getItem('pass');

    if (!user && !pass) {
       window.location.replace('/login/login.html');
    }
}

const getData = async () => {
    let response = await fetch('../assets/data.json');
    let data = await response.json();
    return data;
}

const addCar = () => {
    console.log('hola');
}

const createProdCard = (producto) => {

    const {id, img, name, price} = producto;

    const contentV = document.getElementById('prodBox');
    const card = document.createElement('div');
    card.classList.add('prodCard');
    contentV.appendChild(card);

    const boxImg = document.createElement('div');
    boxImg.classList.add('img');
    card.appendChild(boxImg);

    const imgV = document.createElement('img');
    imgV.src = img;
    boxImg.appendChild(imgV);

    const boxText = document.createElement('div');
    boxText.classList.add('text');
    card.appendChild(boxText);

    const nameV = document.createElement('p');
    nameV.classList.add('prodName');
    boxText.appendChild(nameV);
    nameV.innerHTML = name;

    const priceV = document.createElement('p');
    priceV.classList.add('prodPrice');
    boxText.appendChild(priceV);
    priceV.innerHTML = `$ ${price}`;

    const divider = document.createElement('hr');
    card.appendChild(divider);

    const option = document.createElement('div');
    option.classList.add('options');
    card.appendChild(option);

    const btn = document.createElement('a');
    btn.classList.add('btn');
    btn.classList.add('btnAddCar');
    option.appendChild(btn);
    btn.setAttribute('id', `prod_${id}`);
    btn.onclick = async function() {
        let productos = await getData();
        productos.find(element => {
            const idIn = element.id;
            if(id === idIn){
                Toastify(
                    {
                        text: "agregando...",
                        duration: 2000,
                        gravity: "top", // `top` or `bottom`
                        position: "center", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "linear-gradient(to right, #000000, #e9f0f1)",
                        },
                onClick: function(){} // Callback after click
                }).showToast();
                let producto = JSON.stringify(element);
                localStorage.setItem(`producto_${idIn}`, producto);
            }
        });
    }
    btn.innerHTML = 'Agregar al carrito  ';

    const icon = document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-cart-plus');
    btn.appendChild(icon);
}

const displayProductos = async () => {
    let productos = await getData();
    for(let item of productos){
        createProdCard(item);
    }
}

const searchProducto = (productos) => {
    const btnSearch = document.getElementById('btnSearch');
    const formSearch = document.getElementById('formSearch');

    btnSearch.addEventListener('click', async (e) => {
        e.preventDefault();
        const value = formSearch[0].value.toLowerCase();

        let productos = await getData();

        if (value === '') {
            const contentV = document.getElementById('prodBox');
            contentV.innerHTML = '';
            let productos = await getData();
            for (let item of productos) {
                createProdCard(item);
            }
        } else {
            const contentV = document.getElementById('prodBox');
            contentV.innerHTML = '';
            productos.find(element => {
                const name = element.name.toLowerCase()
                if(name.includes(value)){
                    createProdCard(element);
                }
            });
        }

    });

    formSearch.addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    });

    formSearch.addEventListener('search', async () => {
        const contentV = document.getElementById('prodBox');
        contentV.innerHTML = '';
        let productos = await getData();
        for (let item of productos) {
            createProdCard(item);
        }
    });
}

const orderProdPriceLow = (productos) => {
    const btnLow = document.getElementById('btnLow');

    btnLow.addEventListener('click', async () => {

        Toastify(
            {
                text: "Ordenando ...",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right,#000000, #e9f0f1)",
                },
        onClick: function(){} // Callback after click
        }).showToast();

        let productos = await getData();

        setTimeout(() => {
            productos.sort((a, b) => {
                if (a.price > b.price) {
                    return 1;
                } else if (a.price < b.price) {
                    return -1;
                } else {
                    return 0;
                }
            });
            const contentV = document.getElementById('prodBox');
            contentV.innerHTML = '';
            for (let item of productos) {
                createProdCard(item);
            }
        }, 2000);
    });
}

const orderProdByPriceHigh = (productos) => {
    const btnHigh = document.getElementById('btnHigh');

    btnHigh.addEventListener('click', async () => {

        Toastify(
            {
                text: "Ordenando ...",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #000000, #e9f0f1)",
                },
        onClick: function(){} // Callback after click
        }).showToast();

        let productos = await getData();

        setTimeout(() => {
            productos.sort((a, b) => {
                if (a.price < b.price) {
                    return 1;
                } else if (a.price > b.price) {
                    return -1;
                } else {
                    return 0;
                }
            });
            const contentV = document.getElementById('prodBox');
            contentV.innerHTML = '';
            for (let item of productos) {
                createProdCard(item);
            }
        }, 2000);

    });
}

checkLogin();
displayProductos();
searchProducto();
orderProdPriceLow();
orderProdByPriceHigh();
