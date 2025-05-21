<template>
    <div class="signup-page">
        <div class="signup-div p-4 shadow-sm rounded">
            <h2 class="text-center mb-4">Signup</h2>


            <div class="form-floating  mb-3">
                <input type="text" v-model="name" class="form-control" id="name" placeholder="Name" />
                <label for="name">Name</label>
            </div>

            <div class="form-floating  mb-3">
                <input v-model="email" type="email" class="form-control" id="email" placeholder="Email" />
                <label for="email">Email</label>
            </div>

            <div class="form-floating mb-3">
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="form-floating mb-3">
                <select v-model="gender" class="form-control" id="profileFor">
                    <option disabled value="">-- Select --</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="brother">Other</option>
                </select>
                <label for="profileFor">Gender</label>
            </div>

            <!-- <div class="form-floating mb-3">
                <input type="text" v-model="otp" class="form-control" id="name" placeholder="Name" />
                <label for="name">OTP</label>
            </div> -->
            <div
                class="col-12 col-md-6 col-lg-4 offset-md-3 offset-lg-4 py-2 d-flex align-items-center justify-content-evenly">
                <!-- <button id="otpbutton" type="button">OTP</button> &nbsp; &nbsp; &nbsp; -->
                <button @click="handleSignup" type="submit">signup</button>
                <p id="demo"></p>
            </div>
            <p class="quick-move text-center">if you already have account ? <a href="/login">Login</a></p>
            <p id="message" class=" text-center  mt-3">{{ message }}</p>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const gender = ref('')
// const otp = ref('')
const message = ref('')
const handleSignup = async () => {
    try {
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value,
                gender: gender.value,

            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Signup failed');
        }

        const data = await response.json();
        name.value = ''
        email.value = ''
        password.value = ''
        gender.value = ''


        message.value = data.message || 'Signup successful!';

        setTimeout(() => {
            router.push('/login')
        }, 1000)
    } catch (err) {
        message.value = err.message || 'An error occurred';
    }
};




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
