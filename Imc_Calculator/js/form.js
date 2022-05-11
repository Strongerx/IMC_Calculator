/**
 * Classe responsável por criar os elementos no html e organizar
 */

var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function (event) {
    event.preventDefault();

    var form = document.querySelector("#form-adiciona")
    var paciente = obtemPacienteDoFormulario(form);
    var erros = validaPaciente(paciente);

    if (erros.length > 0) {
        exibeMensagemDeErro(erros);
        return;
    }

    adicionaPacienteNaTabela(paciente);

    form.reset();
    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";

});

function adicionaPacienteNaTabela(paciente) {
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function exibeMensagemDeErro(erros) {
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";
    erros.forEach(function (erro) {            // para cada um do array de erro 
        var li = document.createElement("li"); //executa a função que cria um li 
        li.textContent = erro;                 //cm o valor do erro
        ul.appendChild(li);
    });
}

function obtemPacienteDoFormulario(form) {
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    return paciente;
}

function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));


    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente) {
    var erros = [];
    if (!validaPeso(paciente.peso)) erros.push("Peso é invalido");
    if (!validaAltura(paciente.altura)) erros.push("Altura é invalida");
    if (paciente.nome.length == 0) erros.push("O nome não pode ser em branco");
    if (paciente.gordura.length == 0) erros.push("A gordura não pode ser em branco");
    if (paciente.peso.length == 0) erros.push("O peso não pode ser em branco")
    if (paciente.altura.length == 0) erros.push("A altura não pode ser em braco");
    return erros;
}
