function timTram(){
    location_station = {
        "Học viện Công nghệ BCVT_Tp.HCM": {
          "latitude":10.85068448830226,
          "longitude":106.78683636064484
        },
        "Đại học HUTECH": {
          "latitude": 10.855885704992833,
          "longitude": 106.78568189709543
        },
        "Bệnh viện Quân Dân Y Miền Đông": {
          "latitude": 10.846147358535983,
          "longitude": 106.7785418394233
        },
        "Chùa Bửu Long": {
          "latitude": 10.879111509606366,
          "longitude": 106.83498329524402
        },
        "Công viên lịch sử Văn hóa Dân tộc": {
          "latitude": 10.884019977825506,
          "longitude": 106.82469880873634
        },
        "Trường Đại học Luật": {
          "latitude": 10.834747730604688,
          "longitude": 106.7138078160358
        },
        "Chợ Long Phước": {
          "latitude": 10.808615266827873,
          "longitude": 106.85988299524305
        },
        "Trạm Y tế phường Long Thạnh Mỹ": {
          "latitude": 10.845732258799693,
          "longitude": 106.8172386375717
        },
        "Trường Đại học FPT": {
          "latitude": 10.841254037519386,
          "longitude": 106.80992591058732
        },
        "Sân cầu lông LĐC Sport": {
          "latitude": 10.817859515288173,
          "longitude": 106.80885272816671
        },
        "Villa park": {
          "latitude": 10.803071602456898,
          "longitude":106.80026405503165
        },
        "Công tác Kỹ Nghệ II": {
          "latitude": 10.821207469177224,
          "longitude": 106.77164176825896
        },
        "Cao đẳng Kinh Tế Đối Ngoại": {
          "latitude": 10.816009125917672,
          "longitude": 106.77146886506141
        },
        "Trường tư thục Ngô Thời Nhiệm": {
          "latitude": 10.825875393717633,
          "longitude": 106.76488046100042
        },
        "Sân bóng đá Bắc Rạch Chiếc": {
          "latitude": 10.816327716803423,
          "longitude": 106.7629931630231
        },
        "Cao đẳng Công Thương": {
          "latitude": 10.837087365609259,
          "longitude": 106.75886466640749
        },
        "Trường Đại học Giao Thông Vận Tải": {
          "latitude": 10.847701957579858,
          "longitude": 106.77602896679096
        },
        "Bệnh viện Đa khoa Lê Văn Việt": {
          "latitude":10.845118459189486,
          "longitude": 106.79003288175143
        },
        "Trường THCS Hoa Lư": {
          "latitude": 10.83871505048251,
          "longitude": 106.7733910510637
        },
        "The Stay Saigon Riverfront": {
          "latitude": 10.81488748695497,
          "longitude": 106.84098799524308
        },
        "Suối tiên":{
          "latitude": 10.871795063230595,
          "longitude": 106.80418115622535
        }
      }
    
      /// Hàm để tính khoảng cách giữa hai điểm dựa trên tọa độ latitude và longitude
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Bán kính trái đất ở đơn vị km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Khoảng cách giữa hai điểm
        return d;
    }
    
    // Hàm chuyển đổi độ sang radian
    function toRad(degrees) {
        return degrees * Math.PI / 180;
    }
    
    // Lấy vị trí hiện tại của bạn sử dụng Geolocation API
    if (confirm("Bạn có chia sẻ vị trí của mình để tìm trạm gần nhất không?")) {
        // Nếu người dùng đồng ý chia sẻ vị trí, tiếp tục lấy vị trí hiện tại của họ
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
              const yourLatitude = position.coords.latitude;
              const yourLongitude = position.coords.longitude;
    
                let closestLocation = null;
                let closestDistance = Infinity;
    
                // Tính khoảng cách từ vị trí của bạn đến từng địa điểm và tìm vị trí gần nhất
                for (const location in location_station) {
                    const { latitude, longitude } = location_station[location];
                    const distance = calculateDistance(yourLatitude, yourLongitude, latitude, longitude);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestLocation = location;
                    }
                }
        const selectElement = document.getElementById('validationCustomTramDon');

        // Giá trị option bạn muốn hiển thị
        const desiredValue = closestLocation; // Thay đổi giá trị này nếu bạn muốn hiển thị option khác

        // Lặp qua từng option trong select và kiểm tra giá trị
        for (let i = 0; i < selectElement.options.length; i++) {
            const option = selectElement.options[i];
            if (option.value === desiredValue) {
                // Nếu giá trị của option trùng với giá trị mong muốn, thiết lập thuộc tính selected
                option.selected = true;
                break; // Kết thúc vòng lặp vì đã tìm được option mong muốn
            }
        }
                alert(`Địa điểm gần nhất từ vị trí của bạn là ${closestLocation} với khoảng cách là ${closestDistance.toFixed(2)} km`);
            });
        } else {
            console.log("Trình duyệt không hỗ trợ Geolocation.");
        }
    } else {
        console.log("Người dùng không chia sẻ vị trí của mình.");
    }
}