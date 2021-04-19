function Dark() {
    SetCookie("envir","dark")
    document.getElementById("body").setAttribute("class","mdui-appbar-with-toolbar mdui-drawer-body-left mdui-theme-layout-dark")
}
function Light() {
    SetCookie("envir","light")
    document.getElementById("body").setAttribute("class","mdui-appbar-with-toolbar mdui-drawer-body-left")
}
function Auto() {
    SetCookie("envir","auto")
    document.getElementById("body").setAttribute("class","mdui-appbar-with-toolbar mdui-drawer-body-left mdui-theme-layout-auto")
}
function StartEnvir() {
    var en = GetCookie("envir");
    if(en == "light") {
        Light();
    } else if(en == "dark") {
        Dark();
    } else {
        Auto();
    }
}