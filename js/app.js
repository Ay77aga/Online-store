import { Card, q, cat_li, cart_item_logic, cart_item, cart, save, check } from './component.js';
const API = "https://fakestoreapi.com/products";


const request = new XMLHttpRequest();
request.onreadystatechange = function() {
  if (request.readyState === 4 && request.status === 200) {

    //remove loader
    q('.loader').remove();

    const data = JSON.parse(request.responseText);
    // console.log(data);

    // render products in page 
    data.map(m => {
      q('.sle').appendChild(Card(m.id, m.image, m.title, m.description, m.price, m.category, 'carousel-item ', false))
      q('.products_area').appendChild(Card(m.id, m.image, m.title, m.description, m.price, m.category, '', true));
      // catch category()
    });

    // render category and set filter 
    cat_li();

    //  set active slide
    document.querySelectorAll('.carousel-item')[0].classList.add('active')

    // get add to cart btns
    let add_btns = Array.from(document.querySelectorAll('.pro'))
    add_btns.forEach(btn => {
      btn.addEventListener('click', function(e) {

        if (e.target.classList.contains('add')) {
          q('.cart_area').textContent = '';
          this.querySelector('.add').classList.add('anim');

          // handling product data and push to cart array
          cart.push({
            id: this.querySelector('.card-body').dataset.id,
            name: this.querySelector('h5').textContent,
            price: this.querySelector('h5').dataset.price,
            src: this.querySelector('img').src,
            total: 1,
          });

          // save items in local storage
          save(JSON.stringify(cart));
          // console.log(cart)

          // render items in cart data
          cart.forEach(item => {
            cart_item(item.id, item.name, item.src, item.price, item.total);
          });
          // add cart item logic
          cart_item_logic();
          q('.cart_nav').textContent = cart.length;
          this.querySelector('.add').setAttribute('disabled', '');
        } // end if btn add
      }); // end click event
    }); // end loop btns
    // check cart in local storage and render it
    check();

  } // end if [request state]
} //endl request function
request.open('GET', API, );
request.send();

// toggel cart btn
q('.cart').addEventListener('click', function() {
  q('.cart_area').classList.toggle('active')
  document.querySelectorAll('.cart_area .cart_item').forEach((el, i) => {
    el.classList.remove('anim');
    setTimeout(() => el.classList.add('anim'), i * 300);
  });
});
