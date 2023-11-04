'use strict'; // Modo restrito

// Consumindo API de CEP, do Viacep

// https://viacep.com.br/


// Função para limpar o formulário
const limparFormulario = () => {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';

}

// Verifica se Cep é valido
const eNumero = (numero) => /^[0-9]+$/.test(numero); //testa número informado com expresão regular
const cepValido = (cep) => cep.length == 8 && eNumero(cep);// Verifica tamanho do cep digite e executa função de validação do cep eNumero

//função para preencher formulario
const preencherFormulario = (endereco) => {
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;

}

//Consumo da API da ViaCEp
const pesquisarCep = async () => {
    limparFormulario();
    const url = `http://viacep.com.br/ws/${cep.value}/json/`;

    if (cepValido(cep.value)) {
        const dados = await fetch(url); //aguadar
        const addres = await dados.json();
        // hasOwnProperty retorna um boleano indicando se o objeto possui a propriedade especificada como uma propriedade definida no próprio objeto em questão

        if (addres.hasOwnProperty('erro')) {
            alert('CEP não encontrado');
        } else {
            preencherFormulario(addres);
        }
    } else {
        alert('CEP Incorreto');
    }
}
//Adiciona evento DOM ao input do CEP para executar função pesquisarCep

document.getElementById('cep').addEventListener('focusout', pesquisarCep);