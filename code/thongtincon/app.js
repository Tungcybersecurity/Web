const thongTinConAPI = 'http://localhost:8080/api-thongtinhocsinh?';

var soluong = 0;
function addNewProduct(name, imgSrc,id) {
  // Tạo HTML cho sản phẩm mới
  const newProductHTML = `
      <div class="col col-md-4">
          <div class="product-container">
              <img src="${imgSrc}" alt="${name}" class="product-img">
              <div class="product-button">
                  <p>${name}</p>
                  <button class="btn btn-primary" onclick=detalInfomation(${id})>Xem</button>
              </div>
          </div>
      </div>
  `;

  // Lấy phần tử có class là "row gy-5"
  const rowElement = document.querySelector('.row.gy-5');

  // Thêm sản phẩm mới vào phần tử
  rowElement.insertAdjacentHTML('beforeend', newProductHTML);
}

function getAllInfomationStudents() {
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(thongTinConAPI + new URLSearchParams({tendangnhap: window.localStorage.getItem('tendangnhap')}), options)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
            if (Array.isArray(data) && data.length === 0) {
                console.log('Mảng JSON rỗng.');
            } else {
                var name = '';
                soluong=data.length;
                console.log(soluong);
                data.forEach(function(item) {
                    name = item['ho'] + ' ' + item['ten'];
                    addNewProduct(name, item['filepathimage'],item['idhocsinh']);
                });
            }
    })
    .catch(function(error) {
        console.error('Fetch error:', error);
    });
}
getAllInfomationStudents();

function detalInfomation(id){
    window.localStorage.setItem('idhocsinh',id);
    window.location.href="/xemthongtincon/themthongtincon.html";
}

function them(){
    window.location.href="/themcon/themcon.html";
}