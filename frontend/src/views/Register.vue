<template>
    <div>
        <h4>Register</h4>
        <form @submit.prevent="register">
            <label for="name">Name</label>
            <div>
                <input id="name" type="text" v-model="username" required autofocus>
            </div>
            <label for="password">Password</label>
            <div>
                <input id="password" type="password" v-model="password" required>
            </div>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
  name: 'register',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    register: function () {
      let data = {
        username: this.username,
        password: this.password
      }
      this.$store
        .dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>
