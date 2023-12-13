<!--
 * @Author: zzs 2650317325@qq.com
 * @Date: 2023-11-23 16:04:46
 * @LastEditors: zzs 2650317325@qq.com
 * @LastEditTime: 2023-11-24 10:10:23
 * @FilePath: \vue3-project\src\components\package\Form.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-form ref="formRef" :label-width="labelWidth" :model="form" :inline="inline">
        <el-form-item v-for="(item, index) of formLabel" :key="index" :prop="item.model" :label="item.label"
            :rules="[{ required: true, message: '请输入' + item.label, trigger: 'blur' }]">
            <template v-if="item.type === 'input'">
                <el-input v-model="form[item.model]" size="mini" :placeholder="'请输入' + item.label"
                    style="max-width: 300px;" />
            </template>
            <template v-else-if="item.type === 'select'">
                <el-select v-model="form[item.model]" size="mini" placeholder="请选择" @change="changeSelect(item.model)">
                    <el-option v-for="(opt, index) of item.opts" :key="index" :label="opt.label"
                        :value="opt.value"></el-option>
                </el-select>
            </template>
            <template v-else-if="item.type === 'upload'">
                <el-upload size="mini" class="avatar-uploader" :action="url" :on-success="handSucc"
                    :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture-card"
                    accept="image/png, image/jpeg" :before-upload="beforeAvatarUpload" :show-file-list="false"
                    :headers="{ 'Token': token }">
                    <img v-if="form.picPath" :src="form.picPath" class="avatar" />
                    <el-button v-else size="small" type="primary">点击上传</el-button>
                </el-upload>
            </template>
        </el-form-item>
    </el-form>
</template>
  
<script setup lang="ts">
import { ref, defineProps, defineEmits, PropType } from 'vue';

const props = defineProps({
    formLabel: {
        type: Array as PropType<any[]>,
        required: true,
    },
    form: {
        type: Object as PropType<any>,
        required: true,
    },
    inline: Boolean,
    labelWidth: {
        type: String,
        default: '120px',
    },
});

const emit = defineEmits();
const url = ref('');
const token = ref('');

const changeSelect = (model: string) => {
    emit('changeSelects', model);
};

const handSucc = (res: any) => {
    emit('handSucc', res);
};

const handlePreview = (file: any) => {
    // handle preview logic
};

const handleRemove = (file: any, fileList: any[]) => {
    // handle remove logic
};

const beforeAvatarUpload = (file: any) => {
    // handle before upload logic
    return true; // Modify the logic as needed
};
</script>