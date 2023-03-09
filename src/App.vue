<template>
  <HeaderView :username="username" @log-out="logout"/>
  <br>
  <div>
    <div v-if="isLoggedIn">
      <DashboardView/>
    </div>
    <div v-else>
      <LoginForm @login-success="userLogin"/>
    </div>
  </div>
  <br>
  <FooterView/>
</template>

<script>
import jwt_decode from 'jwt-decode';
import HeaderView from './components/HeaderView.vue';
import FooterView from './components/FooterView.vue';
import LoginForm from './components/LoginForm.vue';
import DashboardView from './components/DashboardView.vue';

export default {
  name: 'App',
  components: {
    LoginForm,
    DashboardView,
    HeaderView,
    FooterView
  },
  data() {
    return {
      isLoggedIn: false,
      username: ''
    }
  },
  methods: {
    checkAuthentication() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwt_decode(token);
          if (decodedToken.exp > Date.now() / 1000) {
            this.isLoggedIn = true;
            this.username = decodedToken.username;
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error(error);
          // localStorage.removeItem("token");
        }
      }
    },
    userLogin(uname) {
      this.username = uname;
      this.isLoggedIn = true;
    },
    logout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.username = '';
    }
  },  
  mounted() {
    this.checkAuthentication();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
