const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach( (elemento) => {
    criaElemento(elemento);
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome']; //pega pelo nome do input de nome
    const quantidade = evento.target.elements['quantidade']; //pega pelo nome do input de qtdeconst quantidade = 

    const existe = itens.find( elemento => elemento.nome === nome.value); //verifica se o elemento com o mesmo nome ja existe

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) { //se o elemento existe apenas atualiza
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual; //altera o array do item informado
    } else { //se nao encontra cria o elemento
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual);

        itens.push(itemAtual); //inserir item em um array
    }

    localStorage.setItem("itens", JSON.stringify(itens)); //salva no localstorage do navegador como JSON

    nome.value = "";
    quantidade.value = "";
})

function criaElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade; 
    numeroItem.dataset.id = item.id; //cria o dataset id dentro da tag

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;    
}

function botaoDeleta(id) {
    // Cria um elemento de imagem
    const elementoImg = document.createElement("img");
    
    // Define o atributo src da imagem
    elementoImg.src = "assets/delete.svg"; // Substitua pelo caminho da imagem desejada

    elementoImg.width = 25;
    elementoImg.style.cursor = "pointer";
    
    // Adiciona um evento de clique à imagem
    elementoImg.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    });

    return elementoImg;
}


function deletaElemento(tag, id) {
    tag.remove(); //remove a tag

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1); //remove o item do array

    localStorage.setItem("itens", JSON.stringify(itens));
}
