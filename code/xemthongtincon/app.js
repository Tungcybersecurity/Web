const thongtinconAPI = 'http://localhost:8080/api-thongtinhocsinh?';

function showInfo(){
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(thongtinconAPI + new URLSearchParams({tendangnhap:window.localStorage.getItem('tendangnhap'),id:window.localStorage.getItem('idhocsinh')}),options)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var isEmpty = Object.keys(data).length === 0; 
        if(isEmpty){
            console.log('Không có dữ liệu');
        }
        else{
            var inputHo = document.getElementById('ho');
            var inputTen = document.getElementById('ten');
            var inputGioiTinh = document.getElementById('gioitinh');
            var inputNgaySinh = document.getElementById('ngaysinh');
            var inputLop = document.getElementById('lop');
            var inputTruong = document.getElementById('truong');

            inputHo.value = data['ho'];
            inputTen.value= data['ten'];
            inputGioiTinh.value = data['gioitinh'];
            inputNgaySinh.value = data['ngaysinh'];
            inputLop.value = data['lop'];
            inputTruong.value = data['truong'];
        }
    })
    .catch(function(erro){
        console.log('Lỗi');
        console.log(erro);
    })
}

showInfo();