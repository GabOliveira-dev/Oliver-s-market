//globais
let descontoAtual = 0
let Pcarrinho = []

carregarCarrinho()

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

function criarLinha(codigo, nome, quantidade, preco) {
    const tr = document.createElement("tr");

    // ligação com o código
    tr.setAttribute("data-codigo", codigo);

    const thPro = document.createElement("th");
    thPro.textContent = nome;

    const thQTD = document.createElement("th");
    thQTD.textContent = quantidade;

    const thPre = document.createElement("th");
    thPre.textContent = `R$${preco}`;

    const thSub = document.createElement("th");
    const subtotal = preco * quantidade;
    thSub.textContent = `R$${subtotal}`;

    const imgApagar = document.createElement("img")
    imgApagar.src = "img/Apagar.png"
    const BNTApagar = document.createElement("button")
    BNTApagar.classList.add("BMTApagar")

    BNTApagar.appendChild(imgApagar);
    tr.appendChild(thPro);
    tr.appendChild(thQTD);
    tr.appendChild(thPre);
    tr.appendChild(thSub);
    tr.appendChild(BNTApagar)

    tabela.appendChild(tr);

    //Apagar um item 
    BNTApagar.addEventListener("click", () => {
    // pegar o código da linha
    const codigo = Number(tr.getAttribute("data-codigo"))

    // remover do array
    Pcarrinho = Pcarrinho.filter(item => item.codigo !== codigo)

    // atualizar localStorage
    localStorage.setItem("carrinho", JSON.stringify(Pcarrinho))

    // remover da tela
    tr.remove()

    // atualizar total
    atualizarTotalGeral()
    })

    return(tr)
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
    }else{
    if (produtos[codigoDosProdutos]){
        const linhaExistente = document.querySelector(`tr[data-codigo="${codigoDosProdutos}"]`)

        if (linhaExistente) {
            const quantidade = Number(QTDdosprodutos)
            const QTDNova = Number(linhaExistente.children[1].textContent)
            const resultado = QTDNova + quantidade
            const thQTD = linhaExistente.children[1]
            thQTD.textContent = `${resultado}`
            const thSub = linhaExistente.children[3]
            const Sub = resultado * produtos[codigoDosProdutos].preco
            thSub.textContent = `R$${Sub}`
        } else {
            criarLinha(codigoDosProdutos, produtos[codigoDosProdutos].nome, Number(QTDdosprodutos), produtos[codigoDosProdutos].preco)
            carrinho()
        }
    }else{ 
        alert("Código não detectado") 
    }} 
    atualizarTotalGeral()
})

function atualizarTotalGeral (){
    const Tdesconto = document.getElementById("DescontoV")
    const totalT = document.getElementById("Total")
    const todosOsDatas = document.querySelectorAll(`tr[data-codigo]`)
    let total = 0 
    let final = 0
    todosOsDatas.forEach((linha) => {
        let Subs =  linha.children[3].textContent
        console.log(linha.children)
        Subs = Subs.replace("R$", "")
        Subs = Number(Subs)
        total += Subs
    })
    if(total < descontoAtual){
        descontoAtual = total
        final = total - descontoAtual
    }else{
        final = total - descontoAtual
    }
    Tdesconto.textContent = `R$${descontoAtual}`
    totalT.textContent = `R$ ${final}`
    return total
} 

//Remover todas as compras
const BNTRemover = document.getElementById("BNTRemover")

BNTRemover.addEventListener("click", () => {
    const simOuNao = confirm("Você tem certeza?")
    if (simOuNao == true){
        const TRs = document.querySelectorAll((`tr[data-codigo]`))
        TRs.forEach(el => el.remove());
        atualizarTotalGeral()
        document.getElementById("códigoDoproduto").value = ""
        document.getElementById("QTDDoproduto").value = ""
        Pcarrinho = []
        localStorage.setItem("carrinho", JSON.stringify(Pcarrinho))
        return
    }else{
        return
    }
})

//Desconto
const desconto = document.getElementById("BNTdesconto")
desconto.addEventListener("click", () => {
    const Tdesconto = document.getElementById("DescontoV")

    const porcentagem = prompt("De quanto vai ser o desconto?")
    console.log(porcentagem)
    if (porcentagem === null) {
        return
    }else{
        if (porcentagem.trim() === ""){
            alert("Coloque o desconto")
        }else if (Number.isNaN(Number(porcentagem))){
            alert("Desconto inválido")
            return
        } else {
            const Nporcentagem = Number(porcentagem)
            const Tporcentagem = Nporcentagem / 100
            const totalF = atualizarTotalGeral()
            let resultado = totalF * Tporcentagem
            resultado = Math.round(resultado * 100) / 100
            descontoAtual = resultado
            atualizarTotalGeral()
            Tdesconto.textContent = `R$${resultado}`    
        }
    }
})

const completarCompra = document.getElementById("BTNcompletarCompra")
completarCompra.addEventListener("click", () => {
    document.querySelector(".overlay").classList.add("ativo")
    document.querySelector(".comprovante").classList.add("ativo")
    gerarComprovante()
})

const overlay = document.querySelector(".overlay")

overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
        const ativos = document.querySelectorAll(".ativo")

        ativos.forEach(ativo => {
            ativo.classList.remove("ativo")
        })
    }
})

function gerarComprovante (){
    const total = document.getElementById("Total").textContent
    const Desconto = document.getElementById("DescontoV").textContent
    console.log(total, Desconto)
    const TRs = document.querySelectorAll((`tr[data-codigo]`))
    const tabelaComprovante = document.getElementById("tabelaComprovante")
   tabelaComprovante.innerHTML = ""

    TRs.forEach((linha) => {
        const produto = linha.children[0].textContent
        const QTD = linha.children[1].textContent
        const preço = linha.children[2].textContent
        const subtotal = linha.children[3].textContent    

        const tr = document.createElement("tr")
        const tdPro = document.createElement("td");
        tdPro.textContent = produto;

        const tdQTD = document.createElement("td");
        tdQTD.textContent = QTD;

        const tdPre = document.createElement("td");
        tdPre.textContent = preço;

        const tdSub = document.createElement("td");
        tdSub.textContent = subtotal;

        tabelaComprovante.appendChild(tr)
        tr.appendChild(tdPro)
        tr.appendChild(tdQTD)
        tr.appendChild(tdPre)
        tr.appendChild(tdSub)
    })
    document.getElementById("TotalV").textContent = `${total}`
        document.getElementById("Desconto").textContent = `${Desconto}`
}

function carrinho (){
    const codigoDosProdutos = document.getElementById("códigoDoproduto").value 
    const QTDdosprodutos = document.getElementById("QTDDoproduto").value 

    if(!produtos[codigoDosProdutos]){
        console.error("Produto não existe")
        return
    }else{
        const codigo = Number(codigoDosProdutos) 
        const nome = produtos[codigoDosProdutos].nome 
        const QTD = Number(QTDdosprodutos) 
        const preco = Number(produtos[codigoDosProdutos].preco)
        let elementos = {
            codigo:codigo, nome:nome, qtd:QTD, preco:preco
        }
        Pcarrinho.push(elementos)
        let PcarrinhoC = JSON.stringify(Pcarrinho)
        localStorage.setItem("carrinho", PcarrinhoC)
    }
}

function carregarCarrinho (){
    let elementoDoLocalStorage = localStorage.getItem("carrinho")
    if (elementoDoLocalStorage){
        elementoDoLocalStorage = JSON.parse(elementoDoLocalStorage)
        Pcarrinho = elementoDoLocalStorage
        Pcarrinho.forEach((item) => {
            criarLinha(item.codigo, item.nome, item.qtd, item.preco)
            atualizarTotalGeral()
        })
    }else{
        console.error("Não tem nada")
    }
}

//Botão checar preço
const BNTchecarPreço = document.getElementById("BNT-ChecarPreço")

BNTchecarPreço.addEventListener("click", () => {
    overlay.classList.add("ativo")
    document.querySelector(".ChecarPreco").classList.add("ativo")
})

const BNTBuscar = document.getElementById("buscar")
BNTBuscar.addEventListener("click", () => {
    const codigo = Number(document.getElementById("INPcode").value)
    const produto = produtos[codigo]
    if (produto){
        const item = document.querySelector(".ChecarPreco")
        const resultado = document.getElementById("resultado")
        resultado.innerHTML = ""

        const preco = produto.preco
        const nome = produto.nome
        
        const Pproduto = document.createElement("p")
        Pproduto.textContent = `O produto ${nome} tem o valor de R$${preco}`

        resultado.appendChild(Pproduto)
    }else{
        console.error("Produto não encontrado.")
    }
})