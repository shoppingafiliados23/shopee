$(document).ready(async function () {

    var produtos = {registros: []};

    await baseDados();

    await listarProdutos();

    function baseDados(){

        return new Promise(async (resolve, reject) => {
       
            var fileUrl = "https://ricardogithubb.github.io/shoppingafiliados23/produtos.csv";

            await $.get(fileUrl, function(data) {
                var lines = data.split("\n");
    
                var output = $("#output");
                output.empty(); // Limpar o conteúdo anterior
    
                lines.forEach(function(line) {
                line = line.replace(/\r/g, "");
                var lineElement = line.split(';');
                    var produto = lineElement[0];
                    var nome = lineElement[1];
                    var imagem = lineElement[2];
                    var link = lineElement[3];
                    var status = lineElement[4];

                produtos.registros.push({ produto: produto, nome: nome, imagem: imagem, link: link, status: status});
                
                });

                 console.log(produtos);
            });

            resolve();

        })

    }
    
    
    function listarProdutos(){
        
        let listProdutos = '';

        return new Promise(async (resolve, reject) => {

            for (let index = 0; index < produtos.registros.length; index++) {

                var nomeProd = produtos.registros[index].nome;
                
                if(produtos.registros[index].status = 'Ativo'){

                    listProdutos += `<div class="alert alert-light p-2" role="alert" onclick="window.open('${produtos.registros[index].link}','_blank')">
                                        <table class="w-100">
                                            <tr>
                                                <td rowspan="2" class="w-60px text-center p-0"><img src="img_prod/${produtos.registros[index].imagem}" class="rounded-3 img_prod"></td>
                                                <td class="ps-2 text-relevo-black">${produtos.registros[index].produto}</td>
                                            </tr>
                                            <tr>                    
                                                <td class="ps-2 fs-7">${nomeProd.substring(0, 35)}...</td>
                                            </tr>
                                        </table>
                                        
                                    </div>`;

                }
                
            }

            $("section").html(listProdutos);

            resolve();

        })
    }

});