let local = localStorage;
let productos = [];

for (let item in local) {
    if (item.indexOf('producto') > -1) {
        let producto = localStorage.getItem(item);
        productos.push(JSON.parse(producto));
    }
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
    priceV.innerHTML = `$ ${price} `;

    const divider = document.createElement('hr');
    card.appendChild(divider);

    const option = document.createElement('div');
    option.classList.add('options');
    card.appendChild(option);

    const btn = document.createElement('a');
    btn.classList.add('btn');
    btn.classList.add('btnRemoveCar');
    option.appendChild(btn);
    btn.setAttribute('id', `prod_${id}`);
    btn.onclick = async function() {
        Toastify(
            {
                text: "eliminando ...",
                duration: 2000,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #000000, #e9f0f1)",
                },
        onClick: function(){} // Callback after click
        }).showToast();
        setTimeout(() => {
            localStorage.removeItem(`producto_${id}`);
            location.reload();
        }, 2000)
    }

    const icon = document.createElement('i');
    icon.classList.add('fa-solid');
    icon.classList.add('fa-circle-minus');
    btn.appendChild(icon);
}

for (let item of productos) {
    createProdCard(item);
}
