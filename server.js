const express = require('express');
const cors = require('cors');
const app = express();
const fs=require('fs');

// Porta para subir o servidor
const serverPort = 8001;

// Seta as rotas default da API
const routes = {
	products: {
		get: '/api/products'
	}
};

// Aplica o CORS para aceitar requisições de outros domínios
app.use(cors());

// Registra a rota GET default, enviando o JSON como retorno
app.get(routes.products.get, function (req, res) {
	debugger
    res.sendFile(__dirname + '/data/products.json');
});

//Restful API
app.get('/favorite/:id',function(req,res){

		fs.readFile(__dirname+'/data/products.json','utf8',function(err,data){
	
			const dataC=JSON.parse(data);
			console.log(dataC);
			let currentProduct=dataC.products.filter(product=>product.id==req.params.id);
			console.log(currentProduct);
			console.log(req.params.id)
			currentProduct[0].favoiteNum=currentProduct[0].favoiteNum+1;
			res.json({
				items:dataC.products
			})
		})
})

app.use('*', function (req, res) {
    res.redirect(routes.products.get);
});

// Inicia o servidor e avisa o usuário
app.listen(serverPort);
console.log(`[products] API escutando na porta ${serverPort}.`);
