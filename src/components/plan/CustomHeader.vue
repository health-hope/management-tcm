<template>
<header>

    <label for="uploadInpt">
        <img  v-show="!source" :src="'bth_record_photo.png' | PUBLIC_PATH"  alt="" class="photo" />
        <img v-show="source" :src="source" alt="" srcset="" />
        <input name="uploadInpt" id="uploadInpt" ref="upload" accept="image/*"  @change="handleFileInputChange" type="file" v-show="false" />
    </label>

</header>
</template>

<script>
// import {upload} from "@/utils/upload"
//https://github.com/alextanhongpin/compress.js
import * as Compress  from "compress.js";
const compress = new Compress();
export default {
    props: {
        // 图片路径 已经双向绑定了
        source: {
            type: String,
            default: ""
        }
    },
    mounted() {

    },
    methods: {
        async handleFileInputChange(e) {
            const file = e.target.files[0];
           
            const files = [...e.target.files]
            const imageData = await compress.compress(files,{//压缩图片
                 quality: .7, 
            })
           
            this.$emit("update:source", `data:${file.type};base64,${imageData[0].data}`)
            // if(file.size>2*1000*1000){
            //     return this.$toast("文件过大")
            // }
            // const reader = new FileReader();
            // reader.readAsDataURL(file);
            // reader.onload = e => {
            //     console.log(e.target.result)
            //     this.$emit("update:source", e.target.result)
            // };

        }
    }
}
</script>

<style lang="scss" scoped>
header {
  height: 6.2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
}
</style>
