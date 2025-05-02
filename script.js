document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('shopping-list');
    const totalDisplay = document.getElementById('total');
  
    const itens = [
      "Arroz (2)",
      "Açúcar (fardo)",
      "Feijão (2)",
      "Óleo (fardo)",
      "Leite",
      "Leite 0 lactose",
      "Cuscuz",
      "Tapioca",
      "Ovo",
      "Macarrão",
      "Massa de tomate",
      "Ketchup",
      "Maionese",
      "Toddy",
      "Sabão em pó",
      "Detergente",
      "Candidato",
      "Removedor",
      "Amaciante",
      "Saco de lixo"
    ];
  
    itens.forEach(nome => adicionarItem(nome));
  
    function adicionarItem(nome) {
      const li = document.createElement('li');
      li.className = 'shopping-item';
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'item-checkbox';
  
      const spanName = document.createElement('span');
      spanName.className = 'item-name';
      spanName.textContent = nome;
  
      const inputPrice = document.createElement('input');
      inputPrice.type = 'number';
      inputPrice.className = 'item-price';
      inputPrice.min = "0";
      inputPrice.step = "0.01";
      inputPrice.placeholder = "R$ 0,00";
  
      li.appendChild(checkbox);
      li.appendChild(spanName);
      li.appendChild(inputPrice);
      list.appendChild(li);
  
      checkbox.addEventListener('change', updateTotal);
      inputPrice.addEventListener('input', updateTotal);
    }
  
    function updateTotal() {
      let total = 0;
      document.querySelectorAll('.shopping-item').forEach(item => {
        const checkbox = item.querySelector('.item-checkbox');
        const priceInput = item.querySelector('.item-price');
        const price = parseFloat(priceInput.value) || 0;
  
        if (checkbox.checked) {
          total += price;
        }
      });
      totalDisplay.textContent = ` Total: R$ ${total.toFixed(2)}`;
    }
  });