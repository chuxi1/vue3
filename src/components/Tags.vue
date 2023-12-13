<!--
 * @Author: zzs 2650317325@qq.com
 * @Date: 2023-11-15 14:48:30
 * @LastEditors: zzs 2650317325@qq.com
 * @LastEditTime: 2023-12-04 17:17:17
 * @FilePath: \vue3-project\src\components\Tags.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <div class="container">
        <div class="context" v-for="(tagList, index) in getTagList" :key="index">
            <el-tag :closable="index > 0" type="info" @click="handleTagOpen(tagList)" @close="handleTagClose(tagList)"
                :class="{ 'selected-tag': tagList.code == getTag.code }" style="cursor: pointer;">
                {{ tagList.className }}
            </el-tag>
        </div>
    </div>
</template>


<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';

export default {

    setup() {
        const router = useRouter();
        const { getters, commit } = useStore();
        const getTagList = computed(() => getters.getTagList);
        const getTag = computed(() => getters.getTag);

        const lastTagCode = computed(() => {
            const tags = getTagList.value;
            return tags.length ? tags[tags.length - 1] : 'index';
        });
        onMounted(() => {
            const firstTag = getTagList.value[0];
            if (firstTag) {
                commit('setTag', firstTag);
            }
        });
        const handleTagClose = (tagList) => {
            const isCurrentTag = tagList.code === getTag.value.code;
            commit('removeTag', tagList);
            if (isCurrentTag) {
                commit('setTag', lastTagCode.value);
                router.push(lastTagCode.value.code);
            }
        };

        const handleTagOpen = (tagList) => {
            commit('setTag', tagList);
            router.push(tagList.code);
        };

        return { getTagList, handleTagClose, handleTagOpen, getTag };
    },
};
</script>
<style lang="less" scoped>
.container {
    background: #d9ecff;
    display: flex;
    justify-content: flex-start;

    .context {
        margin-left: 10px;
    }
}

.selected-tag {
    background: rgba(15, 86, 218, 0.8);
    /* Change this to the desired background color for the selected tag */
    color: #fff;



    /* Change this to the desired text color for the selected tag */
}
</style>