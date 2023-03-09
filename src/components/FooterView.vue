<template>
    <div class="fluid-container bg-light text-center footer-div">
        <span class="text-center">Copyright &copy; {{ year }}, Face Detection App. All Rights Reserved.</span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            year: new Date().getFullYear()
        }
    }
}
</script>
<style scoped>
.footer-div {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px;
}
</style>