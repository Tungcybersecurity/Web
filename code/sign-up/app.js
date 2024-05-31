const registerAPI = "http://localhost:8080/api-dangky"

function Register(data)
{
    var options = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data),
        
    };
    fetch(registerAPI,options)
    .then(function(respone){
       return respone.json();
    })
    .then(function(data){
        var isEmpty = Object.keys(data).length === 0;
        var container =   document.getElementById('form');
        if(isEmpty){
            console.log("thất bại")
            container.innerHTML = container.innerHTML + '<br><div class="alert alert-warning alert-sm " role="alert">Tài khoản đã tồn tại!</div>';
            
        }
        else{
            console.log(1);
            window.location.href = "/login/login.html";
        }
    })
}
var ho , ten, taikhoan, matkhau, email, sdt = '';

function dinhDang(ho,ten,email,sdt,diachi,container){
    const nameRegex = /^[a-zA-ZÀ-Ỹà-ỹ ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const addressRegex = /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ0-9\s\/,]+/;
    const phoneNumberRegex = /^(0|\+84)(\d){9,10}$/;
    

    if(nameRegex.test(ho) === false || nameRegex.test(ten)===false || ho === '' || ten === '')
    {
        container.innerHTML = container.innerHTML + '<br><div class="alert alert-warning alert-sm " role="alert">Nhập họ và tên không hợp lệ!</div>';
        return false;
    }

    if(emailRegex.test(email)===false || email === '')
    {
        container.innerHTML = container.innerHTML + '<br><div class="alert alert-warning alert-sm " role="alert">Email không hợp lệ!</div>';
        return false;
    }

    if(addressRegex.test(diachi)===false || diachi === '')
    {
        container.innerHTML = container.innerHTML + '<br><div class="alert alert-warning alert-sm " role="alert">Địa chỉ không hợp lệ!</div>';
        return false;
    }
    
    if (phoneNumberRegex.test(sdt) === false || sdt === '')
    {
        container.innerHTML = container.innerHTML + '<br><div class="alert alert-warning alert-sm " role="alert">Số điện thoại không hợp lệ!</div>';
        return false;
    }
    
    return true;
}

document.getElementById("dangky").addEventListener('click',function(event){
  event.preventDefault();
  var ho = document.getElementById('firstName').value;
  var ten = document.getElementById('lastName').value;
  var taikhoan = document.getElementById('username').value;
  var matkhau = document.getElementById('password').value;
  var email = document.getElementById('email').value;
  var sdt = document.getElementById('phone').value;
  var diachi = document.getElementById('address').value;
  var container =   document.getElementById('form');
  var gioitinh = document.getElementById('gioitinh').value;
  if(dinhDang(ho,ten,email,sdt,diachi,container))
  {
    console.log("Tiep tuc");
    data = {
        'ho':ho,
        'ten':ten,
        'gioitinh':gioitinh,
        'tendangnhap':taikhoan,
        'matkhau':matkhau,
        'email':email,
        'sodienthoai':sdt,
        'diachi':diachi
    }
    Register(data);
  }
  else{
    console.log("That bai dinh dang")
    //location.reload(true);
  }
})


