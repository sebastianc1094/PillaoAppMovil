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

