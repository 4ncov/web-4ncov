<template>
    <div class="box">
        <div class="line" :style="res"></div>
    </div>
</template>

<script>
export default {
    props: ['w'],
    computed: {
        res() {
            if (!this.w) return {};
            return {
                width: this.w + '%'
            };
        }
    }
};
</script>

<style scoped>
.box {
    height: 0.5rem;
}
.line {
    width: 0;
    height: 0.5rem;
    background: #ccc;
}
</style>
