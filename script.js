/*---------------------------  LOGIN ----------------------------*/


function Login() {
    document.querySelector(".login-form").style.display = "block";
    document.getElementById("header").style.filter = 'blur(10px)';
    document.getElementById("main").style.filter = 'blur(10px)';

    document.getElementById("sidebar-div").style.display = 'none';
    cancel();
    document.getElementById("body").style.overflowY = 'hidden';


}

function login_cancel() {
    document.querySelector(".login-form").style.display = "none";
    document.getElementById("header").style.filter = 'none';
    document.getElementById("main").style.filter = 'none';
    document.getElementById("body").style.overflowY = 'auto';

}

sessionStorage.setItem("email", "");

async function Send_login() {


    const old_user = {
        "name": document.getElementById("f1").value,
        "email": document.getElementById("f2").value,
        "password": document.getElementById("f3").value,
    }



    const request = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(old_user)

    })
    const response = await request.json()

    if (response.status === "success") {
        alert("Login was Successful...")
        sessionStorage.setItem("email", old_user.email);
        login_cancel();
        document.getElementById("login_link1").style.display = "none";
        document.getElementById("login_link2").style.display = "none";

        document.querySelector(".user_item").style.display = "block";
        document.getElementById("user_name").innerHTML = old_user['name'];
        document.getElementById("user_name2").innerHTML = old_user['name'];

        cart_data_fetch();

    }

}


/*----------------------------- CREATE-ACCOUNT -------------------*/



function create_account() {
    document.querySelector(".new-form").style.display = "block";
    document.getElementById("body").style.overflowY = 'hidden';
    document.getElementById("header").style.filter = 'blur(10px)';
    document.getElementById("main").style.filter = 'blur(10px)';
    document.querySelector(".login-form").style.display = "none";

}


function cancel_register() {
    document.querySelector(".new-form").style.display = "none";
    document.getElementById("body").style.overflowY = 'hidden';
    document.getElementById("header").style.filter = 'blur(0px)';
    document.getElementById("main").style.filter = 'blur(0px)';

    document.querySelector(".login-form").style.display = "block";
    document.getElementById("header").style.filter = 'blur(10px)';
    document.getElementById("main").style.filter = 'blur(10px)';
}


async function send_register() {

    const new_user = {
        "name": document.getElementById("i1").value,
        "email": document.getElementById("i2").value,
        "password": document.getElementById("i3").value,
        "p_number": document.getElementById("i4").value,
    }


    const request = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(new_user)

    })
    const response = await request.json()
    console.log(response)
    if (response.status === "received") {
        alert("Registration was Successful...")
        cancel_register();
    }

}




/*---------------------  SIDEBAR/PHONE VIEW --------------------------*/



function mobile_view() {
    document.getElementById("header").style.display = 'none';
    document.getElementById("sidebar").style.display = 'flex';
    document.getElementById("sidebar-div").style.display = 'block';
    document.getElementById("body").style.overflowY = 'hidden';

}


function cancel() {

    document.getElementById("body").style.overflowY = 'auto';
    document.getElementById("header").style.display = 'flex';
    document.getElementById("sidebar").style.display = 'none';
    document.getElementById("sidebar-div").style.display = 'none';
}



/*------------------- TRENDING DEALS SCROLL-BAR ------------------*/



const scrollbar = document.querySelector(".scrollbar")


function right_scroll() {
    scrollbar.style.scrollBehavior = "smooth";
    scrollbar.scrollLeft += 500;
}


function left_scroll() {
    scrollbar.style.scrollBehavior = "smooth";
    scrollbar.scrollLeft -= 500;
}



/* --------------- BANK BANNER SCROLLING FUNCTION --------------*/


function bank_radio_btn(btn) {

    const btns = document.getElementById(btn.id)

    const bank_scrollbar = document.querySelector(".bank-names")
    bank_scrollbar.style.scrollBehavior = "smooth";

    const banner_width = document.querySelector(".banks").offsetWidth;

    const banner_array = [0, banner_width, banner_width * 2, banner_width * 3]
    console.log(banner_array)

    if (btns.id === 'r1') {
        bank_scrollbar.scrollLeft = 0;
    }

    if (btns.id === 'r2') {
        bank_scrollbar.scrollLeft = banner_array[1];
    }

    if (btns.id === 'r3') {
        bank_scrollbar.scrollLeft = banner_array[2];
    }

    if (btns.id === 'r4') {
        bank_scrollbar.scrollLeft = banner_array[3];
    }

}


/*------------------- E-COLLECTIONS  SCROLL-BAR ------------------*/


const scrollbar2 = document.querySelector(".E-collections")

function scroll_right() {
    scrollbar2.style.scrollBehavior = "smooth";
    scrollbar2.scrollLeft += 500;
}

function scroll_left() {
    scrollbar2.style.scrollBehavior = "smooth";
    scrollbar2.scrollLeft -= 500;
}



/*--------------------- SERACH-PRODUCT --------------------------- */



const product_window = document.querySelectorAll(".product_window");

document.querySelector(".cart_main").style.display = "none";


function Display_product(response) {

    document.querySelector(".cart_main").style.display = "none";


    for (section of product_window) {
        section.style.display = "none";
    }


    const numOfProducts = response.product_details.length

    parent = document.querySelector(".display_products");
    parent.style.display = "grid";

    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    for (let count = 0; count < numOfProducts; count++) {
        div = document.createElement("div");
        div.setAttribute("class", ("product" + response.product_details[count][4] + " product"));

        img = document.createElement("img");
        img.setAttribute("src", response.product_details[count][2]);
        div.appendChild(img)


        p1 = document.createElement("p");
        p1.setAttribute("id", "product_name");
        p1.textContent = response.product_details[count][1];
        div.appendChild(p1)


        p2 = document.createElement("p");
        p2.setAttribute("id", "product_price");
        p2.textContent = "₹" + response.product_details[count][3];
        div.appendChild(p2)

        div2 = document.createElement("div");
        div2.setAttribute("id", "buttons_section");
        div.appendChild(div2);


        add_cart = document.createElement("button");
        add_cart.setAttribute("class", "add_cart");
        add_cart.setAttribute("id", response.product_details[count][4]);
        add_cart.setAttribute("onclick", `addToCart(this)`)
        div2.appendChild(add_cart)


        buy_btn = document.createElement("button");
        buy_btn.setAttribute("id", "buy_btn");
        buy_btn.setAttribute("onclick", `buy_product(this)`)
        buy_btn.textContent = "Buy Now"
        div2.appendChild(buy_btn)


        cart_img = document.createElement("img");
        cart_img.setAttribute("src", "https://cdn-icons-png.flaticon.com/256/5381/5381441.png");
        add_cart.appendChild(cart_img);


        parent.appendChild(div);


    }
}




document.querySelector(".search-bar-form").addEventListener("submit", async function search_product(event) {

    console.log(document.getElementById("product_name").value);

    event.preventDefault();


    product = { "product_name": String(document.getElementById("product_name").value + "%").trim().toLowerCase() }


    const request = await fetch("http://127.0.0.1:8000/search_products", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(product)

    })

    const response = await request.json()




    if (response.status === "failed") {


        window.location.reload();

        alert("product will be updated soon ...");
        document.getElementById("product_name").value = "";
    } else {

        Display_product(response);

    }
});



/*------------------------ VIEW CART ---------------------------------*/



let cart_products = [];


async function cart_data_fetch() {

    const email = sessionStorage.getItem("email");


    if (email) {

        console.log(email);

        const request = await fetch("http://127.0.0.1:8000/cart_data", {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({ email_id: email })

        })

        const response = await request.json();

        if (response) {

            cart_products = response.cart_data;

            document.querySelector(".cart_count").textContent = (cart_products.length);

        }

    }


}



async function addToCart(cart) {


    const email = sessionStorage.getItem("email");

    if (email) {


        if (!(cart_products.includes(cart.id))) {

            alert(" product added to cart ..")

            const cart_product_data = {
                email: email,
                product_id: cart.id
            };


            const request = await fetch("http://127.0.0.1:8000/add_cart", {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify(cart_product_data)

            })

            const response = await request.json();

            console.log(response)

            if (response.status == "added") {

                cart_products.push(cart.id);

                document.querySelector(".cart_count").innerHTML = cart_products.length;
            }

        } else {
            alert("product is already in cart ..")
        }

    } else {
        alert("Please Login ...")
        // window.location.reload();
    }

}



function view_cart() {



    if (cart_products.length == 0) {

        document.querySelector("#cart_text").innerHTML = `Cart is EMPTY ! `;
        document.querySelector(".cart_main").style.display = "flex";
        document.querySelector(".home_page").style.display = "none"
        document.querySelector(".display_products").style.display = "none";

    } else {
        parent = document.querySelector(".cart_products");

        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }



        document.querySelector(".display_products").style.display = "none";
        document.querySelector(".cart_main").style.display = "flex";
        document.querySelector("#cart_text").innerHTML = `Cart has ${cart_products.length} items `;
        document.querySelector(".display_products").style.display = "none";

        parent = document.querySelector(".cart_products");

        cart_products.forEach((id) => {

            cart_item = document.querySelector(`.product${id}`);


            updated_child = document.querySelector(`.product${id} :nth-child(4)`).childNodes[0];

            updated_child.setAttribute("onclick", "remove_cart(this)")
            updated_child.setAttribute("class", "delete_product")

            delete_btn_img = updated_child.childNodes[0];
            txt_node = document.createTextNode("Remove")
            delete_btn_img.replaceWith(txt_node);


            parent.appendChild(cart_item);

        });

    }


    console.log(cart_products);
}



async function remove_cart(cart_product) {

    const email = sessionStorage.getItem("email");




    const request = await fetch("http://127.0.0.1:8000/remove_cart_product", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({ "email": email, "id": cart_product.id })

    })

    const response = await request.json();

    if (response) {


        // console.log(cart_product.id)

        mod_cart_array = cart_products.filter((id) => {
            return id != cart_product.id;
        });

        // console.log(mod_cart_array)
        cart_products = mod_cart_array;

        parent = document.querySelector(".cart_products");
        child = document.querySelector(`.product${cart_product.id}`)
        parent.removeChild(child)
        document.querySelector(".cart_count").textContent = (cart_products.length);
        document.querySelector("#cart_text").innerHTML = `Cart has ${cart_products.length} items `;

        alert("Product removed ...")


    } else {
        alert("Process failed ...")
    }


}


/* -------------------------- BUY PRODUCT ----------------  */


function buy_product(product) {

    const email = sessionStorage.getItem("email");

    

    if(email){

        
        document.querySelector(".buy_product").style.display = "block";
        
        document.querySelector("#main").style.display = "none";
           
        document.querySelector("#header").style.display="none";
        
        let product_data = product.parentNode.parentNode
  
        let parent1=document.querySelector("#product_image");
        while(parent1.firstChild){
            parent1.removeChild(parent1.firstChild)
        }

        let parent2=document.querySelector("#product_info");
        while(parent2.firstChild){
            parent2.removeChild(parent2.firstChild)
        }
        
        let product_image = document.createElement("img")
        product_image.setAttribute("src", product_data.children[0].src)
        document.querySelector("#product_image").appendChild(product_image);
        
        let product_name = document.createElement("p")
        product_name.setAttribute("id", product_data.children[1].id)
        product_name.innerHTML = product_data.children[1].innerHTML;
        document.querySelector("#product_info").appendChild(product_name);
        
        let product_price = document.createElement("p")
        product_price.setAttribute("id", product_data.children[2].id)
        product_price.innerHTML = product_data.children[2].innerHTML;
        document.querySelector("#product_info").appendChild(product_price);
        
    }
    else{
        alert("Please Login ..")
    }


}


function cancel_purchase(){

    document.querySelector(".buy_product").style.display = "none";

    document.querySelector("#main").style.display = "grid";
      
    document.querySelector("#header").style.display="flex";

}


async function proceed_purchase(){

    const email = sessionStorage.getItem("email");
    
    if(email){

        let user_name=document.querySelector("#name").value;
        let user_mobile_number=document.querySelector("#phon_number").value;
        let user_address=document.querySelector("#address").value;
        let user_payment_method;

        for(let i=1;i<=4;i++){

            if(document.querySelector(`.payment${i}`).checked)
                user_payment_method=document.querySelector(`.payment${i}`).value;    
        }
        // console.table([user_name,user_address,user_mobile_number,user_payment_method])

        parent=document.querySelector("#product_info");
        product_name=parent.firstChild.innerHTML;
        product_price=parent.lastChild.innerHTML;

        

        data=[user_name,email,user_address,user_mobile_number,user_payment_method,product_name,product_price]

        // console.log(data)

        for(let i=0;i<data.length;i++){
            if (data[i]==""||data[i]==undefined)
            {
                alert("Please fill all the fields ..");
                return;
            }  
        }


        const request = await fetch("http://127.0.0.1:8000/user_purchase_data", {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({ "purchase_data":data })

         })

        const response = await request.json();

        console.log(response)

        if(response.status=="success"){
            purchase_confirmation(data);
        }
        else{
            alert("something went wrong ....");
        }



    }
    else{
        alert("Please Login ..");
    }

}

async function purchase_confirmation(data){

    document.querySelector(".buy_product").style.display = "none";
    document.querySelector("#main").style.display = "none";     
    document.querySelector("#header").style.display="flex";
    document.querySelector(".purchase_confirmation").style.display="block";

    const request = await fetch("http://127.0.0.1:8000/send_mail", {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify({ "purchase_data":data })

         })

        const response = await request.json();
        console.log(response)
    
    
}
   


function go_to_home(){
    
    document.querySelector("#main").style.display = "grid";
    document.querySelector("#header").style.display="flex";
    document.querySelector(".purchase_confirmation").style.display="none";

}