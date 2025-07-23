const BASE_URL="https://v6.exchangerate-api.com/v6/610d2ba13d31aabd9a6b7ffa/latest/USD";
const dropdowns=document.querySelectorAll(".dropdown select");
const button=document.querySelector("button");
const fromCurrency=document.querySelector(".from select");
const toCurrency=document.querySelector(".to select");
const msg=document.querySelector(".msg");
for(let select of dropdowns)
{
    for(currcode in countryList)
    {
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD")
        {
            newOption.selected="selected";
        }
        else if(select.name==="to" && currcode==="INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag=(element)=>
{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    element.parentElement.querySelector("img").src=newSrc;
};
button.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amt=document.querySelector(".amount input");
    if(amt.value<1 || amt.value=="")
    {
        amt="1";
        amt.value=amt;
    }
    const URL = `${BASE_URL}?base=${fromCurrency.value}&symbols=${toCurrency.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurrency.value];
    let res=amt.value*rate;
    msg.innerText=`${amt.value} ${fromCurrency.value} = ${res.toFixed(2)} ${toCurrency.value} `;
});
