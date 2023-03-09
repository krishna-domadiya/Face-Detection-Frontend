<template>
    <div class="card mx-auto" style="width: 18rem">
        <div class="card-body">
            <form @submit.prevent="login">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" v-model="username" id="username" class="form-control" placeholder="Enter your usename" required>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary mt-3">Login</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import api from '../api.js';

export default {
    name: 'LoginForm',
    data() {
        return {
            username: '',
        }
    },
    methods: {
        async login() {
            try {
                const response = await api.post('login', { username: this.username });
                const token = response.data.token;

                localStorage.setItem('token', token);
                this.$emit('login-success', this.username);
            } catch (error) {
                if (error.response.status == 409)
                    alert('Username already exists!')
            }
            
        }
    }
}
</script>