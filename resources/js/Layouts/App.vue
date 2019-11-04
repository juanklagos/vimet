<template>
    <div>
        <div v-if="$auth.ready()">
            <NavBar></NavBar>
            <main class="py-4">
                <router-view></router-view>
            </main>
        </div>
        <div v-if="!$auth.ready()">
            Sitio Cargando...
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar";
    export default {
        name: "App",
        components: {NavBar}
    }
</script>

<style scoped>

</style>
