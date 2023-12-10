const express = require ('express');

const {
    listarContas,
    criarConta,
    atualizarContas,
    excluirContas,
    saldo,
    extrato
    
} = require('./controladores/contas')

const {
    
    depositar,
    sacar,
    transferir,
    
} = require('./controladores/transacoes')

const rotas = express();


rotas.get('/contas',listarContas);
rotas.post('/contas',criarConta);
rotas.put('/contas/:numeroConta/usuario',atualizarContas);
rotas.delete('/contas/:numeroConta',excluirContas);
rotas.post('/transacoes/depositar',depositar);
rotas.post('/transacoes/sacar',sacar);
rotas.post('/transacoes/transferir',transferir)
rotas.get('/contas/saldo',saldo)
rotas.get('/contas/extrato',extrato)

module.exports = rotas;