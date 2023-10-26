const key = "56d3f79a0a9cc9c0330e1aef6d0b8095";


//---------Adicionando data----------
let dataAtual = new Date();
const ano = dataAtual.getFullYear();
const mes = dataAtual.getMonth() + 1;
const dia = dataAtual.getDate();
const dataCompleta = `${dia}/${mes}/${ano}`;

document.querySelector('#data').innerHTML = dataCompleta;

//---------Adicionando hora----------
function atualizarHora(){
    let horaAtual = new Date();
    let hora = horaAtual.getHours();
    let minutos = horaAtual.getMinutes();
    const horaFormatada = hora.toString().padStart(2, '0');
    const minutosFormatados = minutos.toString().padStart(2, '0');
    const horaCompleta = `${horaFormatada}:${minutosFormatados}`
    document.querySelector('#hora').innerHTML = horaCompleta;
}
setInterval(atualizarHora, 1000);
atualizarHora();



//---------Functions-------------
//---------Buscar----------------
async function buscar(city) {

    try{
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`); /*.then(resposta => resposta.json() );*/
    //atulizarTela(dados);
    if(!dados.ok){
        throw new Error(`Erro na API ${dados.status}`);
    }
    const dadosJSON = await dados.json();
    atulizarTela(dadosJSON)
    } catch(erro){
        console.log("erro na API". erro)
        document.querySelector('.previsao').style.display = 'none' 
        document.querySelector('#erro').style.display = "block"
    }

    

};

function animacao(){
    const previsao = document.querySelector('.previsao');
    previsao.classList.add('aparecer');

    setTimeout(() =>{
        previsao.classList.remove('aparecer');;
    }, 1000)
}

function atulizarTela(dados){
    console.log(dados)
    document.querySelector("#cityName").innerHTML = dados.name
    document.querySelector(".clima").innerHTML = dados.weather[0].description
    document.querySelector('#temp').innerHTML =  Math.floor(dados.main.temp)+ " °C";
    document.querySelector('#max').innerHTML = `Maxima de ${Math.floor(dados.main.temp_max)+ " °C"}`
    document.querySelector('#min').innerHTML =   `Minima de ${Math.floor(dados.main.temp_min)+ " °C"}`
    document.querySelector('#umidade').innerHTML = "Umidade de "+dados.main.humidity+"%"
    document.querySelector('#icone').src =  `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`  
    document.querySelector('.previsao').style.display = 'flex' 
    document.querySelector('#erro').style.display = "none"

    animacao();
}




//---------Clique no botão----------
function procurarBtn() {
    const city = document.querySelector('.searchInput').value;

    buscar(city);
};


