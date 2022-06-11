let cart = [];
let user_info = {
  name: '',
  phone: '',
};

function check() {
  login();

  if (window.localStorage.user_info) {
    user_info = JSON.parse(window.localStorage.user_info)
    console.log(user_info);
    q('.user-info').dataset.name = user_info.name
    q('.form').remove();
  }
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
  div.className = `col-md-6 col-lg-4 p-2 pro   all ${clas}  ${category.split('\'')[0]}`;
  let btn = `
  <button class="btn btn-primary w-75 d-block m-auto add"> Add Cart</button>
`;
  div.innerHTML = `
  <div class="card ${en? 'xd':''}" data-id="${id}">
    <img class="img-fluid pr_img m-auto mt-5" src="${img_src}" alt="card_img">
    <div class="card-body" data-cat="${category}" data-id="${id}">
      <h5 class="card-title" data-price="${pr} $">${title}</h5>
      <p class="card-text  mt-2">${dis}</p>
      ${en ? btn : ''}
    </div>
  </div>`;


  return div;
}

function cat_li() {
  fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(categorys => {
      for (let i = 0; i < categorys.length; i++) {
        let li = document.createElement('li');
        li.classList = 'cat_btn w-100';

        let a = document.createElement('button');
        a.className = "dropdown-item btn btn-dark d-block w-100";
        a.textContent = categorys[i];

        li.setAttribute('data-filter', categorys[i].split('\'')[0]);
        li.appendChild(a);
        q('.cat').appendChild(li);
      }
      //  filter items by category
      filter(document.querySelectorAll('.cat_btn'));

    });

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
  });

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
          e.target.classList.remove('anim')
          count = parseInt(count) + 1;
          this.querySelector('.items').textContent = count;
          this.querySelector('.count').textContent = count;
          updatetota(count, this.dataset.id, this.querySelector('.total'), price);
          setTimeout(() => e.target.classList.add('anim'), 0);
        }
      } // end plus 
      else if (e.target.classList.contains('min')) {
        if (count > 0) {
          e.target.classList.remove('anim')
          count = parseInt(count) - 1;
          this.querySelector('.items').textContent = count;
          this.querySelector('.count').textContent = count;
          updatetota(count, this.dataset.id, this.querySelector('.total'), price);
          setTimeout(() => e.target.classList.add('anim'), 0);
        }
      } // end subtract
      else if (e.target.classList.contains('rm-rf')) {
        // remove item 
        cart.map(ma => {
          if (ma.id == this.dataset.id) {
            let index = cart.indexOf(ma)
            cart.splice(index, 1);
            let btns = document.querySelectorAll('.products_area .card-body');
            btns.forEach(bt => {
              if (bt.dataset.id == this.dataset.id) {
                bt.querySelector('.add').removeAttribute('disabled');
                setTimeout(() => bt.querySelector('.add').classList.remove('anim'), 0)
              }
            });
          }
        });
        save(JSON.stringify(cart));
        q('.cart_nav').textContent = cart.length;
        this.remove()
        if (cart.length == 0) {
          q('.cart_area').classList.toggle('active');
        }
        if (total_items.length != 0 && cart.length == 0) {
          window.location.href = `mailto:bassel444555@gmail.com?subject=Buy items&body=my phone is: {${user_info.phone}}${JSON.stringify(total_items)}`;
        }
      } // end remove 
      else if (e.target.classList.contains('acc')) {
        accept(this.dataset.id);
        this.querySelector('.rm-rf').click();
        if (cart.length == 0) {
          window.location.href = `mailto:bassel444555@gmail.com?subject=Buy items&body=my phone is: {${user_info.phone}}${JSON.stringify(total_items)}`;
          total_items = [];
        } // sent cart items to email and end step

      } // end Accept
      calc_total(cart);

    }); // end click event
    calc_total(cart);

  }); // end loop items
}
let total_items = [];

function accept(elId) {
  cart.forEach(item => {
    if (item.id === elId) {
      let info = {
        id: item.id,
        count: item.total,
        total_price: parseFloat(item.price) * item.total,
      }
      total_items.push(info);
    }
  });
  console.log(total_items);
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
    <span class="price">${product_price}</span><span class="items text-primary fw-bold fs-4">${total}</span>
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

function check_valid() {
  let valedName = /^[a-zA-Z ]{3,20}$/;
  let valedNum = /^[0-9]{11,11}$/;
  let v = false;
  q('#name').oninput = function() {
    if (valedName.test(q('#name').value)) {
      q('.name .validation').textContent = 'yor name is valid'
      q('.name .validation').classList.remove('bg-danger')
      q('.name .validation').classList.add('bg-success')
    } else {
      q('.name .validation').textContent = 'yor number isn\'t valid'
      q('.name .validation').classList.add('bg-danger')
    }
  }
  q('#phone').oninput = function() {
    if (valedNum.test(q('#phone').value)) {
      q('.phone .validation').textContent = 'yor number is valid';
      q('.phone .validation').classList.remove('bg-danger')
      q('.phone .validation').classList.add('bg-success')
    }
    else {
      q('.phone .validation').textContent = 'yor number isn\'t valid'
      q('.phone .validation').classList.add('bg-danger');
    }
  }
  return valedName.test(q('#name').value) && valedNum.test(q('#phone').value)
}

function login() {
  check_valid();
  q('form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (check_valid()) {
      user_info.name = q('#name').value;
      user_info.phone = q('#phone').value;
      window.localStorage.user_info = JSON.stringify(user_info);
      q('.form').remove();
    }
  });

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