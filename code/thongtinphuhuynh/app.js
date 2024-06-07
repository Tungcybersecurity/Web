const thongTinPhuHuynhAPI = 'http://localhost:8080/api-thongtinphuhuynh?';
var url = '';
const fileanh = document.getElementById('file');
fileanh.addEventListener('change',function(event){
    event.preventDefault();
    uploadFile(fileanh.files);
   
})

function uploadFile(files)
{
    const CLOUD_NAME = 'dektd5hl7';
    const PRESET_NAME = "upload-image";
    const API = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    // Duyệt qua từng tệp trong danh sách files
    for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', PRESET_NAME);

        // Gửi yêu cầu POST đến Cloudinary API
        fetch(API, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
           url = data["secure_url"];
           document.getElementById('imagePerson').src=url;
        })
        .catch(error => console.error('Error:', error));
    }
}
function showInfo(){
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(thongTinPhuHuynhAPI + new URLSearchParams({tendangnhap:window.localStorage.getItem('tendangnhap')}),options)
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
            var inputEmail = document.getElementById('email');
            var inputSDT = document.getElementById('sdt');
            var inputDiaChi=document.getElementById('diachi');

            inputHo.value = data['ho'];
            inputTen.value= data['ten'];
            inputGioiTinh.value = data['gioitinh'];
            inputNgaySinh.value = data['ngaysinh'];
            inputEmail.value = data['email'];
            inputDiaChi.value = data['diachi'];
            inputSDT.value = data['sdt'];
            document.getElementById('imagePerson').src=data['filepathimage'];
        }
    })
    .catch(function(erro){
        console.log('Lỗi');
        console.log(erro)
    })
}

showInfo();

function luu(){
    var inputHo = document.getElementById('ho');
    var inputTen = document.getElementById('ten');
    var inputGioiTinh = document.getElementById('gioitinh');
    var inputNgaySinh = document.getElementById('ngaysinh');
    var inputEmail = document.getElementById('email');
    var inputSDT = document.getElementById('sdt');
    var inputDiaChi=document.getElementById('diachi');
    var data = {
        'ho':inputHo.value,
        'ten':inputTen.value,
        'gioitinh':inputGioiTinh.value,
        'ngaysinh':inputNgaySinh.value,
        'email':inputEmail.value,
        'sdt':inputSDT.value,
        'diachi':inputDiaChi.value,
        'filepathimage':url
    }
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(thongTinPhuHuynhAPI + new URLSearchParams({tendangnhap:window.localStorage.getItem('tendangnhap')}),options)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var isEmpty = Object.keys(data).length === 0; 
        if(isEmpty){
            console.log('Không có dữ liệu');
        }
        else{
            alert('Sửa thành công');
        }
    })
    .catch(function(erro){
        console.log('Lỗi');
        console.log(erro)
    })
}