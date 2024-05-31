window.localStorage.clear();
var loginAPI = 'http://localhost:8080/api-login'
function login (data) {
    var options = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data),
        
    };
    
    fetch(loginAPI,options)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        var isEmpty = Object.keys(data).length === 0; 
        if (isEmpty) {
            alert('Đăng nhập không thành công')
        }
        else{
            localStorage.setItem('tendangnhap',data['tendangnhap']);
            window.location.href = "/home/home.html";
        }
        
    })
    .catch(function(erro){
        console.error(erro);
    })
}

var username ='';
var password = '';

document.getElementById('dangnhap').addEventListener('click',function(){
     username = document.getElementById('user').value;
     password = document.getElementById('pass').value;
     var data = {
        'tendangnhap':username,
        'matkhau':password
    };
    login(data);
    
});

document.getElementById('taotaikhoan').addEventListener('click',function(){
    window.location.href="/sign-up/signup.html"
})


