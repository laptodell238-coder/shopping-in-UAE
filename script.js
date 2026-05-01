let products = JSON.parse(localStorage.getItem("myProducts")) || [];

// Load products on startup
showProducts();

// Admin Login
function adminLogin(){
    let pass = prompt("Enter Admin Password");
    if(pass === "SHAKIR"){
        document.getElementById("adminPanel").style.display="block";
        window.scrollTo({top:0,behavior:'smooth'});
    } else {
        alert("Wrong Password");
    }
}

function closeAdmin(){
    document.getElementById("adminPanel").style.display="none";
}

// Add Product with Local Storage save
function addProduct(){
    let name = document.getElementById("pname").value;
    let price = document.getElementById("pprice").value;
    let desc = document.getElementById("pdesc").value;
    let file = document.getElementById("pimg").files[0];

    if(!file){
        alert("Choose an image");
        return;
    }

    let reader = new FileReader();
    reader.onload = function(e){
        products.push({
            name,
            price,
            desc,
            img: e.target.result
        });
        
        saveToLocal();
        showProducts();

        // Clear inputs
        document.getElementById("pname").value="";
        document.getElementById("pprice").value="";
        document.getElementById("pdesc").value="";
        document.getElementById("pimg").value="";
    }
    reader.readAsDataURL(file);
}

function saveToLocal() {
    localStorage.setItem("myProducts", JSON.stringify(products));
}

// Show Products - Modified to go straight to WhatsApp
function showProducts(){
    let html = "";
    products.forEach((p, i) => {
        html += `
        <div class="product">
            <img src="${p.img}" onclick="goToWhatsApp(${i})">
            <h3>${p.name}</h3>
            <div class="price">${p.price}</div>
            <p>${p.desc.substring(0, 40)}...</p>
            <button onclick="goToWhatsApp(${i})">Order on WhatsApp</button>
        </div>
        `;
    });
    document.getElementById("productsList").innerHTML = html;
}

// New function: Redirects directly to WhatsApp
function goToWhatsApp(i){
    let p = products[i];
    let phoneNumber = "923059411774";
    let message = encodeURIComponent("Hello Dubai Shop, I want to order:\n\n*Product:* " + p.name + "\n*Price:* " + p.price + "\n*Details:* " + p.desc);
    
    window.open("https://wa.me/" + phoneNumber + "?text=" + message, "_blank");
}

// Delete Logic
function showDeleteOptions(){
    if(products.length === 0){
        alert("No products to delete");
        return;
    }
    document.getElementById("deletePanel").style.display = "block";
    let html = "";
    products.forEach((p, i) => {
        html += `
        <div style="margin:5px 0; border-bottom:1px solid #ccc; padding:5px; display:flex; justify-content:space-between;">
            <span><strong>${p.name}</strong> (${p.price})</span>
            <button onclick="confirmDelete(${i})" style="background:red; color:white; border:none; padding:2px 10px; cursor:pointer;">Delete</button>
        </div>
        `;
    });
    document.getElementById("deleteList").innerHTML = html;
}

function closeDeletePanel(){
    document.getElementById("deletePanel").style.display = "none";
}

function confirmDelete(index){
    let pass = prompt("Enter Admin Password to Delete");
    if(pass === "SHAKIR"){
        products.splice(index, 1);
        saveToLocal();
        showProducts();
        showDeleteOptions();
    } else {
        alert("Wrong Password");
    }
}
