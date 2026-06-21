let button= document.querySelector("button")
 let error=document.querySelector(".error")
 let input=document.querySelector(".input")
  let contbody=document.querySelector(".contbody")
   let cont1=document.querySelector(".cont1")
  input.addEventListener("keyup",function(e){
if(e.key==="Enter"){
    button.click()
}
  })
button.addEventListener("click",function(){
 if(input.value===""){
        error.innerHTML = "⚠️ Please enter a country name"
        error.style.display="block"
        return
    }
cont1.style.display="none"
cont1.style.display="block"
contbody.style.display="none"
        let country=input.value.toLowerCase()
const url = "https://restcountries.com/v3.1/name/" + encodeURIComponent(country)+"?fullText=true"
fetch(url).then(res=>{
    if(res.ok){
        contbody.style.display="block"
        error.style.display="none"

  }else{
    throw new error()
  }
  return res.json()
  
}).then(data=>{
   console.log(data)
  console.log(data[0].flags.png)
  let img=document.querySelector(".img")
  let childbody11=document.querySelector(".childbody11")
  let childbody12=document.querySelector(".childbody12")
    let childbody22=document.querySelector(".childbody22")
let childbody31=document.querySelector(".childbody31")
let childbody32=document.querySelector(".childbody32")

   let spanimg=document.querySelector(".spanimg")
     let span1=document.querySelector(".span1")
  childbody11.innerHTML="Capital City<br> "+data[0].capital
span1.innerHTML="Nationa Flag<br>"
  img.src=data[0].flags.png;

    let childbody21=document.querySelector(".childbody21")

  
childbody21.innerHTML="Current Population :<br>"+data[0].population.toLocaleString();
const currencyKey = Object.keys(data[0].currencies)[0]
childbody22.innerHTML="currency :<br>"+data[0].currencies[currencyKey].name+" ("+data[0].currencies[currencyKey].symbol+")"
childbody31.innerHTML="Conntinent: "+data[0].region+"<br>"+"sub-region: "+data[0].subregion
const languages = Object.values(data[0].languages).join(", ")
childbody32.innerHTML = "Spoken Languages:<br>" + languages
}).catch(err=>{
  
    error.innerHTML=`⚠️ No data found for '${input.value}'. 
Try another country name.`
    error.style.display="block"
})
})
      