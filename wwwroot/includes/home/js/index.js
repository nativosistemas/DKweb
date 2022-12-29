var marcadores = [];
var markers = [];
var infowindow;
var mapCenter = false;
//var infowindow = new google.maps.InfoWindow({
//    content: 'hola'
//});
function setMarkers(map, marcadores) {
    for (var i = 0; i < marcadores.length; i++) {
        var myLatLng = new google.maps.LatLng(marcadores[i][0], marcadores[i][1]);
        var markerOptions = {
            draggable: false,
            position: myLatLng,
            map: map,
            icon: '../img/home/pin.png',
            cursor: 'default',
            //title:String( i),
        };
        var marker = new google.maps.Marker(markerOptions);
        //marker.setDraggable(false);
        //marker.addListener('click', function () {
        //    infowindow.open(map, marker);
        //});
        markers.push(marker);
    }
};
function toggleBounce(i) {
    if (markers[i].getAnimation() !== null) {
        markers[i].setAnimation(null);
    } else {
        markers[i].setAnimation(google.maps.Animation.BOUNCE);
    }
}
function cleanToggleBounce() {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].getAnimation() !== null)
            markers[i].setAnimation(null);
    }
}
function initialize() {
    var latlng = mapCenter || new google.maps.LatLng(-32.1011169, -63.1149614);
    var mapOptions = {
        zoom: 7,
        scrollwheel: false,
        center: latlng,
        mapTypeControl: false,
        disableDefaultUI: true,
        scaleControl: true,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    var map = new google.maps.Map(document.getElementById('map_canvas2'), mapOptions);
    if (marcadores.length > 0)
        setMarkers(map, marcadores);
}

window.onload = function () {
    //initialize();
}

jQuery(document).ready(function () {
    prepararListaOfertas($('#hiddenListaOfertas').val());
    prepararListaLanzamiento($('#hiddenListaLanzamiento').val());
    prepararListaSlider($('#hiddenListaSlider').val());
    prepararListaReCallIndex($('#hiddenListaReCallIndex').val());

    marcadores = [
        [-32.9473525, -60.6584076], // ROSARIO
        [-33.3238042, -62.040751], // CHAÑAR LADEADO
        [-32.4792071, -58.2420151], // CONCEPCIÓN DEL URUGUAY
        [-31.3821006, -58.0284041], // CONCORDIA
        [-31.4228, -64.1779887], // CÓRDOBA
        [-31.6171734, -60.7148425], // SANTA FE
        [-33.3569151, -60.2202083], // SAN NICOLAS
        [-32.4087439, -63.2474843] // VILLA MARIA
    ];

    /////mapa	

    $('.div_ref_mapa .ref_mapa a[data-role="expand-info"]').each(function () {
        $(this).removeAttr('href').css('cursor', 'pointer').click(function () {
            var infoMapa = $(this).attr('data-info');

            if ($(this).hasClass('active')) {
                $('.div_info_mapa').addClass('hidden');
                $('.div_info_mapa .info_mapa').addClass('hidden');
                $(this).removeClass('active');
                var mrk = parseInt(infoMapa, 10) - 1;
                if (markers[mrk]) {
                    if (markers[mrk].getAnimation() !== null)
                        markers[mrk].setAnimation(null);
                    // markers[mrk][3].setDraggable(true);
                }
                return;
            }
            $('.div_info_mapa').removeClass('hidden');
            $('.div_info_mapa .info_mapa').addClass('hidden');
            $('.div_ref_mapa .ref_mapa a[data-role="expand-info"]').removeClass('active');
            $(this).addClass('active');
            $('.div_info_mapa .info_mapa[data-info=' + infoMapa + ']').removeClass('hidden');
            var mrk = parseInt(infoMapa, 10) - 1;
            cleanToggleBounce();
            if (markers[mrk])
                toggleBounce(mrk);

        });
    });
});


//function testMap() {
//    //$('.div_info_mapa').removeClass('hidden');
//    //$('.div_info_mapa .info_mapa').addClass('hidden');
//    //$('.div_info_mapa .info_mapa[data-info=' + indexInfoMapa + ']').removeClass('hidden');
//    $('.info_mapa_bg').addClass('hidden');
//}