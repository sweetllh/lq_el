import Vue from 'vue';
import Router from 'vue-router';

const Login = resolve => require(['@/views/user/Login.vue'], resolve);
const Regist = resolve => require(['@/views/user/Regist.vue'], resolve);
const Forget = resolve => require(['@/views/user/Forget.vue'], resolve);

const Home = resolve => require(['@/views/home/Home.vue'], resolve);
const MyTeam = resolve => require(['@/views/team/MyTeam.vue'], resolve);
const MyNews = resolve => require(['@/views/news/MyNews.vue'], resolve);

const AccountParent = resolve => require(['@/views/account/AccountParent.vue'], resolve);
const Account = resolve => require(['@/views/account/Account.vue'], resolve);

const Certificate = resolve => require(['@/views/account/Certificate.vue'], resolve);
const GetApp = resolve => require(['@/views/account/GetApp.vue'], resolve);
const MyCertificate = resolve => require(['@/views/account/MyCertificate.vue'], resolve);

const ShoppingList = resolve => require(['@/views/account/package/ShoppingList.vue'], resolve);
const FilesParent = resolve => require(['@/views/files/FilesParent.vue'], resolve);
const Privacy = resolve => require(['@/views/Privacy.vue'], resolve);
const CommonPrivacy = resolve => require(['@/views/CommonPrivacy.vue'], resolve);

const Layout = resolve => require(['@/views/layout/Layout.vue'], resolve);

Vue.use(Router)

import {files} from "./files"
import {accountPaths} from "./account"


export default new Router(
	
{
  routes: [
		  {
		    path: '*',
		    redirect: { name: 'home' }
		  },
		  {
		    path: '/forget',
		    name: 'forget',
		    component: Forget
		  }, {
		    path: '/regist',
		    name: 'regist',
		    component: Regist
		  },
		  {
		    path: '/login',
		    name: 'login',
		    component: Login
		  },
		  {
		    path: '/privacy',
		    name: 'privacy',
		    component: Privacy 
		  },
		  {
		    path: '/commonPrivacy',
		    name: 'commonPrivacy',
		    component: CommonPrivacy 
		  },
		  {
	        path: '/',
	        component: Layout,
	        redirect: '/filesParent/files/1',
	        name: '',
	        children: [
	            { 
	            	path: '/filesParent', 
	            	component: FilesParent, 
	            	name: 'filesParent' ,
	            	redirect: '/filesParent/files/1',
	            	children: files
	            },
	            
	        ]
	    },
	    {
	        path: '/',
	        component: Layout,
	        redirect: '/accountParent/account/basicInfo',
	        name: '',
	        children: [
	            { 
	            	path: '/accountParent', 
	            	component: AccountParent, 
	            	redirect: '/accountParent/account/basicInfo',
	            	name: 'accountParent' ,
	            	children:[
						    {
						    	path: 'account',
							    name: 'account',
							    component: Account,
							    children: accountPaths
						    },{
						    	path: 'certificate',
							    name: 'certificate',
							    component: Certificate,
						    },{
								path: 'getApp',
								name: 'getApp',
								component: GetApp
							},{
								path: "shoppingList/:id",
								name: 'shoppingList',
					   			component: ShoppingList,
							},{
								path: "myCertificate",
								name: 'myCertificate',
					   			component: MyCertificate,
							}
							
					    ]
	            },
	            
	        ]
	    },
	    {
	        path: '/',
	        component: Layout,
	        redirect: '/home',
	        name: '',
	        children: [
	            { 
	            	path: '/home', 
	            	component: Home, 
	            	name: 'home' ,
	            },
	            
	        ]
	    },
	    {
	        path: '/',
	        component: Layout,
	        name: '',
	        children: [
	            { 
	            	path: '/myTeam', 
	            	component: MyTeam, 
	            	name: 'myTeam' ,
	            },
	            
	        ]
	    },
	    {
	        path: '/',
	        component: Layout,
	        name: '',
	        children: [
	            { 
	            	path: '/myNews', 
	            	component: MyNews, 
	            	name: 'myNews' ,
	            },
	            
	        ]
	    },
		  
  ]
})
