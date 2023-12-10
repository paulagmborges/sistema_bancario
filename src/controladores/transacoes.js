let { contas, depositos, saques, transferencias } = require("../bancodedados");

    const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    const conta = contas.find((conta) => {
            return conta.numero === Number(numero_conta)
})
        if(!conta){
            return res.status(400).json({mensagem:"A conta informada não existe!" });
}
    
        if (!numero_conta || !valor) {
            return res.status(400).json({ mensagem: "Número da conta e valor são obrigatórios!" });
}
        if (valor <= 0) {
            return res.status(400).json({ mensagem: "Valor inválido" });
}

    conta.saldo += Number(valor);

    depositos.push({
        data: new Date().toLocaleString(),
        numero_conta: numero_conta,
        valor,
  })
  return res.status(204).send();
}
const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    const conta = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
  });

        if (conta.saldo <= 0) {
            return res.status(400).json({ mensagem: "O valor não pode ser menor que zero!" });
}

        if (!conta) {
            return res.status(400).json({ mensagem: "Conta bancária não encontrada" });
  }

        if (senha !== conta.usuario.senha) {
            return res.status(400).json({ mensagem: "A senha é inválida!" });
}

    conta.saldo -= Number(valor);

    saques.push({
        data: new Date().toLocaleString(),
        numero_conta: numero_conta,
        valor,
  });

            return res.status(204).send();
}
const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    const contaOrigem = contas.find((conta) => {
            return conta.numero === Number(numero_conta_origem);
  });
    const contaDestino = contas.find((conta) => {
            return conta.numero === Number(numero_conta_destino);
  });

        if (!contaOrigem || !contaDestino) {
            return res.status(400).json({ mensagem: "Conta bancária não encontrada" });
  }

  
        if (senha !== contaOrigem.usuario.senha) {
            return res.status(400).json({ mensagem: "A senha do banco informada é inválida!" });
  }

        if (contaOrigem.saldo < valor) {
            return res.status(400).json({ mensagem: "Saldo insuficiente!" });
  }
   


    contaOrigem.saldo -= Number (valor);
    contaDestino.saldo += Number (valor);

    transferencias.push({
        data: new Date().toLocaleString(),
        numero_conta_origem: numero_conta_origem,
        numero_conta_destino: numero_conta_destino,
        valor,
  })
        return res.status(204).send()

  }

module.exports = {
  depositar,
  sacar,
  transferir,
}