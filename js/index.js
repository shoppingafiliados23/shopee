$(document).ready(async function () {

    var produtos = {registros: []};

    await baseDados();

    await listarProdutos();

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

                    if((index%2) == 0){
                        listProdutos += `<div class="row mx-2 px-2">
                                            <div class="col-6 ps-2 pe-1 py-1 ">
                                                <div class="card" style="width: 100%" onclick="window.open('${produtos.registros[index].link}','_blank')">
                                                    <img src="img_prod/${produtos.registros[index].imagem}" class="card-img-top" alt="...">
                                                    <div class="card-body border p-0">
                                                        <h5 class="card-title ps-1 m-0">${produtos.registros[index].produto}</h5>
                                                        <p class="card-text ps-1 p-0 m-0">${nomeProd.substring(0, 15)}...</p>
                                                    </div>
                                                </div>
                                            </div>`;
                    } else {
                        listProdutos += `<div class="col-6 ps-1 pe-2 py-1">
                                                <div class="card"  style="width: 100%" onclick="window.open('${produtos.registros[index].link}','_blank')">
                                                    <img src="img_prod/${produtos.registros[index].imagem}" class="card-img-top" alt="...">
                                                    <div class="card-body border p-0">
                                                        <h5 class="card-title ps-1 m-0">${produtos.registros[index].produto}</h5>
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