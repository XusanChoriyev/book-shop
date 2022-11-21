"use strict";
//Selectors
const name = document.querySelector("#name");


//Functions
name.addEventListener("input", (e) => {
    if(e.target.value <4){
        name.classList.add("border-res")
    }
})
