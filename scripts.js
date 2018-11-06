const ENTER_KEYCODE = 13;
let test = 1;
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka
    _items.addEventListener("click",function(e) {
      console.log(e.target);
      console.log(document.activeElement);
        check(e);
        deleteItem(e);
        edit(e);
    });

    _items.addEventListener("keyup",function(e){
      commit(e);
    });
  }

  function formHandler(e) {
    e.preventDefault();
    val = document.querySelector(".form__input").value;
    console.log();
    if(val.trim() != ""){ 
      add(val);
      
    }
    document.querySelector(".form__input").value = "";
  }

  // event handler fyrir það að klára færslu
  function check(e) {
    if(e.target.classList.contains("item__checkbox")){
        e.target.parentNode.classList.toggle("item--done");
      }
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    if(e.target.className == "item__text"){
      let text = e.target.innerHTML;
      let inp = el("input","item__edit",null,"text");
      inp.value = text;
      e.target.parentNode.replaceChild(inp, e.target);
      inp.focus();
    }
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    let activeEl = document.activeElement;
    if(activeEl.classList.contains("item__edit") && e.keyCode == ENTER_KEYCODE){
      let text = activeEl.value;
      let span = el("span","item__text",null);
      span.innerHTML = text;
      activeEl.parentNode.replaceChild(span,activeEl);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    var li =  el("li","item",null);
    var cb = el("input","item__checkbox",null,"checkbox");
    var span = el("span","item__text",null);
    var button = el("button","item__button",null);
    button.innerHTML = "Eyða";
    span.innerHTML = value;
    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(button);
    items.appendChild(li);


  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    if(e.target.classList.contains("item__button")){
      e.target.parentNode.remove();
    }

  }
  // hjálparfall til að útbúa element
  function el(type, className, clickHandler,input = null) {
    let elem  = document.createElement(type);
    elem.classList.add(className);
   //elem.onclick = deleteItem();
    if(input != null){
      elem.setAttribute("type",input)
    }
    return elem;
  }

  return {
    init: init
  }
})();
