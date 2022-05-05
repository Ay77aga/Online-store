function q(element) {
  return document.querySelector(element);
}

function Card(id, img_src, title, dis, pr, category, clas = '') {
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

  card_body.setAttribute('data-cat',category);
  card_body.setAttribute('data-id', id);

  div.appendChild(card);
  card.appendChild(card_img);
  card.appendChild(card_body);

  let card_title = document.createElement('h5');
  card_title.className = "card-title";
  card_title.textContent = title;
  card_title.setAttribute('data-pric', pr + ' $');


  let card_dis = document.createElement('p');
  card_dis.className = "card-text text-primary mt-3";
  card_dis.textContent = dis;

  card_body.appendChild(card_title);
  card_body.appendChild(card_dis);

  let btn = document.createElement('button');
  btn.textContent = 'Add To Card';
  btn.className = "btn btn-primary add";


  card_body.appendChild(btn);

  return div;
}

function cat_li(categorys) {
  for (let i = 0; i < categorys.length ; i++) {
    let li = document.createElement('li');
    li.classList = 'cat_btn';
    let a = document.createElement('button');
    a.className = "dropdown-item btn btn-dark";
    a.textContent = categorys[i];
    li.setAttribute('data-filter',categorys[i].split('\'')[0]);
    li.appendChild(a);
    q('.cat').appendChild(li);
  }
}


export {
  Card,
  q,
  cat_li
}
