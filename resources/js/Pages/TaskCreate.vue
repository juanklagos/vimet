<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    Tasks
                </div>
                <div class="card-body">
                    <div class="alert alert-success alert-dismissible fade show" v-if="success" role="alert">
                        task created correctly
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form autocomplete="off" @submit.prevent="createTask">
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
                            <!--<input class="form-control" type="date" v-model="due_date">-->
                            <date-picker v-model="due_date" valueType="format" lang="en" ></date-picker>
                            <span class="invalid-feedback d-block" role="alert" v-if="error && 'due_date' in errors">
                                        <strong>{{errors.due_date[0]}}</strong>
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
        name: "TaskCreate",
        data() {
            return {
                name: null,
                description: null,
                due_date: null,
                errors: {},
                error: false,
                success: false,

            }
        },
        components: { DatePicker },
        created() {

        },
        methods: {
            createTask() {
                const _this = this;
                _this.axios.post('v1/tasks', {
                    'Authorization': _this.$auth.token(),
                    name: _this.name,
                    description: _this.description,
                    due_date: _this.due_date,
                })
                    .then((response) => {
                        console.log(response);
                        _this.resetForm();
                        _this.success = true;
                    })
                    .catch((e) => {
                        console.log(e);
                        _this.error = true;
                        _this.errors = e.response.data.errors;
                        console.log(e.response.data.errors);
                        console.log(_this.error);
                    });
            },
            resetForm() {
                this.name = null
                this.description = null
                this.due_date = null
            }
        }
    }
</script>

<style scoped>

</style>
