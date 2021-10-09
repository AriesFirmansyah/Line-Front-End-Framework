

var i = 0;
var mie_ayam = 0;
var nasi_goreng = 0;
var ayam_goreng = 0;
console.log('Created by Aries Firmansyah')

window.onload = function() {
    const useNodeJS = false;   
    const defaultLiffId = "1655527783-OpGgorY5";  
    let myLiffId = "";
    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                inisialisasi1(myLiffId);
            })
            .catch(function(error) {
                document.getElementById("info1").classList.add('hidden');
                document.getElementById("info4").classList.remove('hidden');
            });
    } else {
        myLiffId = defaultLiffId;
        inisialisasi1(myLiffId);
    }
    awal();
};
function inisialisasi1(myLiffId) {
    if (!myLiffId) {
        document.getElementById("info1").classList.add('hidden');
        document.getElementById("info2").classList.remove('hidden');
    } else {
        liff
            .init({
                liffId: myLiffId
            })
            .then(() => {
                display1();
            })
            .catch((err) => {
                document.getElementById("info1").classList.add('hidden');
                document.getElementById("info3").classList.remove('hidden');
            });
    }
}
function display1() {
    greet();
    buttonLiff();
    infobrowser();
    buttonFunction();
    buttonLoginLogout();
}
function buttonFunction() {
    document.getElementById('order1').addEventListener('click', function(a) {
        a.preventDefault();
        order1();
    });
    document.getElementById('order2').addEventListener('click', function(a) {
        a.preventDefault();
        order2();
    });
    document.getElementById('order3').addEventListener('click', function(a) {
        a.preventDefault();
        order3();
    });
    document.getElementById('btnExternalWindow').addEventListener('click', function() {
        liff.openWindow({
            url: 'https://project-liff-jajandong.herokuapp.com/', 
            external: true
        });
    });
    document.getElementById('closeLIFF').addEventListener('click', function() {
        if (!liff.isInClient()) {
            bukanClient();
        } else {
            liff.closeWindow();
        }
    });
    document.getElementById('pesan').addEventListener('click', function() {
        pesan();
    });
    document.getElementById('btnLogin').addEventListener('click', function() {
        if (!liff.isLoggedIn()) {
            liff.login();
        }
    });
 
    document.getElementById('btnLogout').addEventListener('click', function() {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }
    });
}

function infobrowser() {
    if (liff.isInClient()) {
        document.getElementById('btnLogin').classList.toggle('hidden');
        document.getElementById('btnLogout').classList.toggle('hidden');
        document.getElementById('browserinfo').textContent = 'You are opening the app in the in-app browser of LINE.';
    } else {
        document.getElementById('browserinfo').textContent = 'You are opening the app in an external browser.';
    }
}

const belum_login = "<p><img class='greet' src='./images/customer.png' /> Hi Customer, Yuk dilihat menu makanan yang tersedia dan segera pesan! </p>";
const sudah_login = ", Yuk dilihat menu makanan yang tersedia dan segera pesan! </p>";
function greet() {
    if (liff.isLoggedIn()) {
        liff.getProfile().then(function(profile) {
            document.getElementById('greet').innerHTML = "<p><img class='greet' src='"+profile.pictureUrl+"' /> Hi " + profile.displayName + sudah_login
        }).catch(function(error) {
            window.alert('Error getting profile: ' + error);
        });
    } else {
        document.getElementById('greet').innerHTML = belum_login
    }
}
function order1(){
    if (liff.isLoggedIn()) {
        i += 1;
        mie_ayam += 1;
        liff.getProfile().then(function(profile) {
            let nama_pemesan = profile.displayName;
            let nama_makanan = $('#nama1').text()
            let harga = $('#harga1').text()
            const buttonhapus = '<td><button onclick="mieayam(this)" class="btn btn-danger btn-small">Hapus</button></td>'
            let tbody = document.querySelector('tbody')
            let row = '<tr><td>'+i+'</td><td>'+nama_pemesan+'</td><td>'+nama_makanan+'</td><td>'+harga+'</td>'+buttonhapus+'</tr>'
            $('#defaultorder').remove()
            tbody.innerHTML += row;
        }).catch(function(error) {
            window.alert('Error getting profile: ' + error);
        });
        alert('Mie ayam telah ditambahkan kedalam list pesanan!')
    } else {
        login_dahulu();
    }
}
function order2(){
    if (liff.isLoggedIn()) {
        i += 1;
        ayam_goreng += 1;
        liff.getProfile().then(function(profile) {
            let nama_pemesan = profile.displayName;
            let nama_makanan = $('#nama2').text()
            let harga = $('#harga2').text()
            const buttonhapus = '<td><button onclick="ayamgoreng(this)" class="btn btn-danger btn-small">Hapus</button></td>'
            let tbody = document.querySelector('tbody')
            let row = '<tr><td>'+i+'</td><td>'+nama_pemesan+'</td><td>'+nama_makanan+'</td><td>'+harga+'</td>'+buttonhapus+'</tr>'
            $('#defaultorder').remove()
            tbody.innerHTML += row;
        }).catch(function(error) {
            window.alert('Error getting profile: ' + error);
        });
        alert('Ayam goreng telah ditambahkan kedalam list pesanan!')
    } else {
        login_dahulu();
    }
}
function order3(){
    if (liff.isLoggedIn()) {
        i += 1;
        nasi_goreng += 1 ;
        liff.getProfile().then(function(profile) {
            let nama_pemesan = profile.displayName;
            let nama_makanan = $('#nama3').text()
            let harga = $('#harga3').text()
            const buttonhapus = '<td><button onclick="nasigoreng(this)" class="btn btn-danger btn-small">Hapus</button></td>'
            let tbody = document.querySelector('tbody')
            let row = '<tr><td>'+i+'</td><td>'+nama_pemesan+'</td><td>'+nama_makanan+'</td><td>'+harga+'</td>'+buttonhapus+'</tr>'
            $('#defaultorder').remove()
            tbody.innerHTML += row;
        }).catch(function(error) {
            window.alert(error);
        });
        alert('Nasi goreng telah ditambahkan kedalam list pesanan!')
    } else {
        login_dahulu();
    }
}
function login_dahulu() {
    $('#cont1').hide()
    $('#contOrder').hide()
    $('#cont2').show()
    $('#exBrowserbtn').hide()

    document.getElementById('login').onclick = function() {
        liff.login()
    }
}
function buttonLiff() {
    if (liff.isInClient()) {
        $('#buttonTop').show()
    }
}
function bukanClient() {
    alert('Maaf, kamu tidak login menggunakan aplikasi LINE. Silahkan login melalui aplikasi LINE.')
}
function pesan() {
    if(mie_ayam != 0 || ayam_goreng != 0 || nasi_goreng || 0) {
        let j;
        let counter = 1;
        let total = ((mie_ayam * 15000) + (ayam_goreng * 11000) + (nasi_goreng * 18000))
        if (!liff.isLoggedIn()) {
            login_dahulu();
        } else {
            liff.getProfile().then(function(profile) {
                let nama_pemesan = profile.displayName;
                liff.sendMessages([{
                    'type': 'text',
                    'text': "Hai " + nama_pemesan + ", Terimakasih telah memesan makanan." +
                    " Pesanan anda yaitu : " + mie_ayam + " mie ayam, " + ayam_goreng + " ayam goreng, " +
                    nasi_goreng + " nasi goreng. Total pembayaran yaitu Rp. " + total + ",-. Pesanan segera dikirim mohon ditunggu. " +
                    "Terima kasih!"
                }])
                let tabel = document.getElementById('tabel')
                let isitabel = tabel.rows.length
                for (j = 1; j < isitabel ; j++) {
                    tabel.deleteRow(counter);
                }
                alert('Terima kasih telah memesan! Pesanan akan segera diproses.')
                mie_ayam = 0;
                ayam_goreng = 0;
                nasi_goreng = 0;
            }).catch(function(error) {
                window.alert(error);
            });
            
        }
    } else {
        alert('List pesanan masih kosong! silahkan order terlebih dahulu');
    }
    
}
function buttonLoginLogout() {
    if (liff.isLoggedIn()) {
        document.getElementById('btnLogin').disabled = true;
    } else {
        document.getElementById('btnLogout').disabled = true;
    }
}
function mieayam(data) {
    mie_ayam -= 1;
    hapusData(data)
}
function ayamgoreng(data) {
    ayam_goreng -= 1;
    hapusData(data)
}
function nasigoreng(data) {
    nasi_goreng -= 1;
    hapusData(data)
}
function hapusData(data){
    var i = data.parentNode.parentNode.rowIndex;
    let isitabel = document.getElementById('tabel')
    isitabel.deleteRow(i);
}

function awal() {
    //SHOW MODAL 1
    $(document).ready(function(){
        $('#details1').on('click', function(a){
            a.preventDefault()
            let productModal = $('#productModal1')
            productModal.modal('show')
        })
    })
    //SHOW MODAL 2
    $(document).ready(function(){
        $('#details2').on('click', function(a){
            a.preventDefault()
            let productModal = $('#productModal2')
            productModal.modal('show')
        })
    })//SHOW MODAL 2
    $(document).ready(function(){
        $('#details3').on('click', function(a){
            a.preventDefault()
            let productModal = $('#productModal3')
            productModal.modal('show')
        })
    })
    $('#cont2').hide()
    $('#buttonTop').hide()
}