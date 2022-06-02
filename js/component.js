const cart = [];

function q(element) {
  return document.querySelector(element);
}

function Card(id, img_src, title, dis, pr, category, clas = '', en) {
  let div = document.createElement('div');
  div.className = `col-md-6 col-lg-4 p-2 pro  all ${clas}  ${category.split('\'')[0]}`;

  let card = document.createElement('div');
  card.className = "card bg-light";

  let card_img = document.createElement('img');
  card_img.className = "img-fluid pr_img m-auto mt-5";
  card_img.src = img_src;
  card_img.alt = "card_img";

  let card_body = document.createElement('div');
  card_body.className = "card-body";

  card_body.setAttribute('data-cat', category);
  card_body.setAttribute('data-id', id);

  div.appendChild(card);
  card.appendChild(card_img);
  card.appendChild(card_body);

  let card_title = document.createElement('h5');
  card_title.className = "card-title";
  card_title.textContent = title;
  card_title.setAttribute('data-price', pr + ' $');


  let card_dis = document.createElement('p');
  card_dis.className = "card-text  mt-2";
  card_dis.textContent = dis;

  card_body.appendChild(card_title);
  card_body.appendChild(card_dis);
  if (en) {
    let btn = document.createElement('button');
    btn.textContent = 'Add To Card';
    btn.className = "btn btn-primary add";

    card_body.appendChild(btn);
  }
  return div;
}

function cat_li(categorys) {
  for (let i = 0; i < categorys.length; i++) {
    let li = document.createElement('li');
    li.classList = 'cat_btn';

    let a = document.createElement('button');
    a.className = "dropdown-item btn btn-dark";
    a.textContent = categorys[i];

    li.setAttribute('data-filter', categorys[i].split('\'')[0]);
    li.appendChild(a);
    q('.cat').appendChild(li);
  }
}

function filter(arr) {
  arr.forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll(`.products_area .pro`)
        .forEach(el => {
          if (el.classList.contains(this.dataset.filter)) {
            el.style.display = 'block';
          } else {
            el.style.display = 'none';
          }
        });
    });
  })
}

function cart_item_logic() {
  let c_items = document.querySelectorAll('.cart_area .cart_item');
  c_items.forEach(el => {
    el.addEventListener('click', function(e) {
      let count = this.querySelector('.count').textContent;
      let items = this.querySelector('.items').textContent;
      let price = parseFloat(this.querySelector('.price').textContent);
      if (e.target.classList.contains('plus')) {
        if (count < 10) {
          count = parseInt(count) + 1;
          this.querySelector('.items').textContent = count;
          this.querySelector('.count').textContent = count;
          this.querySelector('.total').textContent = (count * price).toFixed(2);
        }
      } else if (e.target.classList.contains('min')) {
        if (count > 0) {
          count = parseInt(count) - 1;
          this.querySelector('.items').textContent = count;
          this.querySelector('.count').textContent = count
          this.querySelector('.total').textContent = (count * price).toFixed(2);
        }
      } else if (e.target.classList.contains('rm-rf')) {
        cart.map(ma => {
          if (ma.id == this.dataset.id) {
            let index = cart.indexOf(ma)
            cart.splice(index, 1);
            let btns = document.querySelectorAll('.products_area .card-body');
            btns.forEach(bt => {
              if (bt.dataset.id == this.dataset.id) {
                bt.querySelector('.add').removeAttribute('disabled');
              }
            })
          }
        });
        this.remove();
        q('.cart_nav').textContent = cart.length;
        // console.log(q('.cart_area').children.length)
      }
    })
  });
}

function cart_item(id, product_name, product_img, product_price) {
  let item = document.createElement('div');
  item.className = "cart_item position-relative  text-light p-2 border mt-2  rounded-3";
  item.setAttribute("data-id", id);

  let name = document.createElement('h5');
  name.className = 'name';
  name.textContent = product_name;

  let total = document.createElement('span');
  total.className = "total text-success  d-block text-center";

  let rm = document.createElement('button');
  rm.className = " rm-rf btn p-1 btn-danger end-0 top-0 position-absolute fw-bold";
  rm.textContent = "X";

  let item_container = document.createElement('div');
  item_container.className = "d-flex align-items-center justify-content-between";

  let img = document.createElement('img');
  img.src = product_img;
  img.alt = 'product_img';
  img.className = " cart_img rounded-3";

  let price = document.createElement('span');
  price.className = "price";
  price.textContent = product_price

  let items = document.createElement('span');
  items.className = "items text-primary fw-bold fs-4";
  let counter = document.createElement('div');

  let sub = document.createElement('span');
  sub.className = "btn btn-dark border min";
  sub.textContent = '-';

  let plus = document.createElement('span');
  plus.className = "btn btn-dark border plus"
  plus.textContent = '+';

  let count = document.createElement('span');
  count.textContent = 0;
  count.className = "btn btn-dark border count ms-1 me-1";


  item.appendChild(name);
  item.appendChild(total);
  item.appendChild(rm);
  item.appendChild(item_container);

  item_container.appendChild(img);
  item_container.appendChild(price);
  item_container.appendChild(items);
  item_container.appendChild(counter);

  counter.appendChild(sub);
  counter.appendChild(count);
  counter.appendChild(plus);


  return q('.cart_area').appendChild(item);
}


export {
  Card,
  q,
  cat_li,
  filter,
  cart_item_logic,
  cart_item,
  cart,
}
