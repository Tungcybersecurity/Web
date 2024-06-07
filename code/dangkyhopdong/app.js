const API = 'http://localhost:8080/api-taohopdong?';
const thongTinConAPI = 'http://localhost:8080/api-thongtinhocsinh?';

function getSelectedValuesThu() {
    var buttons = document.querySelectorAll('.p');
    var selectedValues = [];

    buttons.forEach(function(button) {
        if (button.style.backgroundColor === 'green') {
            selectedValues.push(button.getAttribute('value'));
        }
    });

    // Remove duplicates and sort
    selectedValues = [...new Set(selectedValues)].sort((a, b) => a - b);
    return selectedValues;
}


function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
    
}

function formatDate2(date)
{
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    console.log(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


function getFutureDate(dayOfWeek) {
    const today = new Date();
    const currentDay = today.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, etc.)
    
    // Adjust the target dayOfWeek to match JavaScript's 0-6 scale (0 = Sunday, ..., 6 = Saturday)
    let targetDay = dayOfWeek === 8 ? 0 : dayOfWeek - 1; // Convert 8 (Chủ Nhật) to 0, and adjust others

    let daysUntilTarget = targetDay - currentDay;
    if (daysUntilTarget <= 0) {
        daysUntilTarget += 7; // Ensure the target day is in the future
    }

    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + daysUntilTarget);

    return formatDate(futureDate);
}


function calculateFutureDate(day) {
    const selectedDay = parseInt(day);
    const futureDate = getFutureDate(selectedDay);

   return futureDate;
}

function doiThuThanhNgay(day)
{
    return calculateFutureDate(day);
}

function addMonthsToDate(dateStr, months) {
    // Tách ngày, tháng, năm từ chuỗi đầu vào
    var parts = dateStr.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1; // Tháng trong đối tượng Date bắt đầu từ 0
    var year = parseInt(parts[2], 10);

    // Tạo đối tượng Date từ các phần đã tách
    var date = new Date(year, month, day);

    // Cộng thêm số tháng
    var newDate = new Date(date.setMonth(date.getMonth() + months));

    // Kiểm tra và điều chỉnh ngày nếu cần thiết
    if (newDate.getDate() !== day) {
        newDate.setDate(0); // Lùi lại một ngày nếu vượt quá số ngày trong tháng mới
    }

    // Trả về chuỗi ngày mới dưới dạng dd/mm/yyyy
    var newDay = newDate.getDate().toString().padStart(2, '0');
    var newMonth = (newDate.getMonth() + 1).toString().padStart(2, '0');
    var newYear = newDate.getFullYear();

    return `${newDay}/${newMonth}/${newYear}`;
}


function setJson()
{   
    const today = new Date();
    var hoTenSelect = document.getElementById('validationCustomten');
    var phuongSelect = document.getElementById('validationCustomphuong');
    var tramSelect = document.getElementById('validationCustomTramDon');
    var truongSelect = document.getElementById('validationCustomTruong');
    var hanSelect = document.getElementById('validationCustomHan');
    var ngayDangKyHopDong = formatDate2(today);
    var  thuTrongTuan = getSelectedValuesThu();
    if(thuTrongTuan.length == 0)
    {
        return;
    }
    var ngayBatDauHopDong = doiThuThanhNgay(thuTrongTuan[0]);
    var ngayKetThucHopDong = addMonthsToDate(ngayBatDauHopDong,parseInt(hanSelect.value));

    var buoiSelect = document.querySelectorAll('.p');
    var cacBuoi = [];
    buoiSelect.forEach(function(buoi){
        if(buoi.style.backgroundColor === 'green')
        {
            cacBuoi.push(buoi.textContent);
        }
    })

    const JsonData = {
        ten:hoTenSelect.value,
        phuong:phuongSelect.value,
        tram:tramSelect.value,
        truong:truongSelect.value,
        han:hanSelect.value,
        ngaydangkyhopdong : ngayDangKyHopDong,
        ngaybatdauhopdong : ngayBatDauHopDong,
        ngayketthuchopdong: ngayKetThucHopDong,
        thutrongtuan:thuTrongTuan,
        buoi:cacBuoi
    };

    return JsonData;
}


    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const result= fetch(thongTinConAPI + new URLSearchParams({tendangnhap: window.localStorage.getItem('tendangnhap')}), options)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
            if (data === null) {
                console.log('Mảng JSON rỗng.');
            } else {
                generateOptionName(data);
            }
    })
    .catch(function(error) {
        console.error('Fetch error:', error);
    });



function generateOptionName(tenhocsinh) {
    var select = document.getElementById('validationCustomten');
    
    console.log(tenhocsinh);
    console.log(tenhocsinh);
    tenhocsinh.forEach(function(student) {
        var opt = document.createElement('option');
        opt.value = student.ho + ' ' + student.ten;
        opt.text = student.ho + ' ' + student.ten;
        select.appendChild(opt);
    });
    
}



function sendForm()
{
    data = setJson();
    var options = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data),
        
    };
    fetch(API + new URLSearchParams({tendangnhap:window.localStorage.getItem('tendangnhap')}),options)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var isEmpty = Object.keys(data).length === 0;
        if(isEmpty){
            alert('Đăng ký không thành công');
        }
        else
        {
            alert('Đăng ký thành công');
        }
    })
    .catch(function(error){
        alert('Đăng ký không thành công');
        console.log(error);
    })

}


