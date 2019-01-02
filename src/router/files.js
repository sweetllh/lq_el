const Files = resolve => require(['@/views/files/Files.vue'], resolve);
const Template = resolve => require(['@/views/files/Template.vue'], resolve);
const TemplateDetail = resolve => require(['@/views/files/TemplateDetail.vue'], resolve);
const AddFileOne = resolve => require(['@/views/files/AddFileOne.vue'], resolve);
const AddFileTwo = resolve => require(['@/views/files/AddFileTwo.vue'], resolve);
const SignedFile = resolve => require(['@/views/files/SignedFile.vue'], resolve);
const FileDetail = resolve => require(['@/views/files/FileDetail.vue'], resolve);


export const files = [
    		{
	    		path: 'files/:id',
	   			name: 'files',
	   			component: Files,
	   			meta: {keepAlive: true} // 这个是需要keepalive的
	    	},
	    	{
				path: 'addFileOne/:id',
				name: 'addFileOne',
				component: AddFileOne,
				meta: {keepAlive: false} // 这个是不需要keepalive的
			},
			{
				path: 'addFileTwo/:id',
				name: 'addFileTwo',
				component: AddFileTwo,
				meta: {keepAlive: false} // 这个是需要keepalive的
			},
			{
				path: 'signedFile/:id',
				name: 'signedFile',
				component: SignedFile,
				meta: {keepAlive: false} // 这个是需要keepalive的
			},
			{
				path: 'fileDetail/:id',
				name: 'fileDetail',
				component: FileDetail,
				meta: {keepAlive: false} // 这个是需要keepalive的
			},
    		{
				path: 'template/:id',
				name: 'template',
				component: Template,
				meta: {keepAlive: true} // 这个是需要keepalive的
			},{
				path: 'templateDetail/:id',
				name: 'templateDetail',
				component: TemplateDetail,
				meta: {keepAlive: false} // 这个是需要keepalive的
			}
    ]