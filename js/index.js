$(document).ready(async function () {

    var produtos = {registros: []};

    await baseDados();

    await listarProdutos(0);

    function baseDados(){

        return new Promise(async (resolve, reject) => {
       
            var fileUrl = "https://shoppingafiliados23.github.io/shopee/produtos.csv";

            await $.get(fileUrl, function(data) {
                var lines = data.split("\n");
    
                var output = $("#output");
                output.empty(); // Limpar o conteúdo anterior
    
                lines.forEach(function(line) {
                line = line.replace(/\r/g, "");
                var lineElement = line.split(';');
                    var numero  = lineElement[0].replace(/[^0-9]/g, '');
                    var produto = lineElement[0];
                    var nome = lineElement[1];
                    var imagem = lineElement[2];
                    var link = lineElement[3];
                    var status = lineElement[4];

                produtos.registros.push({ numero: numero,produto: produto, nome: nome, imagem: imagem, link: link, status: status});
                
                });

                 console.log(produtos);
            });

            resolve();

        })

    }

    $("#numProd").keyup(function (e) { 
        
        if($("#numProd").val().length == 0){
            listarProdutos(0); 
        } else {
            listarProdutos($("#numProd").val());
        }
        
    });
    
    
    function listarProdutos(pNumProd){
        
        let listProdutos = '';

        var p = 1;

        return new Promise(async (resolve, reject) => {

            if(pNumProd === 0){
                var filtrarRegistros = produtos.registros;
            } else {
                var filtrarRegistros = produtos.registros.filter(function(produtos) {
                    return produtos.numero.startsWith(pNumProd);
                });
            }

            console.log(filtrarRegistros);

            for (let index = 0; index < filtrarRegistros.length; index++) {

                var nomeProd = filtrarRegistros[index].nome;
                
                if(filtrarRegistros[index].status = 'Ativo'){

                    if((index%2) == 0){
                        listProdutos += `<div class="row mx-2 px-2">
                                            <div class="col-6 ps-2 pe-1 py-1 ">
                                                <div class="card" style="width: 100%" onclick="window.open('${filtrarRegistros[index].link}','_blank')">
                                                    <img src="img_prod/${filtrarRegistros[index].imagem}" class="card-img-top" alt="...">
                                                    <div class="card-body border p-0">
                                                        <h5 class="card-title ps-1 m-0">${filtrarRegistros[index].produto}</h5>
                                                        <p class="card-text ps-1 p-0 m-0">${nomeProd.substring(0, 15)}...</p>
                                                    </div>
                                                </div>
                                            </div>`;
                    } else {
                        listProdutos += `<div class="col-6 ps-1 pe-2 py-1">
                                                <div class="card"  style="width: 100%" onclick="window.open('${filtrarRegistros[index].link}','_blank')">
                                                    <img src="img_prod/${filtrarRegistros[index].imagem}" class="card-img-top" alt="...">
                                                    <div class="card-body border p-0">
                                                        <h5 class="card-title ps-1 m-0">${filtrarRegistros[index].produto}</h5>
                                                        <p class="card-text ps-1 p-0 m-0">${nomeProd.substring(0, 15)}...</p>
                                                    </div>
                                                </div>
                                            </div>
                                
                                        </div>`;
                    }

                    // listProdutos += `<div class="alert alert-light p-2" role="alert" onclick="window.open('${produtos.registros[index].link}','_blank')">
                    //                     <table class="w-100">
                    //                         <tr>
                    //                             <td rowspan="2" class="w-60px text-center p-0"><img src="img_prod/${produtos.registros[index].imagem}" class="rounded-3 img_prod"></td>
                    //                             <td class="ps-2 text-relevo-black">${produtos.registros[index].produto}</td>
                    //                         </tr>
                    //                         <tr>                    
                    //                             <td class="ps-2 fs-7">${nomeProd.substring(0, 35)}...</td>
                    //                         </tr>
                    //                     </table>
                                        
                    //                 </div>`;

                }
                
            }
            // console.log(listProdutos);
            $("section").html(listProdutos);

            resolve();

        })
    }

});