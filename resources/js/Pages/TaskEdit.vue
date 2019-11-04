<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    Tasks {{ $route.params.id }}
                </div>
                <div class="card-body">
                    <div class="alert alert-success alert-dismissible fade show" v-if="success" role="alert">
                        task created correctly
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="alert alert-danger alert-dismissible fade show" v-if="errorNot" role="alert">
                        task not exist
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form autocomplete="off" @submit.prevent="updateTask">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" v-model="name" id="name" placeholder="Enter name">
                            <span class="invalid-feedback d-block" role="alert" v-if="error && 'name' in errors">
                                        <strong>{{errors.name[0]}}</strong>
                                    </span>
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" id="description" rows="3" v-model="description"></textarea>
                            <span class="invalid-feedback d-block" role="alert" v-if="error && 'description' in errors">
                                        <strong>{{errors.description[0]}}</strong>
                                    </span>
                        </div>
                        <div class="form-group">
                            <label for="description">Due date</label>
                            <date-picker v-model="due_date" valueType="format" lang="en"></date-picker>
                            <span class="invalid-feedback d-block" role="alert" v-if="error && 'due_date' in errors">
                                        <strong>{{errors.due_date[0]}}</strong>
                                    </span>
                        </div>    <div class="form-group">
                            <label for="description">Completed</label>
                            <date-picker v-model="completed" valueType="format" lang="en"></date-picker>
                            <span class="invalid-feedback d-block" role="alert" v-if="error && 'completed' in errors">
                                        <strong>{{errors.completed[0]}}</strong>
                                    </span>
                        </div>
                        <button type="submit" class="btn btn-success">Create task</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const moment = require('moment');
    import DatePicker from 'vue2-datepicker'

    export default {
        name: "TaskEdit",
        data() {
            return {
                name: null,
                description: null,
                due_date: null,
                completed:null,
                errors: {},
                error: false,
                success: false,
                errorNot:false

            }
        },
        mounted() {
            this.getTask();
        },
        components: {DatePicker},
        methods: {
            updateTask(){
                const _this = this;
                _this.axios.put('v1/tasks/' + _this.$route.params.id, {
                    'Authorization': _this.$auth.token(),
                    name: _this.name,
                    description: _this.description,
                    due_date: _this.due_date,
                    completed: _this.completed
                })
                    .then((response) => {
                        console.log(response);
                        _this.name = response.data.data.name;
                        _this.description = response.data.data.description;
                        _this.due_date = response.data.data.due_date;
                        _this.completed = response.data.data.completed;
                    })
                    .catch((e) => {
                        console.log(e);
                        _this.errorNot = true
                    });
            },
            getTask() {
                const _this = this;
                _this.axios.get('v1/tasks/' + _this.$route.params.id, {
                    'Authorization': _this.$auth.token(),
                })
                    .then((response) => {
                        console.log(response);
                        _this.name = response.data.data.name;
                        _this.description = response.data.data.description;
                        _this.due_date = response.data.data.due_date;
                        _this.completed = response.data.data.completed;
                    })
                    .catch((e) => {
                        console.log(e);
                        _this.errorNot = true
                    });
            }
        }
    }
</script>

<style scoped>

</style>
