<template>
  <div id="big">
    <div id="bg">
      <div id="first">
        <h1>欢迎来到五子棋</h1>
      </div>
      <div id="second">
        <button id="which" class="button green large" @mousedown="Click1" >请选择</button>
        <div id="select">
          <div id="room" >
            <button id="room1" class="button green small" @mousedown="Click2">创建房间</button>
            <button id="room2" class="button green small" @mousedown="Click3">加入房间</button>
          </div>
          <div id="select1">
            <input type="text" class="enter1 text" placeholder="房间号" id="text1">
            <router-link :to="{ name : 'play' }"><button class="enter1 button green littlesmall" @mousedown="submit1">进入</button></router-link>
          </div>

          <div id="select2">
            <input type="text" class="enter2 text" placeholder="房间号" id="text2">
            <router-link :to="{ name : 'play' }"><button class="enter2 button green littlesmall" @mousedown="submit2">进入</button></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Start",
  mounted() {
    let element = document.getElementById('big')
    element.style.height = window.screen.height + 'px'
  },
  methods:{
    Click1(){
      let element=document.getElementById("room");
        element.style.display="block";
    },
    Click2() {
      let element = document.getElementById("select1");
      element.style.display = "block";
    },
    Click3() {
      let element = document.getElementById("select2");
      element.style.display = "block";
    },
    submit1(){
      let number=document.getElementById("text1").innerText;
      this.$global.roomID=number;
      this.$global.role='A';
    },
    submit2(){
      let number=document.getElementById("text2").innerText;
      this.$global.roomID=number;
      this.$global.role='B';

    }

  }
}

</script>

<style scoped>
#bg{
  text-align: center;
  margin: 0;
  background-image: url("../assets/img/pagebg.jpg");
  background-size: 1600px 800px;
  height: 100%;
}
#first,#second{
  position: absolute;
  left: 50%;
  margin: 0 auto;
  color: #765604;
  transform: translate(-50%,-50%);
}
#first{
  font-size: 30px;
  top: 20%;
  font-family: 仿宋;
}
#second{
  top: 50%;
  width: 500px;
  height: 300px;
}

#room,#select1,#select2{
  display: none;
}
/*-------------------------------------------------*/
.button::-moz-focus-inner{
  border: 0;
  padding: 0;
}

.button{
  zoom: 1;
  padding: 6px 20px;
  margin: 0;
  cursor: pointer;
  border: 1px solid #bbb;
  overflow: visible;
  font: bold 13px arial, helvetica, sans-serif;
  text-decoration: none;
  white-space: nowrap;
  color: #555;

  background-color: #ddd;
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,1)), to(rgba(255,255,255,0)));
  background-image: -webkit-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  background-image: -moz-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  background-image: -ms-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  background-image: -o-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  background-image: linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));

  -webkit-transition: background-color .2s ease-out;
  -moz-transition: background-color .2s ease-out;
  -ms-transition: background-color .2s ease-out;
  -o-transition: background-color .2s ease-out;
  transition: background-color .2s ease-out;
  background-clip: padding-box; /* Fix bleeding */
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
  -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
  box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
  text-shadow: 0 1px 0 rgba(255,255,255, .9);

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.button:hover{
  background-color: #eee;
  color: #555;
}

.button:active{
  background: #e9e9e9;
  position: relative;
  top: 1px;
  text-shadow: none;
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
}

.button[disabled], .button[disabled]:hover, .button[disabled]:active{
  border-color: #eaeaea;
  background: #fafafa;
  cursor: default;
  position: static;
  color: #999;
  /* Usually, !important should be avoided but here it's really needed :) */
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  text-shadow: none !important;
}
.button.small{
  padding: 4px 12px;
}

.button.large{
  padding: 30px 60px;
  font-size: 20px;
  text-transform: uppercase;
}

.button.large:active{
  top: 2px;
}
.button.green{
  background-color: #e8c513;
  border-color: #d2a022;
  color: #fff;
  text-shadow: 0 1px 0 rgba(0,0,0,.2);

  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,.3)), to(rgba(255,255,255,0)));
  background-image: -webkit-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: -moz-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: -ms-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: -o-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
  background-image: linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
}
/*-------------------------------------------------*/
#which{
  top: 20%;
  position: relative;
  display: block;
  left: 50%;
  transform: translate(-50%,-50%);

}
#room{
  top: 60%;
  border: none;
  height: 60px;
  position: absolute;
  left: 50%;
  margin: 0;
  transform: translate(-50%,-50%);
}
#room1,#room2{
  height: 45px;
}
#room1{
  position: relative;
  left: -20px;
}
#room2{
  position: relative;
  left: 20px;
}
#select1,#select2{
  top: 90%;
  border: none;
  height: 60px;
  position: absolute;
  left: 50%;
  margin: 0;
  transform: translate(-50%,-50%);
}

.text{
  height: 23px;
  outline-style: none ;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 18px;
  width: 170px;
}
</style>