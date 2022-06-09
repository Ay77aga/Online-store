import { Card, q, cat_li, filter, cart_item_logic, cart_item, cart, save, check } from './component.js';
const API = "https://fakestoreapi.com/products";


const request = new XMLHttpRequest();
request.onreadystatechange = function() {
  if (request.readyState === 4 && request.status === 200) {
    //remove loader
    q('.loader').remove();
    const data = JSON.parse(request.responseText);
    // console.log(data);
    let cats = [];
    data.map(m => {
      q('.sle').appendChild(Card(m.id, m.image, m.title, m.description, m.price, m.category, 'carousel-item ', false))
      q('.products_area').appendChild(Card(m.id, m.image, m.title, m.description, m.price, m.category, '', true));
      // catch category()
      if (!cats.includes(m.category))
        cats.push(m.category)
    });
    // Set Category in nav
    cat_li(cats);
    //  filter items by category
    filter(document.querySelectorAll('.cat_btn'));
    //  set active slide
    document.querySelectorAll('.carousel-item')[0].classList.add('active')

    // get add to cart btns
    let add_btns = Array.from(document.querySelectorAll('.pro'))
    add_btns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        this.querySelector('.add').classList.add('anim');
        if (e.target.classList.contains('add')) {
          q('.cart_area').textContent = '';
          // catch product data
          cart.push({
            id: this.querySelector('.card-body').dataset.id,
            name: this.querySelector('h5').textContent,
            price: this.querySelector('h5').dataset.price,
            src: this.querySelector('img').src,
            total: 1,
          });
          save(JSON.stringify(cart));
          // console.log(cart)
          // render in cart data
          cart.forEach(item => {
            cart_item(item.id, item.name, item.src, item.price, item.total);
          });
          cart_item_logic();
          q('.cart_nav').textContent = cart.length;
          this.querySelector('.add').setAttribute('disabled', '');
        }
      });
    });
    check();

  } // end if [request state]
}
request.open('GET', API, );
request.send();

q('.cart').addEventListener('click', function() {
  q('.cart_area').classList.toggle('active')
  document.querySelectorAll('.cart_area .cart_item').forEach((el,i) => {
    el.classList.remove('anim');
    setTimeout(() => el.classList.add('anim'), i * 300);

  })
});
