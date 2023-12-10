

const listarContas =  (req ,res) => {
 
    const{senha_banco} = req.query;
         if(!senha_banco){
             return res(400).json({mensagem:"A senha é obrigatória"})
 }
         if(senha_banco !== banco.senha){
             return res.status(401).json({mensagem:"A senha informada é inválida"})
 }     
   return res.status(200).json(contas) 
 };
 
 const criarConta = (req,res) => {
    
    const { nome, cpf, data_nascimento, telefone, email ,senha } = req.body;
    
        if ( !nome || !cpf || !data_nascimento || !telefone || !email || !senha){
            res.status(400).json({mensagem:"Todos os campos são obrigatórios"});
}
    
    const buscarCpfConta = contas.find(conta => {
            return conta.usuario.cpf === cpf
})  
        if (buscarCpfConta){
            return res.status(400).json({mensagem:"O CPF informado já exisite no cadastro!"})
}

    const buscarEmailConta = contas.find(conta => {
            return conta.usuario.email === email
})  
        if (buscarEmailConta){
            return res.status(400).json({mensagem:"O email informado já exisite no cadastro!"})
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
        return res.status(201).json(contaCriada);
}