<template>
    <div class="tip" :style="style" v-show="show">
        <slot name="content"></slot>
    </div>
</template>

<script>
export default {
    name: 'tip',
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: '200px',
        },
        height: {
            type: String,
            default: '120px',
        },
    },
    computed: {
        style () {
            return { width: this.width, height: this.height };
        },
    },
    data () {
        return {
        };
    }
};
</script>

<style language="less" scoped>
.tip {
    width: 200px;
    height: 120px;
    position: relative;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 20px -2px rgba(0, 0, 0, 0.5);
    padding: 10px;
}
.tip::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-top: none;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
}
</style>


