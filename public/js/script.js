window.onscroll = function() {
    myfunction();
}

var nav = document.querySelector("nav");
var feature = document.querySelector(".feature");

var icon = document.querySelector(".mobile-icon");
var ul = document.querySelector(".navigation");

icon.addEventListener("click", function(){
    ul.classList.toggle("active");
})

function myfunction() {
    var dftop = window.pageYOffset;
    if(dftop > feature.offsetTop){
        nav.classList.add("sticky");
    }else if(dftop < feature.offsetTop){
        nav.classList.remove("sticky");
        
    }
}