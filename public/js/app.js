
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const result = document.querySelector('#result')
const city = document.querySelector('#city')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    city.textContent = 'Loading...'
    result.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                city.textContent =data.error
            } else {
                city.textContent =data.location
                result.textContent =data.forecast
            }
        })
    })
})

