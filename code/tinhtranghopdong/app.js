const tinhTrangHopDongAPI = 'http://localhost:8080/api-chitiethopdong?';

function changeDay(data){
    var s = data.split('-');
    var day = s[0];
    var moth = s[1];
    var year = s[2];
    return `${day}/${moth}/${year}`;
}

function genrateCode(data){
    data['ngaydangky'] = changeDay(data['ngaydangky']);
    data['ngaythanhtoan'] = changeDay(data['ngaythanhtoan']);
    var newHTML= `
    <div class="col-11 form">
    <p>Hợp đồng: ${data['idhopdong']}</p>
    <br>
    <p>Tên con: ${data['ten']}</p>
    <p>Ngày đăng ký hợp đồng: ${data['ngaydangky']}</p>
    <p>Giá hợp đồng: ${data['tien']}VNĐ</p>
    <p>Ngày thanh toán: ${data['ngaythanhtoan']}</p>
    <p>Lớp: ${data['lop']}</p>
    <p>Trường: ${data['truong']}</p>
    <p>Tình trạng: <span class="span1" >${data['tinhtrang']}</span></p>
  </div>
    `;
    var rootElement = document.querySelector('.profile__profile-row');

    rootElement.insertAdjacentHTML('beforeend',newHTML);


}

function show()
{
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(tinhTrangHopDongAPI + new URLSearchParams({tendangnhap:window.localStorage.getItem('tendangnhap')}),options)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        if(data===null){
            console.log('JSON rỗng');
            var rootElement = document.querySelector('.profile__profile-row');
            rootElement.insertAdjacentHTML('beforeend',`<div class="button" onclick="redirectPage()">Thêm</div>`);
        }
        else{
            var mang = [];
            data.forEach(function(item){
                genrateCode(item);
                mang.push(item['ten']);
            })
            window.localStorage.setItem('tenhocsinh',mang); 
            var rootElement = document.querySelector('.profile__profile-row');
                rootElement.insertAdjacentHTML('beforeend',`<div class="button" onclick="redirectPage()">Thêm</div>`);
        }
    })
    .catch(function(error){
        console.log(error);

    })
}

show();


function redirectPage(){
    window.location.href="/dangkyhopdong/dangkyhopdong.html";
}
