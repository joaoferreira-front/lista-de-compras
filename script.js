document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('shopping-list');
  const totalDisplay = document.getElementById('total');
  const form = document.getElementById('add-item-form');
  const inputName = document.getElementById('item-name-input');

  let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

  function salvarLista() {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }

  function updateTotal() {
    let total = 0;
    items.forEach(item => {
      if (item.checked) {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;
        total += price * quantity;
      }
    });
    totalDisplay.textContent = `Total: R$ ${total.toFixed(2)}`;
  }

  function adicionarItemNaTela(itemData) {
    const li = document.createElement('li');
    li.className = 'shopping-item';
    if (itemData.checked) li.classList.add('checked');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = itemData.checked;

    const spanName = document.createElement('span');
    spanName.className = 'item-name';
    spanName.textContent = itemData.name;

    const groupQty = document.createElement('div');
    groupQty.className = 'input-label-group';
    const labelQty = document.createElement('label');
    labelQty.textContent = 'Quantidade';
    const inputQty = document.createElement('input');
    inputQty.type = 'number';
    inputQty.value = itemData.quantity;
    inputQty.min = "1";
    groupQty.appendChild(labelQty);
    groupQty.appendChild(inputQty);

    const groupPrice = document.createElement('div');
    groupPrice.className = 'input-label-group';
    const labelPrice = document.createElement('label');
    labelPrice.textContent = 'Valor (R$)';
    const inputPrice = document.createElement('input');
    inputPrice.type = 'number';
    inputPrice.value = itemData.price;
    inputPrice.step = "0.01";
    groupPrice.appendChild(labelPrice);
    groupPrice.appendChild(inputPrice);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = "🗑️";

    li.appendChild(checkbox);
    li.appendChild(spanName);
    li.appendChild(groupQty);
    li.appendChild(groupPrice);
    li.appendChild(removeBtn);
    list.appendChild(li);

    function updateData() {
      itemData.checked = checkbox.checked;
      itemData.price = inputPrice.value;
      itemData.quantity = inputQty.value;
      salvarLista();
      updateTotal();
      li.classList.toggle('checked', itemData.checked);
    }

    checkbox.addEventListener('change', updateData);
    inputQty.addEventListener('input', updateData);
    inputPrice.addEventListener('input', updateData);

    removeBtn.addEventListener('click', () => {
      items = items.filter(i => i !== itemData);
      salvarLista();
      renderLista();
    });
  }

  function renderLista() {
    list.innerHTML = '';
    items.forEach(item => adicionarItemNaTela(item));
    updateTotal();
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = inputName.value.trim();
    if (name !== "") {
      const newItem = { name, checked: false, price: "", quantity: "1" };
      items.push(newItem);
      salvarLista();
      renderLista();
      inputName.value = "";
    }
  });

  renderLista();
});
