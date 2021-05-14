import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router)

import main from "@/components/main";
import Start from "@/components/Start";
var router = new Router({
        routes: [
            {
                path:'/',
                component:Start,
                name: 'log',
                meta:{
                    title:"在线五子棋——进入房间"
                }
            },{
                path:'/play',
                component:main,
                name: 'play',
                meta:{
                    title: "在线五子棋"
                }
            }
        ]
    }
)

export default router