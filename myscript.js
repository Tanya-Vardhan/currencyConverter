const baseUrl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

let dropdowns = document.querySelectorAll("select");
for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption= document.createElement("option");
        newOption.innerText=currCode;
        select.append(newOption);
        if(select.name==="from" && currCode=="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode=="INR"){
            newOption.selected="selected";
        }
    }

    select.addEventListener("change", (evt)=>{ //evt is our object
        //target is jab bhi humne change kiya toh kahan pe change aaya
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}


const updateExchangeRate = async () =>{
    let amount=document.querySelector("input");
    let amtval=amount.value;
    if(amtval=="")amtval=1;

    const url=`${baseUrl}/${fromCurr.value.toLowerCase()}.json`;
    let response= await fetch(url);
    let data= await response.json();
    let f=fromCurr.value.toLowerCase();
    let t=toCurr.value.toLowerCase();
    // REMARK: data.f.t was wrong!
    let rate= data[f][t];
    let finalamt= amtval*rate;
    msg.innerText=`${amtval} ${fromCurr.value}=${finalamt} ${toCurr.value}`;
};

//we want our window to load with the updations itself
window.addEventListener("load", ()=>{
    updateExchangeRate();
    });
    

let btn= document.querySelector("button");
let msg= document.querySelector(".msg");
let fromCurr= document.querySelector(".from select");
let toCurr= document.querySelector(".to select");
btn.addEventListener("click", async (evt)=>{
    //by default jo click karne pe page refresh hota tha woh nahi hoga
    evt.preventDefault();
    updateExchangeRate();
});




