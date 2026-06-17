const Fstunit=document.querySelector("#NOTES")
const Sndunit=document.querySelector("#NOTES2")
const input=document.querySelector("#input")
const output=document.querySelector("#output")
function update(){
    const tometer={
        KM:1000,M:1,CM:0.01
    }
    let from=Fstunit.value
    let to=Sndunit.value
    let amount=input.value
    let toMeter=amount*tometer[from]
    let converted=toMeter/tometer[to]
    let rounded=parseFloat(converted.toFixed(6))
    output.innerHTML=amount+" "+from+" equals to "+rounded+" "+to
    
}
Fstunit.addEventListener("click",update)
Sndunit.addEventListener("change",update)
input.addEventListener("input",update)
