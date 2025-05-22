<template>
  <div class="signup-page">
    <div class="p-4 shadow-sm rounded signup-div">
      <h2 class="text-center mb-4">Login</h2>

      <div class="form-floating  mb-3">
        <input v-model="email" type="email" class="form-control" id="email" placeholder="Email" />
        <label for="email">Email</label>
      </div>
      <div class="form-floating  mb-3">
        <input v-model="password" type="password" class="form-control" id="password" placeholder="Password" />
        <label for="password">Password</label>
      </div>
      <div
        class="col-12 col-md-6 col-lg-4 offset-md-3 offset-lg-4 py-2 d-flex align-items-center justify-content-evenly">
        <!-- <button id="otpbutton" type="button">OTP</button> &nbsp; &nbsp; &nbsp; -->
        <button @click="handleLogin" type="submit" >Login</button>

        <p id="demo"></p>
      </div>


      <p class="quick-move text-center">if you dont have a account ? <a href="/signup">signup</a></p>
      <p id="message" class="text-center  mt-3">{{ message }}</p>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const message = ref('')
const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });


    const data = await response.json();
    email.value = ''
    password.value = ''

    message.value = data.message || 'login successful!';

    if (response.ok && data.token) {
       localStorage.setItem('token', data.token);
       message.value = 'Login successful!';
       
       if (data.formsubmit) {
        router.push('/')
      } else {
        router.push('/personal')
      }
     }else {
      message.value = data.message || 'Login failed';
    }

  } catch (err) {
    message.value = err.message || 'An error occurred';
  }
}

</script>

<style scoped>
.signup-page {
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signup-div {
  width: 100%;
  max-width: 450px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

button {
  border: 1px solid green;
  background-color: white;
  color: green;
  font-weight: 700;
  padding: 8px;
  width: 80%;
}

button:hover {
  transition: .20s ease-in-out;
  background-color: green;
  color: white;
}
#message{
  color: red;
}

@media (max-width: 576px) {
  .signup-div {
    width: 90%;
    padding: 15px;
  }

  .quick-move {
    font-size: x-small;
  }
}
</style>