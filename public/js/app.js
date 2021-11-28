//const express = require('express')
//const {response} = require('express');

/*console.log('Client side javascript file is loaded!')

fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) =>{
        console.log(data)
    })
})
*/



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message_1')
const messageTwo = document.querySelector('#message_2')
 
console.log('Client side javascript file is loaded!')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading ...'

    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
        response.json().then((data) =>{
            console.log(data)
            if(data.error) {
                messageOne.textContent = ''
                messageTwo.textContent = data.error
                //console.log(data.error)
            }
            else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                //console.log('previsao:')
                //console.log(data.location)
                //console.log(data.forecast)
            }
        })
    })
})