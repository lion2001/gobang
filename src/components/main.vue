<template>
  <div id="big">
    <div id="gameInfo">
      <div class="infoLine">
        <div class="item">我：</div>
        <div class="item item_chess" id="mychess"></div>
      </div>
      <div class="infoLine">
        <div class="item">当前回合：</div>
        <div id="current" class="item item_chess"></div>
      </div>
    </div>
    <div id="bar" v-on:click="barClick()">
      <img :src=barpng>
    </div>
    <div id="leftBar" class="BarClose">
      <div class="start button"  v-on:click="dis&&start_first()">先手开始</div>
      <div class="start button" v-on:click="dis&&start_last()">
        <!--        <router-link class="router" :to="{ name : 'play' }">后手开始</router-link>-->
        后手开始
      </div>
      <div class="button" v-on:click="send_rollBack">悔棋</div>
      <div class="button" v-on:click="surrender">认输</div>
    </div>
    <div id="main">
      <div id="container">
        <div id="chessboard">
        </div>
        <div v-for="(item,index) in chesses" :key="index" class="chess_off chess" :id="index" v-on:click="setChess(index)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import blackchess from '../assets/img/black.png'
import whitechess from '../assets/img/white.png'
import barpng from '../assets/img/bar.png'
function Stack() {
  let items = []
  // 添加元素到栈顶，也就是栈的末尾
  this.push = function (element) {
    items.push(element)
  }
  // 栈的后进先出原则，从栈顶出栈
  this.pop = function () {
    return items.pop()
  }
  // 查看栈顶的元素，访问数组最后一个元素
  this.peek = function () {
    return items[items.length - 1]
  }
  // 检查栈是否为空
  this.isEmpty = function () {
    return items.length == 0
  }
  // 返回栈的长度，栈的长度就是数组的长度
  this.size = function () {
    return items.length
  }
  // 清空栈
  this.clear = function () {
    items = []
  }
  // 打印栈元素
  this.print = function () {
    console.log(items.toString())
  }
}
export default {
  name:'chess',
  data(){
    return{
      barpng : barpng,
      chesses : [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
      ],
      before:[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ],
      chessesdistribution:[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ],
      black: blackchess,
      white: whitechess,
      myturn: false,
      userTag: 'Me',
      roomID:0,
      role:'',
      chessTag_ME: 0,
      chessTag_Other:0,
      chessesColor_Me: null,
      chessesColor_Other: null,
      barOpen:false,
      log: new Stack(),
      socket: '',
      dis: true
    }
  },
  methods:{
    setChess(id){
      //检测是否已经开始游戏
      if (this.chessesColor_Me == null){
        window.alert("请先开始游戏")
      }else{
        let element = document.getElementById(id)
        let i = parseInt(id)
        let x = Math.floor(i/16)
        let y = i - 16*x
        let num = this.chessesdistribution[x][y]
        if (!this.myturn){
          window.alert("当前不是你的回合！")
        }else {
          if (num == 1 | num == -1){
            return
          }else {
            this.log.push(id),
                this.myturn = false
            element.style.cursor = 'unset'
            this.chessesdistribution[x][y] = this.chessTag_ME
            element.style.backgroundImage = 'url("'+this.chessesColor_Me+'")'
            let current = document.getElementById('current')
            if (this.chessTag_ME == 1){
              current.style.background = '#5C5851'
            }else {
              current.style.background = '#C7BEAE'
            }
            //向ws发送一个信息，chessID
            this.sendMessage(2,id)
            if (this.Verify(this.chessesdistribution,this.chessesdistribution[x][y],x,y)){
              window.alert("恭喜你，你胜利了!")
              this.clear()
            }
          }
        }
      }
    },
    setChessByRemo(id){
      let element = document.getElementById(id)
      let i = parseInt(id)
      let x = Math.floor(i/16)
      let y = i - 16*x
      element.style.cursor = 'unset'
      this.chessesdistribution[x][y] = this.chessTag_Other
      element.style.backgroundImage = 'url("'+this.chessesColor_Other+'")'
      this.myturn = true
      let current = document.getElementById('current')
      if (this.chessTag_ME == 1){
        current.style.background = '#C7BEAE'
      }else {
        current.style.background = '#5C5851'
      }
      if (this.Verify(this.chessesdistribution,this.chessesdistribution[x][y],x,y)){
        window.alert("再接再厉，本局游戏你失败了!")
        this.clear()
      }
    },
    Verify(arr,color,x,y){
      //计算左右最大长度
      let temp_length=0;
      for(let i=x;i<=15&&arr[i][y]==color;i++) temp_length++;
      for (let i=x-1;i>=0&&arr[i][y]==color;i--) temp_length++;
      if(temp_length==5)return color;

      //计算上下最大长度
      temp_length=0;
      for(let j=y;j<=15&&arr[x][j]==color;j++) temp_length++;
      for (let j=y-1;j>=0&&arr[x][j]==color;j--) temp_length++;
      if(temp_length==5)return color;

      //计算左上到右下最大长度
      temp_length=0;
      for(let i=x,j=y;i<=15&&j<=15&&arr[i][j]==color;i++,j++) temp_length++;
      for (let i=x-1,j=y-1;i>=0&&j>=0&&arr[i][j]==color;i--,j--) temp_length++;
      if(temp_length==5)return color;

      //计算右上到左下最大长度
      temp_length=0;
      for(let i=x,j=y;i>=0&&j<=15&&arr[i][j]==color;i--,j++) temp_length++;
      for (let i=x+1,j=y-1;i<=15&&j>=0&&arr[i][j]==color;i++,j--) temp_length++;
      if(temp_length==5)return color;

      return 0;

    },
    barClick(){
      let element = document.getElementById('leftBar')
      this.barOpen = !this.barOpen
      if (this.barOpen){
        element.classList.add("BarOpen")
      }else {
        element.classList.remove("BarOpen")
      }

    },
    start_first(){
      //向ws发送一个值
      //将我方设置为白方
      //将我的回合设置为true
      //取消开始的点击事件，更改开始的css
      //设置gamaInfo
      this.sendMessage(3)
      this.chessesColor_Me = this.white
      this.chessesColor_Other = this.black
      this.chessTag_ME = 1
      this.chessTag_Other = -1
      this.myturn = true
      this.dis = false
      let Elements = document.getElementsByClassName('start')
      for (let i=0;i<Elements.length;i++){
        Elements[i].classList.remove('button')
        Elements[i].classList.add('button_unuse')
      }
      let element = document.getElementById('mychess')
      element.style.background = '#C7BEAE'
      let current = document.getElementById('current')
      current.style.background = '#C7BEAE'
    },
    receive_stsrt_first(){
      //将我方设置为黑方
      //取消开始的点击事件，更改开始的css
      this.chessesColor_Me = this.black
      this.chessesColor_Other = this.white
      this.chessTag_ME = -1
      this.chessTag_Other = 1
      this.myturn = false
      this.dis = false
      let Elements = document.getElementsByClassName('start')
      for (let i=0;i<Elements.length;i++){
        Elements[i].classList.remove('button')
        Elements[i].classList.add('button_unuse')
      }
      let element = document.getElementById('mychess')
      element.style.background = '#5C5851'
      let current = document.getElementById('current')
      current.style.background = '#C7BEAE'
    },
    start_last(){
      //向ws发送一个值
      //将我方设置为黑方
      //将我的回合设置为false
      //取消开始的点击事件，更改开始的css
      //设置gamaInfo
      this.sendMessage(5)
      this.chessesColor_Me = this.black
      this.chessesColor_Other = this.white
      this.chessTag_ME = -1
      this.chessTag_Other = 1
      this.myturn = false
      this.dis = false
      let Elements = document.getElementsByClassName('start')
      for (let i=0;i<Elements.length;i++){
        Elements[i].classList.remove('button')
        Elements[i].classList.add('button_unuse')
      }
      let element = document.getElementById('mychess')
      element.style.background = '#5C5851'
      let current = document.getElementById('current')
      current.style.background = '#C7BEAE'
    },
    receive_stsrt_last(){
      //将我方设置为白方
      //取消开始的点击事件，更改开始的css
      this.chessesColor_Me = this.white
      this.chessesColor_Other = this.black
      this.chessTag_ME = 1
      this.chessTag_Other = -1
      this.myturn = true
      this.dis = false
      let Elements = document.getElementsByClassName('start')
      for (let i=0;i<Elements.length;i++){
        Elements[i].classList.remove('button')
        Elements[i].classList.add('button_unuse')
      }
      let element = document.getElementById('mychess')
      element.style.background = '#C7BEAE'
      let current = document.getElementById('current')
      current.style.background = '#C7BEAE'
    },
    getClientHeight() {
      //获取串口大小
      var clientHeight=0;
      if(document.body.clientHeight&&document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
      }
      else {
        clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
      }
      return clientHeight;
    },
    getClientWidth() {
      //获取串口大小
      var clientWidth=0;
      if(document.body.clientWidth&&document.documentElement.clientWidth) {
        clientWidth = (document.body.clientWidth<document.documentElement.clientWidth)?document.body.clientWidth:document.documentElement.clientWidth;
      }
      else {
        clientWidth = (document.body.clientWidth>document.documentElement.clientWidth)?document.body.clientWidth:document.documentElement.clientWidth;
      }
      return clientWidth;
    },
    send_rollBack(){
      if (this.log.isEmpty()){
        window.alert('已回到初始状态')
      }else {
        //向ws发送一个rb消息
        //改变最后一次落子，改变双方的turn状态
        this.sendMessage(4)
        this.rollBack()
      }
    },
    rollBack(){
      this.myturn = !this.myturn
      let last = this.log.pop()
      let element = document.getElementById(last)
      let i = parseInt(last)
      let x = Math.floor(i/16)
      let y = i - 16*x
      element.style.cursor = 'pointer'
      this.chessesdistribution[x][y] = 0
      element.style.backgroundImage = 'none'
      let current = document.getElementById('current')
      if (this.myturn){
        if (this.chessTag_ME == 1){
          current.style.background = '#C7BEAE'
        }else {
          current.style.background = '#5C5851'
        }
      }else{
        if (this.chessTag_ME == 1){
          current.style.background = '#5C5851'
        }else {
          current.style.background = '#C7BEAE'
        }
      }
    },
    receiver_rollBack(){
      this.rollBack()
      window.alert("对方发起悔棋操作")
    },
    sendMessage(type, id){
      let socket = this.socket
      let to = ''
      if (this.role=='A'){
        to = 'B'
      }else to = 'A'
      socket.send(JSON.stringify({
        uid:this.roomID+this.role,
        to:this.roomID+to,
        type: type,
        id: id
      }));
    },
    surrender(){
      //将本地的数据恢复到初始状态
      this.clear()
      //发送ws信息
      this.sendMessage(6)
    },
    clear(){
      this.chessesdistribution = this.before
      let elements = document.getElementsByClassName("chess")
      for(var i=0;i<elements.length;i++){
        elements[i].style.cursor = 'pointer'
        elements[i].style.backgroundImage = 'none'
      }
      this.log.clear()
      this.myturn = false
      this.dis = true
      let current = document.getElementById('current')
      current.style.background = 'rgba(255,255,255,0)'
      let element = document.getElementById('mychess')
      element.style.background = 'rgba(255,255,255,0)'
      let Elements = document.getElementsByClassName('start')
      for (let i=0;i<Elements.length;i++){
        Elements[i].classList.remove('button_unuse')
        Elements[i].classList.add('button')
      }
      this.chessTag_ME = 0
      this.chessTag_Other = 0
      this.chessesColor_Me =  null
      this.chessesColor_Other = null
    },
    receive_surrender(){
      this.clear()
    },
    //连接服务器
    conWebSocket(){
      let vm = this;
      if(window.WebSocket){
        vm.socket = new WebSocket('ws://localhost:8101');
        let socket = vm.socket;

        socket.onopen = function(){
          console.log("连接服务器成功");
          vm.sendMessage(1)
        }
        socket.onclose = function(){
          console.log("服务器关闭");
        }
        socket.onerror = function(){
          console.log("连接出错");
        }
        // 接收服务器的消息
        socket.onmessage = function(e){
          let message = JSON.parse(e.data);
          console.log(message)
          switch (message.type) {
            case 2:
              vm.setChessByRemo(message.chessID)
              break
            case 3:
              vm.receive_stsrt_first()
              break
            case 4:
              vm.receiver_rollBack()
              break
            case 5:
              vm.receive_stsrt_last()
              break
            case 6:
              console.log("=======6====")
              vm.receive_surrender()
              break

          }
          this.setChessByRemo(message.id)
        }
      }
    }
  },
  mounted() {
    window.vue = this
    this.role = this.$global.role
    this.roomID = this.$global.roomID
    this.conWebSocket()
    let element = document.getElementById('big')
    element.style.height = this.getClientHeight() + 'px'
    element.style.width = this.getClientWidth() + 'px'
    let elements = document.getElementsByClassName('chess')
    for (let i=0;i<elements.length;i++){
      let x = Math.floor(i/16)
      let y = (i - 16*x)*40
      let x_ = x*40
      elements[i].style.position = 'absolute'
      elements[i].style.top = x_+'px'
      elements[i].style.left = y+'px'
      // let random = Math.random()
      // if (random<0.1){
      //     elements[i].style.cursor = 'unset'
      //     this.chessesdistribution[x][y] = -1
      //     elements[i].style.backgroundImage = 'url("'+this.black+'")'
      // }else if (random>0.9){
      //     this.chessesdistribution[x][y] = 1
      //     elements[i].style.cursor = 'unset'
      //     elements[i].style.backgroundImage = 'url("'+this.white+'")'
      // }
    }
  }
}
</script>

<style scoped>
.router{
  text-decoration: none;
  color: black;
}

#big{
  margin: 0;
  background-image: url("../assets/img/pagebg.jpg");
  background-size: 1600px 800px;
}

#gameInfo{
  user-select: none;
  position: absolute;
  top: 25px;
  left: 300px;
  width: 125px;
  height: 80px;
  padding: 10px;
  background-image: url("../assets/img/bg.jpg");
  border-radius: 10px;
  cursor: default;
}

.infoLine{
  height: 36px;
  line-height: 36px;
  margin-bottom: 5px;
  padding-left: 10px;
  background:rgba(230,120,125,0.4);
  border-radius: 10px;
}

.item{
  float: left;
  height: 36px;
}

.item_chess{
  width: 35px;
  height: 35px;
  border-radius: 25px;
  transition: background-color 2s;
}

#mychess{

}

#current{

}

#bar{
  user-select: none;
  position: absolute;
  top: 165px;
  left: 300px;
  width: 25px;
  height: 25px;
  padding: 3px;
  background: #CAC68B;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 1s;
}

#bar:hover{
  background:#D7A451;
}

#bar img{
  user-select: none;
  width: 25px;
  height: 25px;
}

#leftBar{
  position: absolute;
  top: 200px;
  left: 300px;
  width: 80px;
  border-radius: 10px;
  background-image: url("../assets/img/bg.jpg");
  overflow: hidden;
  transition: all 1s;
}

.BarClose{
  height: 0px;
  padding: 0;
  color: black;
}

.BarOpen{
  padding: 20px 20px 10px 20px;
  height: 230px;
}

.button{
  width: 80px;
  margin-bottom: 20px;
  height: 40px;
  border-radius: 10px;
  background: rgba(230,120,125,0.4);
  line-height: 40px;
  text-align: center;
  font-family: 微软雅黑;
  cursor: pointer;
  font-weight: bold;
  transition: all 1s;
  user-select: none;
}

.button:hover{
  background: #C9B192;
}

.button_unuse{
  user-select: none;
  width: 80px;
  margin-bottom: 20px;
  height: 40px;
  border-radius: 10px;
  background: rgba(113,100,78,0.4);
  line-height: 40px;
  text-align: center;
  color: #cccccc;
  font-family: 微软雅黑;
  cursor: default;
  font-weight: bold;
  transition: all 1s;
}

#main{
  position: absolute;
  top: 20px;
  left: 500px;
  width:680px;
  height: 680px;
  background-image: url("../assets/img/bg.jpg");
  background-size: 680px;
  border: 1px black solid;
  border-radius: 8px;
}

#chessboard{
  position: absolute;
  top: 20px;
  left: 20px;
  height: 600px;
  width: 600px;
  background-image: url("../assets/img/qipan.jpg");
  background-size: 600px;
  border: 1px black solid;
}

#container{
  position: absolute;
  top: 20px;
  left: 20px;
  height: 640px;
  width: 642px;
  background: rgba(230,120,125,0.4);
}

.chess_off{
  margin: 2px;
  width: 38px;
  height: 38px;
  border-radius: 20px;
  background-size: 38px;
  cursor: pointer;
}
</style>