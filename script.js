let currentPageUrl = 'https://swapi.dev/api/vehicles'

window.onload = async() => {
    try {
     await loadVehicles(currentPageUrl)
    }catch(error){
        console.log(error)
        alert('error on loading vehicles')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click',loadNextPage) // serve para monitorar os botões para quando forem clicados, utilizarem suas funções de partir para próxima pagina ou pagina anterior
    backButton.addEventListener('click',loadPreviousPage)
};

async function loadVehicles(url){
    const mainContent = document.getElementById('main-content') // manipula os conceitos de DOM, serve para pegar um elemento com id no html
    mainContent.innerHTML = '' // limpa os resultados anteriores para não aglomerar contéudos da pagina anterior com a próxima 

    try{
        const response = await fetch(url); // sempre por await quando for um fetch, pois é uma promise
        const responseJson = await response.json();

        responseJson.results.forEach((vehicles) => {
            
            const card = document.createElement('div') // cria um elemento HTML
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/vehicles/${vehicles.url.replace(/\D/g, "")}.jpg')` // serve para estilizar a varíavel
            card.className = 'cards' // serve para dar um classe para a variável 
            
            const vehicleNameBg = document.createElement('div')
            vehicleNameBg.className = 'vehicles-name-bg'

            const vehicleName = document.createElement('span')
            vehicleName.className = 'vehicle-name'

            vehicleName.innerText = `${vehicles.name}` // serve para dar nome dinamicamente para os cards
            
            vehicleNameBg.appendChild(vehicleName) // insere um elemento no outro
            card.appendChild(vehicleNameBg)

            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = '' // limpa os resultados anteriores

                const vehicleImage = document.createElement('div')
                vehicleImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/vehicles/${vehicles.url.replace(/\D/g, "")}.jpg')`
                vehicleImage.className = 'vehicle-image'

                const name = document.createElement('span')
                name.className = 'vehicle-details'
                name.innerText = `Nome: ${vehicles.name}`
                
                const length = document.createElement('span')
                length.className = 'vehicle-details'
                length.innerText = `Comprimento: ${convertLength(vehicles.length)}`
                
                const maxAtmospheringSpeed = document.createElement('span')
                maxAtmospheringSpeed.className = 'vehicle-details'
                maxAtmospheringSpeed.innerText = `Velocidade: ${convertMaxAtmospheringSpeed(vehicles.max_atmosphering_speed)}`

                const passengers = document.createElement('span')
                passengers.className = 'vehicle-details'
                passengers.innerText = `Passageiros: ${vehicles.passengers}`

                modalContent.appendChild(vehicleImage)
                modalContent.appendChild(name)
                modalContent.appendChild(length)
                modalContent.appendChild(maxAtmospheringSpeed)
                modalContent.appendChild(passengers)

            }

            mainContent.appendChild(card)
        })

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')       

        nextButton.disabled = !responseJson.next  // nega o desabled quando aparecer o botão de proxima pagina
        backButton.disabled = !responseJson.previous // nega o desabled quando o aparecer o botão de pagina anterior 
        
        backButton.style.visibility = responseJson.previous ? 'visible' : 'hidden' // modifica o botão anterior para ficar visivel quando houver uma pagina anterior e invisivel quando não houver pagina anterior

        currentPageUrl = url // mudou agora para a URL da segunda pagina



    }catch(error){
        console.log(error)
        alert('error loading vehicles on loadVehicles function')
    }

}


async function loadNextPage(){
    if(!currentPageUrl) return; // previne um erro, ele verifica se o valor da variável for nulo ou false, ele vai dar um return para imterromper a execução da função, 
    try {
        const response = await fetch(currentPageUrl) // faz uma nova requisição para api para atualizar a página url
        const responseJson = await response.json() // converte a variavel response para JSON
        await loadVehicles(responseJson.next) // manda como argumento a url da proxima pagina 
    }catch (error) {
        console.log(error)
        alert('error loading next page')
    }

}


async function loadPreviousPage() {
    if(!currentPageUrl) return;
    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()
        await loadVehicles(responseJson.previous) // manda como argumento a url da pagina anterior

    }catch (error) {
        console.log(error)
        alert('error loading previous page')
    }

}

function hideModal () {
    const modal = document.getElementById('modal')
    modal.style.visibility = 'hidden'
}



function convertLength (length){
    if (length === 'unknown') {
        return 'desconhecido'
    }
    return`${length}M`
}

function convertMaxAtmospheringSpeed(maxAtmospheringSpeed){
    if(maxAtmospheringSpeed === 'unknown') {
        return 'desconhecido'
    } 

    return `${maxAtmospheringSpeed}Km/h`
}















