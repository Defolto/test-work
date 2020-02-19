// Количество производителей
const COUNT_MARK = 10;

// Чекбоксы у фильтра и добавление в массив
let filterMass = [];
document.querySelector('.container-filter__checkbox').addEventListener('click', function(e){
    let checkbox;
    if (document.querySelector(`div[data-name="${e.target.id}"]`) == null) {
        return
    } else {
        checkbox = document.querySelector(`div[data-name="${e.target.id}"]`);
    }
    
    if (checkbox.classList.contains('checkbox_active')) {
        checkbox.classList.remove('checkbox_active');
        for (let i = 0; i < filterMass.length; i++) {
            if (filterMass[i] == e.target.id) {
                filterMass.splice(i, 1);
            }
        }
    }else{
        checkbox.classList.add('checkbox_active');
        filterMass.push(e.target.id);
    }
});

// Добавление в избранное 
const favorite = new XMLHttpRequest();
function setFavorite(id){

    favorite.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            if (myObj.data.inFav){
                document.getElementById(`like${id}`).setAttribute('src', 'img/like_active.svg');
            }else{
                document.getElementById(`like${id}`).setAttribute('src', 'img/like.svg');
            }
        }else{
            throw new UserException("Ошибка при добавлении в избранное");
        }
    };

    favorite.open("GET", "https://my-json-server.typicode.com/aero-frontend/test-task/FAVORITE_SUCCESS", true);
    favorite.send(id); 
};

// Очистка фильтра
document.getElementById('clear').addEventListener('click', function(){
    filterMass = [];
    
    for (let i = 0; i < COUNT_MARK; i++) {
        document.querySelector(`.container-filter__checkbox-mark:nth-child(${i+1}) .checkbox`).classList.remove('checkbox_active');
    }
})

// Показать результат
const filter = new XMLHttpRequest();
document.getElementById('show').addEventListener('click', function(){
    container_product.innerHTML = '';
    filter.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            let product_card, availability;
            for (let i = 0; i < myObj.data.products.length; i++) {
    
                // Проверка на наличие
                if (myObj.data.products[i].availability) {
                    availability = `<div class="product-card__availability">
                    <img src="img/check.svg" alt="">
                    <p class="product-card__availability-text">В наличии</p>
                </div>`;
                }else{
                    availability = `<div class="product-card__availability">
                    <p class="product-card__availability-text">Не в наличии</p>
                </div>`;
                }
    
                // Составление параметров (сделал так в случае, когда у нас параметров больше или меньше, чем в шаблоне)
                let param = `<ul class="product-card__params">`;
                for (let j = 0; j < myObj.data.products[i].params.length; j++) {
                    param += `
                        <li class="param"><span class="param__name">${myObj.data.products[i].params[j].name}</span> <span class="param__value">${myObj.data.products[i].params[j].value}</span></li>`
                }
                param += `
                </ul>`;
    
                product_card = `<div class="product-card">
    
                    <div class="product-card__header">
                        <div class="product-card__stars">
                            <img class="star" src="img/star.svg">
                            <img class="star" src="img/star.svg">
                            <img class="star" src="img/star.svg">
                            <img class="star" src="img/star__pass.svg">
                            <img class="star" src="img/star__pass.svg">
                        </div>
                        <div class="product-card__vendor-code">
                            Арт. <span>${myObj.data.products[i].code}</span>
                        </div>
                    </div>
    
                    <img src="img/${myObj.data.products[i].imgUrl}" class="product-card__img" alt="Товар">
    
                    ${availability}
    
                    <h2 class="product-card__title">${myObj.data.products[i].title}</h2>
    
                    ${param}
    
                    <h3 class="product-card__price">49 999 руб.</h3>
                    <p class="product-card__bonus">+490 бонусов</p>
    
                    <div class="product-card__purchase">
                        <button class="btn">
                            <img class="cart" src="img/cart.svg">
                            Купить
                        </button>
                        <div class="product-card__like-compare">
                            <img class="favorite" id="like${i+1}" onclick="setFavorite(${i+1})" src="img/like.svg" alt="в избранном">
                            <img class="comparsion" src="img/comparsion.svg" alt="сравнить">
                        </div>
                    </div>
    
                </div>`;
                container_product.insertAdjacentHTML('beforeend', product_card);
            }
        }else{
            throw new UserException("Ошибка при рендере с фильтрами");
        }
    };
    
    filter.open("GET", "https://my-json-server.typicode.com/aero-frontend/test-task/FILTER_SUCCESS", true);
    filter.send(filterMass);
})