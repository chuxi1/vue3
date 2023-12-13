/*
 * @Author: zzs 2650317325@qq.com
 * @Date: 2023-12-01 10:43:26
 * @LastEditors: zzs 2650317325@qq.com
 * @LastEditTime: 2023-12-04 15:21:30
 * @FilePath: \vue3-project\src\views\tool\success.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ElMessage } from 'element-plus';

export const handleSuccess = (responseData: any, successCallback?: () => void) => {
  if (responseData && responseData.code === 200) {
    ElMessage({
      type: 'success',
      message: responseData.msg,
    });

    if (successCallback) {
      successCallback();
    }
  } else {
    ElMessage({
      type: 'error',
      message: 'Failed to process the request.',
    });
  }
};


export const selectApi = (responseData: any, successCallback?: () => void) => {
  if (responseData.code == 200) {
    if (successCallback) {
      successCallback();
    }
  } else {
    console.log(responseData)
}
}