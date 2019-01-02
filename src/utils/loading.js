import {Loading} from "element-ui"

export function startLoading(loading) {
        loading = Loading({
			  	lock: true,
		        text: 'Loading',
		        spinner: 'el-icon-loading',
		        background: 'rgba(0, 0, 0, 0.7)'
			})
  };
export function closeLoading(loading) {
        loading.close();
  };