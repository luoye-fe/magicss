/* global Magicss */
var sourceText = `
* {
    -webkit-transition: all ease 1s;
}
html, body {
    background: #2d2d2d;
}
.Baymax {
    width: 300px;
    height: 600px;
    margin: 20px auto auto auto;
    position: relative;
}
.Baymax .head {
    left: 100px;
    width: 100px;
    height: 75px;
    position: absolute;
    background: #FFF;
    border-radius: 50%;
    box-shadow: 0px 6px 6px #888888, 6px 6px 6px #ccc inset;
    z-index: 100;
}
.Baymax .eyes-l {
    position: absolute;
    left: 20px;
    top: 35px;
    background: #000;
    width: 15px;
    height: 15px;
    border-radius: 50%;
}
.Baymax .eyes-r {
    position: absolute;
    right: 20px;
    top: 35px;
    background: #000;
    width: 15px;
    height: 15px;
    border-radius: 50%;
}
.Baymax .mourse {
    position: absolute;
    top: 42px;
    left: 35px;
    width: 30px;
    height: 3px;
    box-shadow: 0px 1px 0px #000;
    border-radius: 50%;
}
.Baymax .body {
    position: absolute;
    top: 55px;
    left: 50%;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    width: 214px;
    height: 320px;
    background: #FFF;
    border-radius: 45% 45% 50% 50%;
    z-index: 99;
    box-shadow: 6px 0px 6px #CCC inset, -6px 0px 6px #ccc inset;
}
.Baymax .belly {
    position: absolute;
    bottom: 0;
    left: 50%;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    width: 224px;
    height: 264px;
    background: #fff;
    border-radius: 42% 42% 50% 50%;
    box-shadow: 0px 3px 2px #888888, 0px -6px 6px #ccc inset;
}
.Baymax .belly:before {
    position: absolute;
    left: -2px;
    top: 50px;
    width: 20px;
    height: 120px;
    content: " ";
    border-radius: 50% 20% 20% 50%;
    box-shadow: 4px 0px 6px #ccc inset;
    -webkit-transform: rotate(3deg);
}
.Baymax .belly:after {
    position: absolute;
    right: -2px;
    content: " ";
    top: 50px;
    width: 20px;
    height: 120px;
    border-radius: 20% 50% 50% 20%;
    box-shadow: -4px 0px 6px #ccc inset;
    -webkit-transform: rotate(-3deg);
}
.Baymax .leg-l {
    position: absolute;
    left: 70px;
    top: 290px;
    width: 80px;
    height: 145px;
    background: #fff;
    border-radius: 40% 30% 10px 45%;
    box-shadow: -2px 0px 2px #999 inset, 4px 0px 4px #CCC inset, -4px 0px 4px #CCC inset;
}
.Baymax .leg-r {
    position: absolute;
    right: 70px;
    top: 290px;
    width: 80px;
    height: 145px;
    background: #fff;
    border-radius: 30% 40% 45% 10px;
    box-shadow: 2px 0px 2px #999 inset, 4px 0px 4px #CCC inset, -4px 0px 4px #CCC inset;
}
.Baymax .hand-l {
    position: absolute;
    left: 20px;
    top: 75px;
    width: 78px;
    height: 224px;
    background: #fff;
    border-radius: 50%;
    -webkit-transform: rotate(16deg);
    box-shadow: 6px 6px 6px #ccc inset;
    z-index: 91;
}
.Baymax .hl-l {
    position: absolute;
    left: 15px;
    top: 160px;
    width: 50px;
    height: 100px;
    background: #fff;
    border-radius: 50% 50% 40% 40%;
    -webkit-transform: rotate(-20deg);
}
.Baymax .hl-l:before {
    position: absolute;
    left: 0;
    top: 10px;
    content: "";
    width: 15px;
    height: 82px;
    box-shadow: 4px 0px 6px #ccc inset;
    -webkit-transform: rotate(-0deg);
    border-radius: 50% 20% 20% 50%;
}
.Baymax .f-1 {
    position: absolute;
    bottom: -40px;
    left: 65px;
    width: 14px;
    height: 30px;
    background: #fff;
    -webkit-transform: rotate(-35deg);
    border-radius: 50% 50% 40%;
    box-shadow: 0px -2px 2px #ccc inset;
    z-index: 90;
}
.Baymax .f-2 {
    position: absolute;
    bottom: -55px;
    left: 50px;
    width: 14px;
    height: 40px;
    background: #fff;
    -webkit-transform: rotate(-45deg);
    border-radius: 50% 50% 40%;
    box-shadow: 0px -2px 2px #ccc inset;
    z-index: 90;
}
.Baymax .f-3 {
    position: absolute;
    bottom: -62px;
    left: 49px;
    width: 14px;
    height: 40px;
    background: #fff;
    -webkit-transform: rotate(-45deg);
    border-radius: 50% 50% 40%;
    box-shadow: 0px -2px 2px #ccc inset;
    z-index: 89;
}
.Baymax .hand-r {
    position: absolute;
    right: 20px;
    top: 75px;
    width: 78px;
    height: 224px;
    background: #fff;
    border-radius: 50%;
    -webkit-transform: rotate(-16deg);
    box-shadow: -6px -6px 6px #ccc inset;
    z-index: 91;
}
.Baymax .hr-r {
    position: absolute;
    top: 160px;
    right: 15px;
    width: 50px;
    height: 100px;
    background: #fff;
    border-radius: 50% 50% 40% 40%;
    -webkit-transform: rotate(20deg);
}
.Baymax .hr-r:before {
    position: absolute;
    right: 0;
    top: 10px;
    content: "";
    width: 15px;
    height: 82px;
    box-shadow: -4px 0px 6px #ccc inset;
    -webkit-transform: rotate(-0deg);
    border-radius: 20% 50% 50% 20%;
}
.Baymax .fr-1 {
    position: absolute;
    bottom: -40px;
    right: 65px;
    width: 14px;
    height: 30px;
    background: #fff;
    -webkit-transform: rotate(35deg);
    border-radius: 50% 50% 40%;
    box-shadow: 0px -2px 2px #ccc inset;
    z-index: 90;
}
.Baymax .fr-2 {
    position: absolute;
    bottom: -55px;
    right: 50px;
    width: 14px;
    height: 40px;
    background: #fff;
    -webkit-transform: rotate(45deg);
    border-radius: 50% 50% 40%;
    box-shadow: 0px -2px 2px #ccc inset;
    z-index: 90;
}
.Baymax .fr-3 {
    position: absolute;
    bottom: -62px;
    right: 49px;
    width: 14px;
    height: 40px;
    background: #fff;
    -webkit-transform: rotate(45deg);
    border-radius: 50% 50% 40%;
    box-shadow: 0px -2px 2px #ccc inset;
    z-index: 89;
}
.Baymax .cover-s {
    position: absolute;
    left: 50%;
    top: 19px;
    width: 64px;
    height: 15px;
    -webkit-transform: translate(-50%, 0);
    z-index: 101;
}
.Baymax .cover-x {
    position: absolute;
    left: 50%;
    -webkit-transform: translate(-50%, 0);
    bottom: 12px;
    width: 64px;
    height: 12px;
    z-index: 101;
    overflow: hidden;
}
.Baymax .left {
    width: 17px;
    height: 15px;
    float: left;
    background: #fff;
}
.Baymax .right {
    width: 17px;
    height: 15px;
    float: right;
    background: #fff;
}
.Baymax .heart {
    position: absolute;
    right: 55px;
    top: 60px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 2px 2px 2px #ccc inset;
    z-index: 111;
    border: 1px solid #ccc;
}
.Baymax .head {
    -webkit-animation: myfirst 20s infinite;
}
.Baymax .cover-s {
    -webkit-animation: eyeclose1 2s infinite 0.1s;
}
.Baymax .cover-x {
    -webkit-animation: eyeclose2 2s infinite 0.8s;
}

`;

var Baymax = new Magicss();
// console.log(Baymax.format());
// Baymax.init();

// Baymax.print()