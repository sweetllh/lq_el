
const Contact = resolve => require(['@/views/account/Contact.vue'], resolve);
const MyTemplate = resolve => require(['@/views/account/MyTemplate.vue'], resolve);

const BasicInfo = resolve => require(['@/views/account/BasicInfo.vue'], resolve);
const MyWallet = resolve => require(['@/views/account/MyWallet.vue'], resolve);

const Package = resolve => require(['@/views/account/Package.vue'], resolve);
const PackageList = resolve => require(['@/views/account/package/PackageList.vue'], resolve);
const UpGradePackage = resolve => require(['@/views/account/package/UpGradePackage.vue'], resolve);

const SignatureMGT = resolve => require(['@/views/account/SignatureMGT.vue'], resolve);
const AddSignature = resolve => require(['@/views/account/signature/AddSignature.vue'], resolve);
const SignatureList = resolve => require(['@/views/account/signature/SignatureList.vue'], resolve);

export const accountPaths = [
    	{
    		path: 'basicInfo',
   			name: 'basicInfo',
   			component: BasicInfo
    	},
    	{
    		path: 'signatureMGT',
   			name: 'signatureMGT',
   			component: SignatureMGT,
   			redirect: '/accountParent/account/signatureMGT/signatureList',
   			children:[
   				{
   					path: 'signatureList',
   					name: 'signatureList',
   					component: SignatureList
   				},{
   					path: 'addSignature',
   					name: 'addSignature',
   					component: AddSignature 
   				}
   			]
    	},
    	{
    		path: 'package',
   			name: 'package',
   			component: Package,
   			redirect: '/accountParent/account/package/packageList',
   			children:[{
   					path: 'upGradePackage',
		   			name: 'upGradePackage',
		   			component: UpGradePackage,
   			},{
   					path: 'packageList',
		   			name: 'packageList',
		   			component: PackageList,
   			},
   					
   			]
    	},
    	{
    		path: 'contact',
   			name: 'contact',
   			component: Contact
    	},
    	{
    		path: 'myTemplate',
   			name: 'myTemplate',
   			component: MyTemplate 
    	},
    	{
    		path: 'myWallet',
   			name: 'myWallet',
   			component: MyWallet 
    	},
    	
    	
    ];