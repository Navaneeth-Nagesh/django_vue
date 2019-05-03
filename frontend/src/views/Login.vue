<template>
    <div>
        <h4>Login</h4>
        <form @submit.prevent="login">
            <label for="name">Name</label>
            <div>
                <input id="name" type="text" v-model="username" required autofocus>
            </div>
            <label for="password">Password</label>
            <div>
                <input id="password" type="password" v-model="password" required>
            </div>
            <div>
                <button type="submit">login</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      let data = {
        username: this.username,
        password: this.password
      }
      this.$store
        .dispatch('login', data)
        .then(() => this.$router.push('/'))
        .catch(err => alert(err))
    }
  }
}
</script>
