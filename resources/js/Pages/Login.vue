<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Iniciar sesión</div>
                <div class="card-body">
                    <div class="alert alert-danger" role="alert" v-if="error">
                        Error en las credenciales
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form autocomplete="off" @submit.prevent="login">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Correo electrónico</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" v-model="email"
                                   aria-describedby="emailHelp" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Contraseña</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password"
                                   placeholder="Password">
                        </div>
                        <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="remember_me">
                            <label class="form-check-label" for="exampleCheck1">Recordar</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                email: null,
                password: null,
                remember_me: false,
                error: false,
                errors: {}
            }
        },
        methods: {
            login() {
                const _this = this;
                _this.$auth.login({
                    params: {
                        email: _this.email,
                        password: _this.password,
                        remember_me: _this.remember_me
                    },
                    success: function () {

                    },
                    error: function (error) {
                        _this.error = true;
                        _this.errors = error.response.data.errors;
                    },
                    rememberMe: true,
                    redirect: '/home',
                    fetchUser: true,
                });
            }
        }
    }
</script>

<style scoped>

</style>
