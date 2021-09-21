//Vue stuff
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')


/*
//this function takes info from the form and creates a contact object
const getFormInfo = function(target){
    let formData = new FormData(target);
    let contact = new Contact(
        formData.get("firstname"),
        formData.get("lastname"),
        formData.get("address"),
        formData.get("city"),
        formData.get("email")  
    );
    //we return the contact object
    return contact;
}

//this function takes an order object and sends it
const sendOrder = async function(order){
    //calls the order API
    let response = await fetch("http://localhost:3000/api/cameras/order",{
        method: "POST",
        headers: {
            "Accept": 'application/json', 
            "Content-Type": "application/json"
        },
            //sends the order object in JSON format
            body: JSON.stringify(order)
        })
    if(response.ok){
        let data = await response.json();
        console.log(data);
        //we store the order
        localStorage.setItem("lastOrder", JSON.stringify(data));
        //we empty the cart
        deleteCart();
        //we redirect to the confirmation page, and pass the order id in the url
        window.location.replace("confirmation.html");
    }else{
        console.log(response);
    }
} 
*/