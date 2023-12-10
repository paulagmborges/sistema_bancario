let { banco, contas , identificadorConta, depositos, saques, transferencias } = require('../bancodedados')

const listarContas =  (req ,res) => {
 
    const{senha_banco} = req.query
         if(!senha_banco){
             return res(400).json({mensagem:'A senha é obrigatória'})
 }
         if(senha_banco !== banco.senha){
             return res.status(401).json({mensagem:'A senha informada é inválida'})
 }     
   return res.status(200).json(contas) 
 }
 
const criarConta = (req,res) => {
    
    const { nome, cpf, data_nascimento, telefone, email ,senha } = req.body
    
        if ( !nome || !cpf || !data_nascimento || !telefone || !email || !senha){
            res.status(400).json({mensagem:'Todos os campos são obrigatórios'})
}
    
    const buscarCpfConta = contas.find(conta => {
            return conta.usuario.cpf === cpf
})  
        if (buscarCpfConta){
            return res.status(400).json({mensagem:'O CPF informado já exisite no cadastro!'})
}

    const buscarEmailConta = contas.find(conta => {
            return conta.usuario.email === email
})  
        if (buscarEmailConta){
            return res.status(400).json({mensagem:'O email informado já exisite no cadastro!'})
}
    
    const contaCriada = {
        numero:identificadorConta++,
        saldo:0,
        usuario:{
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
}
}
    contas.push(contaCriada)
        return res.status(201).json(contaCriada)
}

const atualizarContas = (req,res) => {
    
    const {numeroConta} = req.params

    const { nome, cpf, data_nascimento, telefone, email , senha } = req.body
    
        if ( !nome || !cpf || !data_nascimento || !telefone || !email || !senha){
            res.status(400).json({mensagem:'Todos os campos são obrigatórios'})
    }

    const conta = contas.find((conta) => {
            return conta.numero === Number(numeroConta)
})
    
    const buscarCpfConta = contas.find(conta => {
            return conta.usuario.cpf === cpf
})  
        if (buscarCpfConta){
            return res.status(400).json({mensagem:'O CPF informado já existe no cadastro!'})
}
    
    const buscarEmailConta = contas.find(conta => {
            return conta.usuario.email === email
})  
        if (buscarEmailConta){
            return res.status(400).json({mensagem:'O email informado já existe cadastrado'})
}

    conta.usuario.nome = nome,
    conta.usuario.cpf = cpf,
    conta.usuario.data_nascimento = data_nascimento,
    conta.usuario.telefone = telefone,
    conta.usuario.email = email,
    conta.usuario.senha = senha

        return res.status(203).send()
}


const excluirContas = (req,res) => {
    const { numeroConta } = req.params;
   
    const conta = contas.find((conta) => {
            return conta.numero === Number(numeroConta)
});

        if(!conta){
            return res.status(404).json({mensagem:'Conta bancária não encontrada!'})
    }

        if(conta.saldo !== 0){
            return res.status(400).json({mensagem:'A conta só pode ser removida se o saldo for zero!'})
    }

    contas = contas.filter((conta) =>{
            return conta.numero !== Number(numeroConta);
    });

            return res.status(204).send()
} 


const saldo = (req, res) => {

    const { numero_conta, senha } = req.query

    const conta = contas.find((conta) => {
            return conta.numero === Number(numero_conta)
});

        if(!conta){
            return res.status(404).json({mensagem:'Conta bancária não encontrada!'})
}
        if(!numero_conta || !senha){
            return res.status(400).json({mensagem:'Todos os campos são obrigatórios'})
}

        if(senha!== conta.usuario.senha){
            return res.status(400).json({mensagem:'A senha do banco informada é inválida!'})
};
            
    return res.json({mensagem: conta.saldo});

}

const extrato = (req, res) => {

    const { numero_conta, senha } = req.query

        if(!numero_conta || ! senha){
            return res.status(400).json({mensagem:'Todos os campos são obrigatorios'})
}

    const conta = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
});
        if(!conta){
            return res.status(400).json({mensagem:'Conta bancária não encontrada!'})
}
        if( senha!== conta.usuario.senha ){
            return res.status(400).json({mensagem:'A senha do banco informada é inválida!'})
}
    const extratoCompleto={   
         relatoriDeposito : depositos.filter((deposito) => {
            return deposito.numero_conta === numero_conta
        }),
         relatorioSaque : saques.filter((saque) => {
            return saque.numero_conta === numero_conta
        }),
         relatorioTransferenciaEnviada : transferencias.filter((transferenciaEnviada) => {
            return transferenciaEnviada.numero_conta_origem === numero_conta
        }),
         relatorioTransferenciaRecebida : transferencias.filter((transferenciaRecebida) => {
            return transferenciaRecebida.numero_conta_destino === numero_conta
        })
}
    
      contas.push(extratoCompleto)
      
      res.status(200).json(extratoCompleto)
    
}

module.exports = {
    listarContas,
    criarConta,
    atualizarContas,
    excluirContas,
    saldo,
    extrato
} 