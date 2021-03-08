<template>
<!-- <details open> -->
    <!-- <summary>Code </summary> -->
    <div>
    <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    Link with href
    </a>
    <div class="container collapse" id="collapseExample">
        <slot></slot>
        <!-- <iframe src="https://wallhere.com/es/wallpaper/1560361?__cf_chl_jschl_tk__=4b922a6793cc3bd61d334e6f47fe96d51883636d-1596972645-0-AeJRwMsEIOixPXLeaaoSjKy1N0IDsELBn3pjlUhVFxIn3jkH9tXjXGrT6eE8SjbqSz5jlG16Ry286FQYmxw-b9EjBUY4vmSUBCdZP_9fh0KNkenTL2UPe3aX9M6ScABEz6jlRkq6IpJJLMz9N6Y8-A4cITfDEnAn_HK7GM7fKy84GvNFcKHnrQBeCMPiHlWJw-68YQupVe2WtEwpWJvlwG7so18_-9VNsB8aV85PGjT1O3DHt8RL3c09VozRdvN9_JOphKlmcOE8upP4NmlMKN9tS4W63jvOOLx-kOqspLHy" frameborder="0"></iframe> -->
    </div>
    </div>
<!-- </details> -->
</template>

<script>
import {defineComponent } from 'vue'
export default defineComponent({
    setup(){
    }

})
</script>

<style lang="scss" scoped>
summary{
    outline: 0;
    transition: 0.4s;
    ~ * {
        animation: fadein .5s ease-in-out;
    }
}
.container{
    opacity: 0;
    animation-name: showContent;
    animation-duration: 0.6s;
    animation-delay: 0.3s;
    animation-fill-mode: forwards;
}
@keyframes showContent {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

</style>