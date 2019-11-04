<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Vimet</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link  v-if="$auth.check()" class="nav-link"
                                  to="/home">Tasks
                    </router-link>
                </li>
                <li class="nav-item dropdown" v-if="$auth.check()">
                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{$auth.user().name}} <span class="caret"></span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#" @click="logout">
                            Cerrar sesión
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "NavBar",
        methods: {
            logout() {
                this.$auth.logout({
                    makeRequest: true,
                    params: {},
                    success: function () {
                    },
                    error: function () {
                    },
                    redirect: '/',
                });
            }
        }
    }
</script>

<style scoped>

</style>
