<!--
 * @Author: zzs 2650317325@qq.com
 * @Date: 2023-11-23 16:04:46
 * @LastEditors: zzs 2650317325@qq.com
 * @LastEditTime: 2023-12-05 09:28:58
 * @FilePath: \vue3-project\src\components\package\Form.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <el-form :label-width="labelWidth" :model="form" :inline="inline" :ref="formRef" style="border: 0px solid red;">
        <el-form-item v-for="(item, index) of formLabel" :key="index" :prop="item.model" :label="item.label"
            :rules="generateRules(item)">
            <template v-if="item.type === 'input'">
                <el-input v-model="form[item.model]" size="default" :placeholder="'请输入' + item.label" />
            </template>
            <template v-else-if="item.type === 'select'">
                <el-select v-model="form[item.model]" placeholder="请选择" @change="changeSelect" size="default">
                    <el-option v-for="(opt, index) of item.opts" :key="index" :label="opt.label"
                        :value="opt.value"></el-option>
                </el-select>
            </template>
        </el-form-item>
        <el-form-item style="text-align: center;">
            <el-button type="primary" @click="submitForm">Submit</el-button>
            <el-button @click="cancelForm">Cancel</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script>
import { ref } from 'vue';

export default {
    props: {
        formLabel: {
            type: Array,
            required: true,
        },
        form: {
            type: Object,
            default: () => ({}),
        },
        inline: Boolean,
        labelWidth: String,
    },
    emits: ['changeSelect'],
    setup(props, { emit }) {
        const formRef = ref()
        const generateRules = (item) => ({
            required: true, message: `请输入${item.label}`, trigger: 'blur'
        });
        const changeSelect = (selectedValue) => {
            emit('changeSelect', selectedValue);
        };
        const submitForm = () => {
            emit('submit', props.form);
        };

        const cancelForm = () => {
            emit('cancel');
        };
        return {
            formRef,
            generateRules,
            changeSelect,
            submitForm,
            cancelForm
        };
    },
};
</script>