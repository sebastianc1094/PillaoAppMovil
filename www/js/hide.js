var postImg = document.getElementById('postImg');
var direction = document.getElementById('direction');

var name = (new Date()).getTime();
var geocoder = new google.maps.Geocoder;
var actualPosition={};
var imagesRef;

//INICIALIZACIÓN DE FIREBASE
 //var config = {
   //  apiKey: "AIzaSyD5J7qz77-xxQ4i1eh1F_FEbYNzYl-R64M",
     //authDomain: "loginwebfirebase.firebaseapp.com",
     //databaseURL: "https://loginwebfirebase.firebaseio.com",
     //projectId: "loginwebfirebase",
     //storageBucket: "loginwebfirebase.appspot.com",
     //messagingSenderId: "246625453677"
 //};
firebase.initializeApp(config);
var config = {
    apiKey: "AIzaSyCXQsWFsLxiBTLGXLV1AefFbNhCjO2v-vU",
    authDomain: "prueba-764cb.firebaseapp.com",
    databaseURL: "https://prueba-764cb.firebaseio.com",
    projectId: "prueba-764cb",
    storageBucket: "prueba-764cb.appspot.com",
    messagingSenderId: "704673374693"
};
///////////////////////////////////////////////////////////////////

//FUNCIONES PARA PUBLICAR DENUNCIA
window.onload = inicializar;
function inicializar(){  
    imagesRef = firebase.database().ref().child('images/');
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
        getDirection();
        postSection();    
        // uploadImage(imageUri);
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

    if (navigator.geolocation) {

        //se utiliza la geolocation para centrar el mapa
        navigator.geolocation.getCurrentPosition( function(position) {

            geocoder.geocode({'location': new google.maps.LatLng(position.coords.latitude,position.coords.longitude)}, function(results, status) {
                if (status === 'OK') {
                  if (results[0]) {
                    
                    direction.value = results[0].formatted_address;
                    // console.log(results[0].formatted_address);
                    // infowindow.setContent(results[1].formatted_address);
                  } else {
                    window.alert('No results found');
                  }
                } else {
                  window.alert('Geocoder failed due to: ' + status);
                }
              });
            // actualPosition = {
            //     lat: parseFloat(position.coords.latitude),
            //     lng: parseFloat(position.coords.longitude)
            // };
                
        }, function() {
            // handleLocationError(true, infoWindow, map.getCenter());
        });        
    }
    else {
          
        
        //   handleLocationError(false, infoWindow, map.getCenter());
        // handleLocationError(alert('error de geolocalizacion, intente mas tarde'));     
    }
}
//////////////////////////////////////////////////////////////////////////////////


function uploadImage(){
    // var uploadTask = storageRef.child('img/' + base64Image).put(base64Image);
    // var elem = document.getElementById('imageFile');
    // elem.src = img;
    firebase.database().ref('images/').child(name).set({ img: postImg.src });
    // console.log(posicionActual);
}

function showImages(){
    imagesRef.on("value", function(snapshot){
        var data = snapshot.val();
        var result = "";
        var num = "";
        for(var key in data){
            // console.log( data[key]);
            result += '<img class="postImg" src="' + data[key].img + '"/>';  
        }
        document.getElementById('feedScroll').innerHTML = result;
    });
}

//LÓGICA DE AUTENTICACIÓN
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.getElementById("home").style.display = "block";
        document.getElementById("logForm").style.display = "none";

    } else {
        // No user is signed in.
        document.getElementById("home").style.display = "none";
        document.getElementById("init").style.display = "block";
    }
});

function login() {
    var userEmail = document.getElementById("mail_login").value;
    var userPass = document.getElementById("pass_login").value;

    if (userEmail.length < 4) {
        alert('Por favor ingrese un correo válido');
        return;
    }

    if (userPass.length < 4) {
        alert('Por favor ingrese una contraseña de más de 4 caracteres');
        return;
    }

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
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
    var userEmail = document.getElementById("mail_reg").value;
    var userPass = document.getElementById("pass_reg").value;
    var repPass = document.getElementById("passr_reg").value;

    if (userEmail.length < 4) {
        alert('Por favor ingrese un correo válido');
        return;
    }

    if (userPass.length < 4) {
        alert('Por favor ingrese una contraseña de más de 4 caracteres');
        return;
    }

    if(userPass === repPass){
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error){
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
    document.getElementById("options").style.display = "none";
    document.getElementById("logForm").style.display = "block";
}


//LÓGICA DE LOS CONTENEDORES DEL INDEX PARA MOSTRAR/OCULTAR
function help(){
    var helpSection1 = document.getElementById("helpSection1");
    var init = document.getElementById("init");
    if (helpSection1.style.display == "block"){
        helpSection1.style.display = "none";
    } else {
        helpSection1.style.display = "block";
        init.style.display = "none";
    }
}

function page2() {
    var helpSection2 = document.getElementById("helpSection2");
    var helpSection1 = document.getElementById("helpSection1");
    if (helpSection2.style.display == "block") {
        helpSection2.style.display = "none";
    } else {
        helpSection2.style.display = "block";
        helpSection1.style.display = "none";
    }
}

function page3() {
    var helpSection3 = document.getElementById("helpSection3");
    var helpSection2 = document.getElementById("helpSection2");
    if (helpSection3.style.display == "block") {
        helpSection3.style.display = "none";
    } else {
        helpSection3.style.display = "block";
        helpSection2.style.display = "none";
    }
}

function mainSection() {
    var mainMen = document.getElementById("mainMenu");
    var helpSection3 = document.getElementById("helpSection3");
    if (mainMen.style.display == "block") {
        mainMen.style.display = "none";
    } else {
        mainMen.style.display = "block";
        helpSection3.style.display = "none";
    }
}

function regSection() {
    var mainMen = document.getElementById("mainMenu");
    var regForm = document.getElementById("regForm");
    if (regForm.style.display == "block") {
        regForm.style.display = "none";
    } else {
        regForm.style.display = "block";
        mainMen.style.display = "none";
    }
}

function loginSection() {
    var mainMen = document.getElementById("mainMenu");
    var logForm = document.getElementById("logForm");
    if (logForm.style.display == "block") {
        logForm.style.display = "none";
    } else {
        logForm.style.display = "block";
        mainMen.style.display = "none";
    }
}

function terms() {
    var regForm = document.getElementById("regForm");
    var terms = document.getElementById("terms");   
    if (terms.style.display == "block") {
        terms.style.display = "none";
    } else {
        terms.style.display = "block";
        regForm.style.display = "none";
    }
}

function regScreen() {
    var terms = document.getElementById("terms");
    var regForm = document.getElementById("regForm");   
    if (regForm.style.display == "block") {
        regForm.style.display = "none";
    } else {
        regForm.style.display = "block";
        terms.style.display = "none";
    }
}

function homeSection() {
    var logForm = document.getElementById("logForm");
    var homeSec = document.getElementById("home");      
    if (homeSec.style.display == "block") {
        homeSec.style.display = "none";
    } else {
        homeSec.style.display = "block";
        logForm.style.display = "none";
    }
}

function homeSection2() {
    var instruction = document.getElementById("instruction");
    var homeSec = document.getElementById("home");
    if (homeSec.style.display == "block") {
        homeSec.style.display = "none";
    } else {
        homeSec.style.display = "block";
        instruction.style.display = "none";
    }
}

function homeSection3() {
    var options = document.getElementById("options");
    var homeSec = document.getElementById("home");
    if (homeSec.style.display == "block") {
        homeSec.style.display = "none";
    } else {
        homeSec.style.display = "block";
        options.style.display = "none";
    }
}

function homeSection4() {
    var mainPost = document.getElementById("mainPost");
    var homeSec = document.getElementById("home");
    if (homeSec.style.display == "block") {
        homeSec.style.display = "none";
    } else {
        homeSec.style.display = "block";
        mainPost.style.display = "none";
    }
}

function homeSection5() {
    var map = document.getElementById("map");
    var homeSec = document.getElementById("home");
    if (homeSec.style.display == "block") {
        homeSec.style.display = "none";
    } else {
        homeSec.style.display = "block";
        map.style.display = "none";
    }
}

function homeSection6() {
    var feed = document.getElementById("feed");
    var homeSec = document.getElementById("home");
    if (homeSec.style.display == "block") {
        homeSec.style.display = "none";
    } else {
        homeSec.style.display = "block";
        feed.style.display = "none";
    }
}

function optionScreen() {
    var homeSec = document.getElementById("home");
    var option = document.getElementById("options");        
    if (option.style.display == "block") {
        option.style.display = "none";
    } else {
        option.style.display = "block";
        homeSec.style.display = "none";
    }
}

function optionScreen2() {
    var instruction = document.getElementById("instruction");
    var option = document.getElementById("options");
    if (option.style.display == "block") {
        option.style.display = "none";
    } else {
        option.style.display = "block";
        instruction.style.display = "none";
    }
}

function optionScreen3() {
    var mainPost = document.getElementById("mainPost");
    var option = document.getElementById("options");
    if (option.style.display == "block") {
        option.style.display = "none";
    } else {
        option.style.display = "block";
        mainPost.style.display = "none";
    }
}

function optionScreen4() {
    var map = document.getElementById("map");
    var option = document.getElementById("options");
    if (option.style.display == "block") {
        option.style.display = "none";
    } else {
        option.style.display = "block";
        map.style.display = "none";
    }
}

function optionScreen5() {
    var feed = document.getElementById("feed");
    var option = document.getElementById("options");
    if (option.style.display == "block") {
        option.style.display = "none";
    } else {
        option.style.display = "block";
        feed.style.display = "none";
    }
}

function instructionSection(){
    var option = document.getElementById("options");
    var instruc = document.getElementById("instruction");
    if (instruc.style.display == "block") {
        instruc.style.display = "none";
    } else {
        instruc.style.display = "block";
        option.style.display = "none";
    }
}

function weatherSection() {
    var option = document.getElementById("options");
    var we = document.getElementById("weather");
    if (we.style.display == "block") {
        we.style.display = "none";
    } else {
        we.style.display = "block";
        option.style.display = "none";
    }
}

function weatherSection2() {
    var we = document.getElementById("weather");
    var home = document.getElementById("home");
    if (home.style.display == "block") {
        home.style.display = "none";
    } else {
        home.style.display = "block";
        we.style.display = "none";
    }
}

function weatherSection3() {
    var we = document.getElementById("weather");
    var options = document.getElementById("options");
    if (options.style.display == "block") {
        options.style.display = "none";
    } else {
        options.style.display = "block";
        we.style.display = "none";
    }
}

function weatherSection3() {
    var we = document.getElementById("weather");
    var mainpost = document.getElementById("mainPost");
    if (mainpost.style.display == "block") {
        mainpost.style.display = "none";
    } else {
        mainpost.style.display = "block";
        we.style.display = "none";
    }
}

function mapSection() {
    var option = document.getElementById("options");
    var map = document.getElementById("map");
    if (map.style.display == "block") {
        map.style.display = "none";
    } else {
        map.style.display = "block";
        option.style.display = "none";
    }
}

function postSection() {

    var home = document.getElementById("home");
    var post = document.getElementById("mainPost");
    if (post.style.display == "block") {
        post.style.display = "none";
    } else {
        post.style.display = "block";
        home.style.display = "none";
    }
}

function postSection2() {
    var instruction = document.getElementById("instruction");
    var post = document.getElementById("mainPost");
    if (post.style.display == "block") {
        post.style.display = "none";
    } else {
        post.style.display = "block";
        instruction.style.display = "none";
    }
}

function postSection3() {
    var options = document.getElementById("options");
    var post = document.getElementById("mainPost");
    if (post.style.display == "block") {
        post.style.display = "none";
    } else {
        post.style.display = "block";
        options.style.display = "none";
    }
}

function postSection4() {
    var map = document.getElementById("map");
    var post = document.getElementById("mainPost");
    if (post.style.display == "block") {
        post.style.display = "none";
    } else {
        post.style.display = "block";
        map.style.display = "none";
    }
}

function postSection5() {
    var feed = document.getElementById("feed");
    var post = document.getElementById("mainPost");
    if (post.style.display == "block") {
        post.style.display = "none";
    } else {
        post.style.display = "block";
        feed.style.display = "none";
    }
}

function feedSection() {
    var options = document.getElementById("options");
    var feed = document.getElementById("feed");
    if (feed.style.display == "block") {
        feed.style.display = "none";
    } else {
        feed.style.display = "block";
        options.style.display = "none";
    }
}





