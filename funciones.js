import './modules/scroll.js';
import './modules/cards.js';
import { items } from './modules/cards.js';



document.addEventListener('DOMContentLoaded', function () {
  const containerLoad = document.querySelector('#container_load');

  console.log(containerLoad);
});

window.addEventListener('load', function () {
  const contenLoad = document.querySelector('.content_load');

  setTimeout(() => {
    contenLoad.style.display = 'none';
  }, 3500);
});



let order = {};

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn_product')) {
      const userID = event.target.parentElement.dataset.iduser;

      let userCurrent = null;

      for (let i = 0; i < items.length; i++) {
        if (items[i].id === parseInt(userID)) {
          userCurrent = items[i];

         
        }
      }

      if (order[userCurrent.id]) {
        if (order[userCurrent.id].amount === order[userCurrent.id].quantity) {
          alert('ya se agotaron');
          return;
        }

        order[userCurrent.id].amount++;
      } else {
        order[userCurrent.id] = userCurrent;
        order[userCurrent.id].amount = 1;
      }

      

      const amount = document.querySelector('#amountt');
      amount.textContent = Object.entries(order).length;
    }
  });

  const sidebarcarrito = document.querySelector('.sidebar_carrito');
  const btncarrito = document.querySelector('.carrito');
  const close = document.querySelector('.btnclose');
  const ContentCart = document.querySelector('.content_cart');

  btncarrito.addEventListener('click', function () {
    sidebarcarrito.classList.add('show_sidebar_carrito');
  });

  close.addEventListener('click', function () {
    sidebarcarrito.classList.remove('show_sidebar_carrito');
  });

  

  window.addEventListener('click', function RenderCart() {
    if (Object.entries(order).length === 0) {
      ContentCart.innerHTML =
        ' <div class="img_nada"><img src="./img/empty-cart.png" alt=""></div> <h2>Your cart is empty</h2><p>You can add items to your cart by clicking on the "+" button on the product page. </p>';
    } else {
      let bolsasCompradas = '';

      Object.values(order).forEach(
        ({ name, price, quantity, amount, image, id }) => {
          const multiplicar = price * amount;

          bolsasCompradas += `<div class="list_cart"><div class="content_list_cart"><img src="${image}" alt=""><div class="descrip_cart_list"><h3>${name}</h3><p>Price: $${price}</p><p>Stock: ${quantity}</p><p><b>Subtotal: $${multiplicar}</p></b><div data-id=${id}  class="btn_list_cart"> 
        <button class="btn_list menos">-</button>
        <p class="amount">Amount: ${amount}</p>
        <button class="btn_list sumar">+</button><img  
        class="img_trash trash" src="./img/5358270771574330938.svg" alt=""></div><div></div></div></div><div></div></div>`;
          ContentCart.innerHTML = bolsasCompradas;
        }
      );
    }
  });

  const resultCart = document.querySelector('.result_cart');

  window.addEventListener('click', function () {
    const itemsCantidad = Object.values(order).reduce(
      (acumular, { amount }) => acumular + amount,
      0
    );

    const precioTotal = Object.values(order).reduce(
      (acumular, { amount, price }) => acumular + amount * price,
      0
    );

    resultCart.innerHTML = `<div class="result_content"><div>Items: ${itemsCantidad}</div><div class="buy_btn"><p>buy</p><img  
 class="img_buy buy" src="./img/18562337021586788050.svg" alt=""></div><div>Total: ${precioTotal}</div></div>`;
  });

  

  function SumaryRestar() {
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('sumar')) {
        const id = event.target.parentElement.dataset.id;
        if (order[id].quantity > order[id].amount) {
          order[id].amount++;
        } else {
          alert('no tenemos mas');
        }
      }
    });

    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('menos')) {
        const id = event.target.parentElement.dataset.id;
        if (order[id].quantity > order[id].amount) {
          order[id].amount--;
        } else {
        }
      }
    });
  }
  SumaryRestar();

  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('trash')) {
      const id = event.target.parentElement.dataset.id;
      delete order[id];
    }
  });

  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('buy_btn')) {
      order = {};
    }
  });


// const carrito = document.getElementById("carrito");
// const cafe = document.getElementById("lista-cafe");
// const listaCafe = document.querySelector("#lista-carrito tbody");
// const vaciarCarritoBtn = document.getElementById("vaciar-carrito");


cargarEventListeners();

function cargarEventListeners() {
  CSSKeyframeRule.addEventListener("click", comprarCafe);
  carrito.addEventListener("click", eliminarCafe);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarCafe(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar__carrito')){
        const cafe = e.target.parentElement.parentElement;
        leerDatoscafe(cafe);
    }
}

function leerDatoscafe(cafe){
    const infoCafe = {
        imagen: cafe.querySelector('img').src,
        titulo: cafe.querySelector('h2').textContent,
        precio: cafe.querySelector('.product_price').textContent,
        id: cafe.querySelector('a').getAttribute('product_name')
    }

    insertarCarrito(infoCafe);
}

function insertarCarrito(cafe) {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
           <img src="${cafe.imagen}" width=100> 
       </td> 
       <td>${cafe.titulo}</td>
       <td>${cafe.precio}</td>
       <td>
        <a href="#" class="borrar-cafe" data-id="${cafe.id}">X</a>
       </td>
    `;
    listaCafes.appendChild(row);
    guardarCafeLocalStorage(cafe);
}

function eliminarCafe(e) {
    e.preventDefault();

    let cafe,
        cafeId;
    
    if(e.target.classList.contains('borrar-cafe)) {
        e.target.parentElement.parentElement.remove();
        cafe = e.target.parentElement.parentElement;
        cafeId = cafe.querySelector('a').getAttribute('data-id');
    }
    eliminarCafeLocalStorage(cafeId)  /*èlimina del carrito un cafe a la vez*/
}

function vaciarCarrito(){
    while(listaCafe.firstChild){
        listaCafe.removeChild(listaCafe.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarCafeLocalStorage(cafe) {
    let cafes;

    cafes = obtenerCafesLocalStorage();
    cafes.push(cafe);

    localStorage.setItem('cafes', JSON.stringify(cafes));
}

function obtenerCafesLocalStorage() { /*compruba que hay elementos en el LocalStorage*/
    let cafesLS;

    if(localStorage.getItem('cafes') === null) {/*si no hay cafes = null*/
        cafesLS = [];
    }else {
        cafesLS = JSON.parse(localStorage.getItem('cafes'));
    }
    return cafesLS;
}

function leerLocalStorage() {
    let cafesLS;

    cafesLS = obtenerCafesLocalStorage();

    cafesLS.forEach(function(cafe){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${cafe.imagen}" width=100>
            </td>
            <td>${cafe.titulo}</td>
            <td>${cafe.precio}</td>
            <td>
                <a href="#" class="borrar-cafe" data-id="${cafe.id}">X</a>
            </td>
        `;
        listacafes.appendChild(row);
    });
}

function eliminarCafeLocalStorage(cafe) {/*elimina el cafe de LocalStorge*/
    let cafesLS;
    cafesLS = obtenerCafesLocalStorage();

    cafesLS.forEach(function(cafeLS, index){
        if(cafeLS.id === cafe) {
            cafesLS.splice(index, 1);
        }
    });

    localStorage.setItem('cafes', JSON.stringify(cafesLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}
