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

