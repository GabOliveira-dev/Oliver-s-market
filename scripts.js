//globais

//códigos dos produtos
const produtos = {
    101: { nome: "Arroz", preco: 20 },
    102: { nome: "Feijão", preco: 10 },
    103: { nome: "Macarrão", preco: 8 },
    104: { nome: "Açúcar", preco: 6 },
    105: { nome: "Café", preco: 15 },
    106: { nome: "Leite", preco: 5 },
    107: { nome: "Óleo", preco: 7 },
    108: { nome: "Sal", preco: 3 },
    109: { nome: "Farinha", preco: 4 },
    110: { nome: "Biscoito", preco: 2 },

    111: { nome: "Refrigerante", preco: 9 },
    112: { nome: "Suco", preco: 7 },
    113: { nome: "Água", preco: 3 },
    114: { nome: "Cerveja", preco: 6 },
    115: { nome: "Vinho", preco: 25 },

    116: { nome: "Carne", preco: 30 },
    117: { nome: "Frango", preco: 18 },
    118: { nome: "Peixe", preco: 22 },
    119: { nome: "Ovos", preco: 12 },
    120: { nome: "Queijo", preco: 14 },

    121: { nome: "Manteiga", preco: 8 },
    122: { nome: "Margarina", preco: 6 },
    123: { nome: "Iogurte", preco: 5 },
    124: { nome: "Chocolate", preco: 4 },
    125: { nome: "Sorvete", preco: 20 },

    126: { nome: "Detergente", preco: 3 },
    127: { nome: "Sabão", preco: 5 },
    128: { nome: "Shampoo", preco: 12 },
    129: { nome: "Papel Higiênico", preco: 10 },
    130: { nome: "Creme Dental", preco: 6 }
}

//Verificação/criação 
const BTNAdicionar = document.getElementById("BNTadcionar")

BTNAdicionar.addEventListener("click", () => {
    //Valores
    const codigoDosProdutos = document.getElementById("códigoDoproduto").value
    const QTDdosprodutos = document.getElementById("QTDDoproduto").value

    //verificação
    if (codigoDosProdutos.trim() === ""){
        alert("Coloque o código do produto")
        return
    }else if (QTDdosprodutos.trim() === ""){
        alert("Coloque a quantidade do produto")
        return
    }else {
        //Verificação se o código está certo
        const codigo = parseInt(codigoDosProdutos)
        const qtd = parseInt(QTDdosprodutos)
        const tabela = document.getElementById("tabela")

        if (produtos[codigo]){
            //Criando
            const tr = document.createElement("tr")
            const thPro = document.createElement("th")
            thPro.textContent = `${produtos[codigo].nome}`
            const thQTD = document.createElement("th")
            thQTD.textContent = `${QTDdosprodutos}`
            const thPre = document.createElement("th")
            thPre.textContent = `R$${produtos[codigo].preco}`
            const thSub = document.createElement("th")
            const Subtotal = produtos[codigo].preco * qtd
            thSub.textContent = `R$${Subtotal}`

            //Posicionando
            tabela.appendChild(tr)
            tr.appendChild(thPro)
            tr.appendChild(thQTD)
            tr.appendChild(thPre)
            tr.appendChild(thSub)
        }else{
            alert("este código não está registrado no sistema")
        }
    }
})
