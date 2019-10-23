

var contentDonHang= document.getElementById('content-donhang');
var contentThongtinKH= document.getElementById('content-thongtin');
var contentXacnhan =document.getElementById('content-xacnhan');

var tabDonhang = document.getElementById('tab-donhang');
var tabThongtinKH = document.getElementById('tab-thongtin');
var tabXacNhan= document.getElementById('tab-xacnhan');

function nexttabThongtin()
{
    tabDonhang.classList.remove("active"); 
    tabThongtinKH.classList.add("active");
    contentDonHang.classList.remove("active");
    contentThongtinKH.classList.add("active");
    tabDonhang.classList.add("disabled");

}

function nexttabXacnhan()
{
    tabThongtinKH.classList.remove("active");
    tabXacNhan.classList.add("active");
    contentThongtinKH.classList.remove("active");
    contentXacnhan.classList.add("active");
    tabThongtinKH.classList.add("disabled");
}


function dathangSuccess()
{
    swal({
        title: "Đặt hàng thành công !",
        
        icon: "success",
      });
}


function huyDathang()
{
    
      swal({
        title: "Bạn có muốn hủy đơn hàng !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            swal({
                title: "Đã hủy !",
                icon :"success",
            });
            window.location= "TrangChu.jsp";
        
        } else {
          swal({
              title : "Mời bạn kiểm tra lại thông tin đặt hàng !",
              icon: "info",
          });
        }
      })
}
