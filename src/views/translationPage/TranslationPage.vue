<template>
    <div class="translation-page">
        TranslationPage
    </div>
</template>

<script>

    import {checkSession} from "common/js/commonFun";

    export default {
        name: "TranslationPage",
        created() {
          checkSession('unameid')
          this.$store.commit("setShowTabBarTrue")
        },
    }
</script>

<style scoped>

</style>
