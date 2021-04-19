function Dark() {
    SetCookie("envir","dark")
    document.getElementById("sn-t").innerHTML = "Dark";
    document.getElementById("sn").innerHTML = 'brightness_2';
    document.getElementById("body").setAttribute("class","mdui-appbar-with-toolbar mdui-drawer-body-left mdui-theme-layout-dark")
}
function Light() {
    SetCookie("envir","light")
    document.getElementById("sn-t").innerHTML = "Light";
    document.getElementById("sn").innerHTML = 'brightness_high';
    document.getElementById("body").setAttribute("class","mdui-appbar-with-toolbar mdui-drawer-body-left")
}
function StartEnvir() {
    var en = GetCookie("envir");
    if(en == "light") {
        Light();
    } else{
        Dark();
    }
}
function ChangeL() {
    var en = GetCookie("envir");
    if(en == "light") {
        Dark();
    } else{
        Light();
    }
}

function MyBirth(){
    var birth='2006-11-30';
    birth = Date.parse(birth.replace('/-/g', "/"));
    if (birth) {
        var year = 1000 * 60 * 60 * 24 * 365;
        var now = new Date();
        var birthday = new Date(birth);
        var age = parseInt((now - birthday) / year);
        return age
    }
}

function HT(FN, tit) {
    var oli = document.getElementsByTagName("li");
    for(var i=0; i<oli.length; i++){
        if (oli[i].id == "d-bran"){
            continue;
        }
        oli[i].setAttribute("class","mdui-list-item mdui-ripple");
    };
    document.getElementById("f-title").innerHTML=tit
    document.getElementById("title").innerHTML="Acdp | "+tit
    mdui.$('article').html(
        '<div class="mdui-text-center"><div class="mdui-spinner mdui-spinner-colorful"></div></div>'
    );
    mdui.mutation();
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject('Microsoft.XMLHttp');
    }
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            mdui.$('article').html('');
            document.getElementById("art").setAttribute("class","mdui-container mdui-m-t-3 doc-container")
            mdui.$('article').html(
                marked(xmlhttp.responseText)
            );
        }
    }
    xmlhttp.open('GET', FN+"?timestamp="+new Date().getTime(), true);
    xmlhttp.send();
}