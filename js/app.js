import { Card, q, cat_li } from './component.js';
const API = "https://fakestoreapi.com/products";

let cart = [];


//  start loading
// document.body.style.background = 'lime';


const request = new XMLHttpRequest();
request.onload = function() {
  if (request.status === 200) {
    const data = JSON.parse(request.responseText);
    console.log(data);
    let cats = [];
    data.map(m => {
      q('.sle').appendChild(Card(m.id, m.image, m.title, m.description, m.price, m.category, 'carousel-item '))
      q('.products_area').appendChild(Card(m.id, m.image, m.title, m.description, m.price, m.category));
      if (!cats.includes(m.category))
        cats.push(m.category)
    });
    cat_li(cats);
    filter(document.querySelectorAll('.cat_btn'));
    document.querySelectorAll('.carousel-item')[0].classList.add('active')


    let add_btns = Array.from(document.querySelectorAll('.add'))

    add_btns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        add_to_cart(e)
      });
    });

  } // end if
}
request.onloadend = function() {
  //  remove loding

}
request.open('GET', API, true);
request.send();

function add_to_cart(e) {
  cart.push(
  {
    id: e.target.parentElement.dataset.id,
    productName: e.target.parentElement.querySelector('h4').textContent,
    price: e.target.parentElement.querySelector('h4').dataset.pric,
    category: e.target.parentElement.dataset.cat,
  });
  render_to_cart(cart);
}


function render_to_cart(arr) {
  console.log(arr);

}

function filter(arr) {
  arr.forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll(`.products_area .pro`)
        .forEach(el => {
          if (el.classList.contains(this.dataset.filter)) {
            el.style.display = 'block'
          } else {
            el.style.display = 'none'
          }
        });
      console.log(this.dataset.filter)
    });
  })
}