function baoVang() {
    var selectedValue = document.getElementById('baovang').value;
    var cell = document.getElementById(selectedValue);
    if (cell) {
       cell.querySelector("p").classList.add("red");
    }
}

function reset(){
    const day = new Date().getDay()+1;
    console.log(day);

    var ngayVangSang = document.querySelectorAll('#buoisang .col.cell');
    console.log(ngayVangSang);
    ngayVangSang.forEach(function(cells){
        console.log(1);
        var content = cells.querySelector("p");
        if(content.querySelector(".red")){
            var value = cells.getAttribute('value');
           if(+value > day){
                content.classList.remove("red");
           }
        }
    })
}

reset();