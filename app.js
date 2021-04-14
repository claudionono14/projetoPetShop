//Módulos importados
const moment = require('moment');
const fs = require('fs');
const nomeArquivo = 'pets.json'; //Guardando o caminho para o arquivo pets.json


//Nome do Petshop
const petshop = "PETSHOP DO NONÔ";

let petsJSON = fs.readFileSync(nomeArquivo); //lê o conteúdo do arquivo pets.json e joga na variável petsJSON
let arquivoPets = JSON.parse(petsJSON); // converte para o formato JS

// console.log(arquivoPets);
// console.log(arquivoPets.pets) //->########## Chamando o a lista de pets ##############



// ############### FUNÇÕES ####################################

const atualizarJson = () => {
    let listaJson = JSON.stringify(arquivoPets, null, 2); // objeto para converter, null para não minificar, 2 para pular nº linhas - converte o objeto literal para JSON
    fs.writeFileSync(nomeArquivo, listaJson, 'utf-8') //caminho arquivo, conteudo novo, formato
}


const listarPets = (listaDePets) => {
  for (let contador = 0; contador < listaDePets.length; contador++) {
    console.log(`${listaDePets[contador].nome}, ${listaDePets[contador].idade} anos, ${listaDePets[contador].tipo}, ${listaDePets[contador].raca}, ${(listaDePets[contador].vacinado) ? 'vacinado' : 'não vacinado'}`);
    for (let index = 0; index < listaDePets[contador].servicos.length; index++) {
        console.log(`${listaDePets[contador].servicos[index].data} - ${listaDePets[contador].servicos[index].nome}`);
    }
  }
};
// listarPets(arquivoPets.pets)


const vacinarPet = (pet) => {
    if (!pet.vacinado) {
        pet.vacinado = true;
        atualizarJson();
        console.log(`${pet.nome} foi vacinado com sucesso!`);
    } else {
        console.log(`Ops, ${pet.nome} já está vacinado!`);
    }
} 


const campanhaVacina = (listaPets) => {
    let totalVacinados = 0;
    for (let i = 0; i < listaPets.length; i++) {
        if (!listaPets[i].vacinado) {
            listaPets[i].vacinado = true;
            totalVacinados++;
        }
    }
    atualizarJson();
    console.log(`Parabéns, ${totalVacinados} pets foram vacinados nessa campanha!`);
};



const adicionarPet = (infoPet) => {
    arquivoPets.pets.push(infoPet);
    atualizarJson(); //atualizando o arquivo JSON

    console.log(`${infoPet.nome} está cadastrado no nosso sistema !`)
}



const darBanhoPet = (pet) => {
    pet.servicos.push({
        nome: 'banho',
        data: moment().format('DD-MM-YYYY')
    });
    atualizarJson();
    console.log(`${pet.nome} está cherosa!`);
}
// darBanhoPet(arquivoPets.pets[0])


const tosarPet = (pet) => { 
  pet.servicos.push({
      nome: 'Tosa',
      data: moment().format('DD-MM-YYYY')
  });
  atualizarJson();  
  console.log(`${pet.nome} está com o cabelim na régua`);
} 
// tosarPet(arquivoPets.pets[0])



const apararUnhasPet = (pet) => {
  pet.servicos.push({
      nome: 'Corte de unhas',
      data: moment().format('DD-MM-YYYY')
  });
  atualizarJson();  
  console.log(`${pet.nome} está com as unhas aparadas`)
}
// apararUnhasPet(arquivoPets.pets[0])



const buscarPet = (nomePet) => {
    const petEncontrado = arquivoPets.pets.find((pet) => {
        return pet.nome == nomePet;
    });

    console.log(petEncontrado);
}
// buscarPet('BH')



const atenderCliente = (pet, servico) =>  {
    console.log(`Olá, $${pet.nome} !`);
    servico(pet);
    console.log(`Até mais !`);
}
// atenderCliente(arquivoPets.pets[1], darBanhoPet)



const addInfoCastrado = () => {
       arquivoPets.pets = listaPets.map((pet) => {
           pet.castrado = true;
           return pet;
       })
   
    //    atualizarJson();
   }

   console.log(arquivoPets.pets)

   addInfoCastrado();

   console.log(arquivoPets)



   const listarVacinados = () => {
       console.log('** VACINADO **');
   
       let vacinados = arquivoPets.pets.filter((pet) => {
           return pet.vacinado;
       })
   
       console.log(vacinados);
       console.log(`Temos ${vacinados.length} pets vacinados!`);
   }
   
//    listarVacinados();