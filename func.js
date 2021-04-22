function Dark() {
    SetCookie("envir","dark");
    document.getElementById("body").setAttribute("class","mdui-loaded mdui-appbar-with-toolbar mdui-drawer-body-left mdui-theme-layout-dark");
    document.getElementById("envir-icon").innerHTML = "brightness_2";
    document.getElementById("envir-tit").innerHTML = "Dark";
    mdui.mutation();
}
function Light() {
    SetCookie("envir","light");
    document.getElementById("body").setAttribute("class","mdui-loaded mdui-appbar-with-toolbar mdui-drawer-body-left");
    document.getElementById("envir-icon").innerHTML = "brightness_high";
    document.getElementById("envir-tit").innerHTML = "Light";
    mdui.mutation();
}
function StartEnvir() {
    SetCookie("music-od", "false");
    var en = GetCookie("envir");
    if(en == "dark") {
        Dark();
    } else{
        Light();
    }
}
function ChangeV() {
    var v = document.getElementById("slider").value;
    document.getElementById("hidden").volume = v;
}
function InitM() {
    var muv = 0.15;
    document.getElementById("hidden").volume = muv;
    document.getElementById("slider").value = muv;
    mdui.updateSliders();
}
function Mstart() {
    SetCookie("music-od", "true");
    document.getElementById("hidden").play();
    document.getElementById("music-tit").innerHTML = "Stop";
    document.getElementById("music-icon").innerHTML = "pause";
}
function Mstop() {
    SetCookie("music-od", "false");
    document.getElementById("hidden").pause();
    document.getElementById("music-tit").innerHTML = "Play";
    document.getElementById("music-icon").innerHTML = "play_arrow";
}
function ChangeM() {
    var m = GetCookie("music-od");
    if(m != "true") {
        Mstart();
    } else {
        Mstop();
    }
}
function ChangeL() {
    var en = GetCookie("envir");
    var t = GetCookie();
    if(t == "light") {
        Light();
        return;
    } else if(t == "dark") {
        Dark();
        return;
    }
    if(en == "light") {
        Dark();
    } else{
        Light();
    }
}
function ChangeSong(url) {
    document.getElementById("hidden").setAttribute("src",url);
    if(GetCookie("hidden") == "true") {
        document.getElementById("hidden").play();
    }
}
var story = 0;
function Story(FN, id) {
    if(story == 0) {
        if(GetCookie("music-od") != "true") {
            mdui.snackbar({
                message: '打开背景音乐？',
                buttonText: 'OK',
                onButtonClick: function(){
                    Mstart();
                },
            });
        }
    }
    story += 1;
    Active(FN, id);
    Dark();
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
