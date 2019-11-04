<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    Tasks
                </div>
                <div class="card-body">
                    <a class="btn btn-info" @click="$goTo('task/create')">Create task</a>
                    <br>
                    <table id="example" class="display table" style="width:100%">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>due date</th>
                            <th>Completed</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in listTasks">
                            <td>{{item.name}}</td>
                            <td>{{item.description}}</td>
                            <td>{{item.due_date}}</td>
                            <td>{{item.completed}}</td>
                            <td>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                        Action
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="#" @click="$goTo('/task/edit/'+item.id)">Edit</a>
                                        <a class="dropdown-item" href="#" @click="completedTask(item.id)">Completed</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#" @click="deleteTask(item.id)">Delete</a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                listTasks: []
            }
        },
        mounted() {
            this.getTasks();
        },
        methods: {
            getTasks() {
                const _this = this;
                _this.axios.get('v1/tasks', {
                    'Authorization': _this.$auth.token(),
                })
                    .then((response) => {
                        console.log(response);
                        _this.listTasks = response.data.data;
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            },
            completedTask(id) {
                swal.fire({
                    title: 'Are you sure?',
                    text: "",
                    type: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, completed'
                }).then((result) => {
                    const _this = this;
                    _this.axios.post('v1/task/completed/' + id, {
                        'Authorization': _this.$auth.token(),
                    })
                        .then((response) => {
                            console.log(response);
                            if (result.value) {
                                swal.fire(
                                    'Completed!',
                                    'Task completed.',
                                    'success'
                                )
                            }
                            _this.getTasks()
                        })
                        .catch((e) => {
                            console.log(e);
                        });


                });
            }
            ,
            deleteTask(id) {
                swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    const _this = this;
                    _this.axios.delete('v1/tasks/' + id, {
                        'Authorization': _this.$auth.token(),
                    })
                        .then((response) => {
                            console.log(response);
                            if (result.value) {
                                swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                            }
                            _this.getTasks()
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                })
            }
        }
    }
</script>

<style scoped>

</style>
