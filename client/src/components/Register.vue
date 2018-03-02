// eslint-disable-next-line 
<template>
  <div>
    <h1>Register</h1>   
    <input type="email" name="email" v-model="email" placeholder="email"/>
    <input type="password" name="password" v-model="password" placeholder="password"/>
    <button @click="register()" type="submit">Register</button>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods:{
      async register(){
          const response = await AuthenticationService.register({
              email: this.email,
              password: this.password
          })
          console.log(response.data);
      }
  }
//   mounted(){
//       setTimeout(()=>{
//           this.email = 'dummy'
//       }, 2000)
//   }
}
</script>
