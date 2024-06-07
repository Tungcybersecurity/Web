
function  rest(id) {
    var buttons = document.getElementById(id);
    var ps = buttons.querySelectorAll('.p')
    ps.forEach(function(button) {
        button.style.removeProperty('background-color');
    });
}


function doimau(element,id)
{
    rest(id);
    element.style.backgroundColor = 'green';
}

function xoahetmau(){
    var buttons = document.querySelectorAll('.p');
    buttons.forEach(function(button) {
        button.style.removeProperty('background-color');
    });
}