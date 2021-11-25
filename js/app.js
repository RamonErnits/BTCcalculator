const cryptoInput =document.querySelector('#crytovalue')
const fiatInput = document.querySelector('#fiatvalue')
const crytoselect = document.querySelector('#crytoselect')
const fiatselect = document.querySelector('#fiatselect')
const fiat = [
{
currency: "USD",
country: "United States Dollar"
},
{
currency: "EUR",
country: "Euro"
},
{
currency: "GBP",
country: "British Pound Sterling"
},
{
currency: "EEK",
country: "Estonian Kroon"
},
{
    currency: "RUB",
    country: "Russian Rubl"
},
    ] 
    const coins = [
    {
    currency: "BTC",
    country: "Bitcoin"
    },
    ]
insertCurrencies(coins,crytoselect)
insertCurrencies(fiat,fiatselect) 

function insertCurrencies(curr, selectEl){
    curr.forEach(c=>{
    selectEl.appendChild(currOption(c.currency,c.country))
    })
    function currOption(value,title){
    const o=document.createElement('option')
    o.title = title
    o.value = value
    o.text = value
    o.className = 'calcoption'
    return o
    }
}


calc('crypto')
fiatInput.onkeyup = ()=>calc()
fiatInput.onchange = ()=>calc()
cryptoInput.onkeyup = ()=>calc('crypto')
cryptoInput.onchange = ()=>calc('crypto')

fiatselect.onchange = ()=>calc('crypto')
crytoselect.onchange = ()=>calc()

async function calc(changer){
    const fiat = fiatselect.value
    const cryptoVal = Number(cryptoInput.value)
    const fiatVal = Number(fiatInput.value) 
    const res = await fetch(`https://api.coindesk.com/v1/bpi/currentprice/${fiat.toLowerCase()}.json`)
    const json = await res.json() 
    const exchangeRate = parseInt(json.bpi[fiat].rate_float)
    if(changer==='crypto'){
    const amount =  cryptoVal * exchangeRate 
    fiatInput.value = parseFloat(amount).toFixed(2)
    }else{
    const amount =  fiatVal / exchangeRate 
    cryptoInput.value = amount
    } 
}