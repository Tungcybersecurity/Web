const themThongTinCon = 'http://localhost:8080/api-themhocsinh?';
const fileanh = document.getElementById('file');
var url='';
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

function dinhDang(ho,ten,gioitinh,truong,ngaysinh){
    const nameRegex = /^[a-zA-ZÀ-Ỹà-ỹ ]+$/;
    const birthregex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    var content = document.querySelector('.profile');

    if (nameRegex.test(ho) === false || nameRegex.test(ten) === false|| ho === '' || ten === ''){
        alert("Hãy nhập họ và tên hợp lệ!");
        return false;
    }

    if(gioitinh != 'Nam' && gioitinh != 'Nữ'){
        alert("Hãy nhập Nam hoặc Nữ");
        return false;
        
    }
    
    if(birthregex.test(ngaysinh) === false){
        alert('Hãy nhập ngày sinh hợp lệ!');
        return false;
    }

    if(nameRegex.test(truong) === false)
    {
        alert('Hãy nhập tên trường hợp lệ!');
        return false;
    }
    return true;
}

function them(data){
    
   

    var options = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data),
        
    };
    fetch(themThongTinCon + new URLSearchParams({tendangnhap : window.localStorage.getItem('tendangnhap')}),options)
    .then(function(respone){
        return respone.json();
    })
    .then(function(data){
        var isEmpty = Object.keys(data).length === 0;
        if(isEmpty){
            alert('Thêm không thành công');
        }
        else
        {
            alert('Thêm thành công');
        }

    })
}

function luu(){
    var inputHo = document.getElementById('ho');
    var inputTen = document.getElementById('ten');
    var inputGioitinh = document.getElementById('gioitinh');
    var inputLop = document.getElementById('lop');
    var inputTruong = document.getElementById('truong');
    var inputNgaySinh = document.getElementById('ngaysinh');

    if(dinhDang(inputHo.value,inputTen.value,inputGioitinh.value,inputTruong.value,inputNgaySinh.value) === false)
    {
        return;
    }
    else{
        var data = {
            'ho':inputHo.value,
            'ten':inputTen.value,
            'gioitinh':inputGioitinh.value,
            'lop':inputLop.value,
            'truong':inputTruong.value,
            'ngaysinh':inputNgaySinh.value,
            'filepathimage':url
        };
        them(data);
    }
}

