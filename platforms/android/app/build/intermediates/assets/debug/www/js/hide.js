var postImg = document.getElementById('postImg');
var direction = document.getElementById('direction');

// var name = new Date();
// var geocoder = new google.maps.Geocoder;
var actualPosition={};
var imagesRef;
var transition= false;

var init = document.getElementById("init");
var helpSection1 = document.getElementById("helpSection1");
var helpSection2 = document.getElementById("helpSection2");
var helpSection3 = document.getElementById("helpSection3");
var mainMen = document.getElementById("mainMenu");
var regForm = document.getElementById("regForm");
var logForm = document.getElementById("logForm");
var terms = document.getElementById("terms");   
var homeSec = document.getElementById("home");      
var instruction = document.getElementById("instruction");
var options = document.getElementById("options");
var mainPost = document.getElementById("mainPost");
var map = document.getElementById("map");
var feed = document.getElementById("feed");
var we = document.getElementById("weather");
var camNav = document.getElementById("camNav");
var topNav = document.getElementById("topNav");

var bike = document.getElementById("bike");
var car = document.getElementById("car");
var truck = document.getElementById("truck");
var bus = document.getElementById("bus");

var userEmail = document.getElementById("mail_login");
var userPass = document.getElementById("pass_login");

var regUserEmail = document.getElementById("mail_reg");
var regUserPass = document.getElementById("pass_reg");
var repPass = document.getElementById("passr_reg");

var plate = document.getElementById("plate");
var address = document.getElementById("address");
var comment = document.getElementById("comment");

var typeVehicle=0;
// var name;


//INICIALIZACIÓN DE FIREBASE
 var config = {
     apiKey: "AIzaSyD5J7qz77-xxQ4i1eh1F_FEbYNzYl-R64M",
     authDomain: "loginwebfirebase.firebaseapp.com",
     databaseURL: "https://loginwebfirebase.firebaseio.com",
     projectId: "loginwebfirebase",
     storageBucket: "loginwebfirebase.appspot.com",
     messagingSenderId: "246625453677"
 };
//var config = {
    //apiKey: "AIzaSyCXQsWFsLxiBTLGXLV1AefFbNhCjO2v-vU",
    //authDomain: "prueba-764cb.firebaseapp.com",
    //databaseURL: "https://prueba-764cb.firebaseio.com",
    //projectId: "prueba-764cb",
    //storageBucket: "prueba-764cb.appspot.com",
    //messagingSenderId: "704673374693"
//};
///////////////////////////////////////////////////////////////////
firebase.initializeApp(config);

//FUNCIONES PARA PUBLICAR DENUNCIA
window.onload = inicializar;
function inicializar(){

    // initSections();
    // init.style.display = "block";
  
    imagesRef = firebase.database().ref().child('images/');
    // name = firebase.database().ref('images/').push().key;
    showImages();
}
function setOptions(srcType) {
    var options = {
        quality: 50,
        // targetWidth: 300,
        // targetHeight: 400,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        destinationType: navigator.camera.DestinationType.DATA_URL,
        // destinationType: navigator.camera.DestinationType.FILE_URI,      
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}

function openCamera(type) {

    if(type=='CAMERA'){
        var srcType = Camera.PictureSourceType.CAMERA;
    }

    else if(type=='PHOTOLIBRARY'){
        var srcType = Camera.PictureSourceType.PHOTOLIBRARY;
    }

    var options = setOptions(srcType);
    
    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        displayImage(imageUri);
        // getDirection();
        postSection();    
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

function displayImage(imgUri) {
    // 'data:image/jpeg;base64,'+
    postImg.src =  'data:image/jpeg;base64,'+imgUri;
        
}

//FUNCIÓN DE GEOLOCALIZACIÓN
function getDirection(){

    // if (navigator.geolocation) {

    //     //se utiliza la geolocation para centrar el mapa
    //     navigator.geolocation.getCurrentPosition( function(position) {

    //         geocoder.geocode({'location': new google.maps.LatLng(position.coords.latitude,position.coords.longitude)}, function(results, status) {
    //             if (status === 'OK') {
    //               if (results[0]) {
                    
    //                 direction.value = results[0].formatted_address;
    //                 // console.log(results[0].formatted_address);
    //                 // infowindow.setContent(results[1].formatted_address);
    //               } else {
    //                 window.alert('No results found');
    //               }
    //             } else {
    //               window.alert('Geocoder failed due to: ' + status);
    //             }
    //           });
    //         // actualPosition = {
    //         //     lat: parseFloat(position.coords.latitude),
    //         //     lng: parseFloat(position.coords.longitude)
    //         // };
                
    //     }, function() {
    //         // handleLocationError(true, infoWindow, map.getCenter());
    //     });        
    // }
    // else {
          
        
    //     //   handleLocationError(false, infoWindow, map.getCenter());
    //     // handleLocationError(alert('error de geolocalizacion, intente mas tarde'));     
    // }
}
//////////////////////////////////////////////////////////////////////////////////


function uploadImage(){
    // var uploadTask = storageRef.child('img/' + base64Image).put(base64Image);
    // var elem = document.getElementById('imageFile');
    // elem.src = img;
    firebase.database().ref('images/').child(new Date().getTime()).set({
        img: postImg.src,
        vehicle: typeVehicle,
        placa: plate.value,
        address: address.value,
        comment: comment.value 
    });
    alert('enviado');

    mainPost.style.display="none";
    homeSec.style.display="block";
    // console.log(posicionActual);
}

function showImages(){
    imagesRef.on("value", function(snapshot){
        var data = snapshot.val();
        var result = "";
        var num = "";
        for(var key in data){
            // console.log( data[key]);
            result += '<div class="divTitle"><img src = "img/postScreen/gpsLogo.png" class="pinIconSize"/><i class="adrText">' + data[key].address + '</i></div><img class="postImg" src="' + data[key].img + '"/><div class="divComment"><img <img src = "img/postScreen/commentLogo.png" class="textIconSize"/><i class="placaSize">Placa: ' + data[key].placa + '</i></div><div class="comContainer"><p class="textComment">' + data[key].comment +'</p></div><img src = "img/separator.png" class="sep"/>';  
        }
        document.getElementById('feedScroll').innerHTML = result;
    });
}

//LÓGICA DE AUTENTICACIÓN
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        initSections();
        camNav.style.display="none";
        homeSec.style.display = "block";
        topNav.style.display = "block";


        // document.getElementById("home").style.display = "block";
        // document.getElementById("logForm").style.display = "none";

    } else {
        // No user is signed in.
        initSections();
        init.style.display = "block";

        // document.getElementById("home").style.display = "none";
        // document.getElementById("init").style.display = "block";
    }
});

function login() {
     
    if (userEmail.length < 4) {
        alert('Por favor ingrese un correo válido');
        return;
    }

    if (userPass.length < 4) {
        alert('Por favor ingrese una contraseña de más de 4 caracteres');
        return;
    }

    firebase.auth().signInWithEmailAndPassword(userEmail.value, userPass.value).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/wrong-password') {
            alert('Contraseña errónea');
        }
        if (errorCode == 'auth/user-not-found') {
            alert('Correo erróneo');
        }
    });
}

function register(){
    
    if (regUserEmail.length < 4) {
        alert('Por favor ingrese un correo válido');
        return;
    }

    if (regUserPass.length < 4) {
        alert('Por favor ingrese una contraseña de más de 4 caracteres');
        return;
    }

    if(regUserPass === repPass){
        firebase.auth().createUserWithEmailAndPassword(regUserEmail.value, regUserPass.value).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode == 'auth/weak-password') {
                alert('La contraseña es débil');
            } else {
                alert(errorMessage);
            }
        });
    }else{
        alert('Las contraseñas no coinciden');
    }
}

function loginFacebook(){
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');

    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

function logout() {
    firebase.auth().signOut();

    initSections();
    logForm.style.display="block";
    

    // document.getElementById("options").style.display = "none";
    // document.getElementById("logForm").style.display = "block";
}


function initSections(){

    init.style.display = "none";
    helpSection1.style.display = "none";
    helpSection2.style.display = "none";
    helpSection3.style.display = "none";
    mainMen.style.display = "none";
    regForm.style.display = "none";
    logForm.style.display = "none";
    terms.style.display = "none";
    homeSec.style.display = "none";
    instruction.style.display = "none";
    options.style.display = "none";
    mainPost.style.display = "none";
    map.style.display = "none";
    feed.style.display = "none";
    we.style.display = "none";
    camNav.style.display = "none";
    topNav.style.display = "none";
}

// function 

function help(){
       
    init.style.display = "none";
    helpSection1.style.display = "block";
}

function page2() {
    helpSection1.style.display = "none"; 
    helpSection2.style.display = "block"; 
    
}

function page3() {
    helpSection2.style.display = "none"; 
    helpSection3.style.display = "block"; 
}

function mainSection() {
    helpSection3.style.display = "none"; 
    mainMen.style.display= "block";
}

function regSection() {
    mainMen.style.display= "none";
    regForm.style.display= "block";   
}

function loginSection() {
    mainMen.style.display= "none";
    logForm.style.display= "block";
}

function terms() {
    regForm.style.display= "none";   
    terms.style.display = "block";

}

function regScreen() {

    terms.style.display = "none";
    regForm.style.display= "block";
   
}

function skip(){
    helpSection1.style.display = "none";
    helpSection2.style.display = "none";
    helpSection3.style.display = "none";
    mainMen.style.display = "block";
}

function optionScreen(){

    // if(homeSec.style.display == "block"){

    //     homeSec.style.display= "none";
    //     camNav.style = "block";
    //     options.style.display= "block";

    // }

    // else{
        transition= false; 
        initSections();
        topNav.style.display="block";
        homeSec.style.display= "block";
    // }

}

function instructionSection(){

    options.style.display = "none";
    instruction.style.display = "block";

}

function mapSection(){

    options.style.display = "none";
    map.style.display = "block";

}

function weatherSection(){

    options.style.display = "none";
    we.style.display = "block";

}

function feedSection(){

    options.style.display = "none";
    feed.style.display = "block";

}

function backOptionScreen(){

    if(transition == true){

        initSections();
        topNav.style.display = "block";
        mainPost.style.display = "block";
        transition= false; 
    }
    else if(homeSec.style.display == "block"){

        homeSec.style.display= "none";
        camNav.style = "block";
        options.style.display= "block";

    }
    else if(mainPost.style.display == "block"){

        mainPost.style.display = "none";
        options.style.display= "block";

        transition= true;
    }

    else{
        instruction.style.display = "none";
        map.style.display = "none";
        feed.style.display = "none";
        we.style.display = "none";
        options.style.display= "block";
    }

}

function postSection() {

    initSections();
    topNav.style.display="block";
    mainPost.style.display="block";

}

function backMenu(){

    if(regForm.style.display=="block"){

        regForm.style.display ="none";
        mainMen.style.display= "block";

    }
    else{
        logForm.style.display ="none";
        mainMen.style.display= "block";
    }
    
    
}

function showTerms(){
    regForm.style.display ="none";
    terms.style.display = "block";
}

function showTerms(){
    regForm.style.display ="none";
    terms.style.display = "block";
}

function backReg(){
    terms.style.display ="none";
    regForm.style.display = "block";
}

function resetVehicle(){
    bike.style.opacity = 0.5;
    car.style.opacity = 0.5;
    truck.style.opacity = 0.5;
    bus.style.opacity = 0.5;

}

function selectVehicle(vehiculo,value){
    resetVehicle();
    vehiculo.style.opacity = 1;
    typeVehicle=value;
    
}