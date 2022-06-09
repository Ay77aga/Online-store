let cart = [];

function check() {
  if (window.localStorage.cart_stor) {
    cart = JSON.parse(window.localStorage.cart_stor)
    cart.forEach(item => {
      cart_item(item.id, item.name, item.src, item.price, item.total);
      document.querySelectorAll('.pro .xd').forEach(el => {
        if (item.id == el.dataset.id) {
          el.querySelector('.add').setAttribute('disabled', '');
        }
      });
    });
    q('.cart_nav').textContent = cart.length;
    cart_item_logic();
    calc_total(cart);
  }
}

function calc_total(arr) {
  let result = 0;
  arr.forEach(pr => {
    result += pr.total * parseFloat(pr.price);
  });
  q('.total_price').textContent = result.toFixed(2) + '  $';
}

function q(element) {
  return document.querySelector(element);
}

function Card(id, img_src, title, dis, pr, category, clas = '', en) {
  let div = document.createElement('div');
  div.className = `col-md-6 col-lg-4 p-2 pro  all ${clas}  ${category.split('\'')[0]}`;
  let btn = `
  <button class="btn btn-primary w-75 d-block m-auto add"> Add Cart</button>
`;
  div.innerHTML = `
  <div class="card bg-light ${en? 'xd':''}" data-id="${id}">
    <img class="img-fluid pr_img m-auto mt-5" src="${img_src}" alt="card_img">
    <div class="card-body" data-cat="${category}" data-id="${id}">
      <h5 class="card-title" data-price="${pr} $">${title}</h5>
      <p class="card-text  mt-2">${dis}</p>
      ${en ? btn : ''}
  </div>
  </div>
`;


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
        if (count < 20) {
          count = parseInt(count) + 1;
          this.querySelector('.items').textContent = count;
          this.querySelector('.count').textContent = count;
          updatetota(count, this.dataset.id, this.querySelector('.total'), price);

        }
      } else if (e.target.classList.contains('min')) {
        if (count > 0) {
          count = parseInt(count) - 1;
          this.querySelector('.items').textContent = count;
          this.querySelector('.count').textContent = count
          updatetota(count, this.dataset.id, this.querySelector('.total'), price);
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
        save(JSON.stringify(cart));
        calc_total(cart);
        this.remove();
        q('.cart_nav').textContent = cart.length;
        // console.log(q('.cart_area').children.length)
      }
    })
  });
  calc_total(cart);
}

function updatetota(count, id, el, price) {
  cart.map(map => {
    if (map.id == id) {
      map.total = count;
      el.textContent = (map.total * price).toFixed(2);
      calc_total(cart);
      save(JSON.stringify(cart));
    }
  });

}

function cart_item(id, product_name, product_img, product_price, total = 1) {
  let item = document.createElement('div');
  item.className = "cart_item position-relative  text-light p-1 border m-3 mt-4   rounded-3";
  item.setAttribute("data-id", id);
  let t_p = total * parseFloat(product_price);
  item.innerHTML = `
  <h5 class="name">${product_name}</h5>
  <span class="total text-success  d-block text-center">${total * parseFloat(product_price)}</span>
  <button class=" rm-rf btn p-1 btn-danger end-0 top-0 position-absolute fw-bold">X</button>
  <div class="d-flex align-items-center justify-content-between">
    <img src="${product_img}" alt="product_img" class=" cart_img rounded-3">
    <span class="price">${product_price} $</span><span class="items text-primary fw-bold fs-4">${total}</span>
    <div>
      <span class="btn btn-dark border min">-</span><span class="btn btn-dark border count ms-1 me-1">${total}</span><span class="btn btn-dark border plus">+</span>
    </div>
</div>
  <button class="btn btn-primary w-50 d-block m-auto mt-1 acc"> Accept</button>
`;
  return q('.cart_area').appendChild(item);
}

function save(arr) {
  window.localStorage.cart_stor = arr;
}
export {
  Card,
  q,
  cat_li,
  filter,
  cart_item_logic,
  cart_item,
  cart,
  save,
  check,
}