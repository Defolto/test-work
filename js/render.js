const products = new XMLHttpRequest();

// AJAX
products.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        alert(myObj.data.products.length)
        for (let i = 0; i < myObj.data.products.length; i++) {
            
        }
    }
};

products.open("GET", "https://my-json-server.typicode.com/aero-frontend/test-task/PRODUCTS_SUCCESS", true);
products.send();