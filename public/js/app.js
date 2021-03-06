const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const adress = search.value

    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''

    fetch(`/weather?adress=${encodeURIComponent(adress)}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error 
        } else {
            const {location, forecast} = data
            messageOne.textContent = location
            messageTwo.textContent = forecast
        }
        })
    })
})