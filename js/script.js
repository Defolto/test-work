document.querySelector('.container-filter__checkbox').addEventListener('click', function(e){
    let checkbox;
    if (document.querySelector(`div[data-name="${e.target.id}"]`) == null) {
        return
    } else {
        checkbox = document.querySelector(`div[data-name="${e.target.id}"]`);
    }
    
    if (checkbox.classList.contains('checkbox_active')) {
        checkbox.classList.remove('checkbox_active');
    }else{
        checkbox.classList.add('checkbox_active');
    }
    
})