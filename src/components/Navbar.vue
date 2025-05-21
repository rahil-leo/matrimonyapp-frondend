<template>
<nav class="navbar navbar-expand-lg navbar-light  fixed-top ">
  <div class="container">
    <div><a class="navbar-brand" href="#">logo</a></div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" 
  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="/"><i class="bi bi-house-door-fill icon"></i> Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/matches"><i class="bi bi-people-fill icon"></i> Matches</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><i class="bi bi-chat-right-text-fill icon"></i> Messages</a>
        </li>
        <li class="nav-item">
          <a class="nav-link"  @click="logout"><i class="bi bi-box-arrow-right icon"></i> Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const showMenu = ref(false)
const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

.navbar {
  background-color: white;
  box-shadow: 1px 1px 10px rgba(27, 26, 26, 0.388);
  padding: 30px;
}


a{
    color: black;
}
.icon{
    color: black;
}



</style>
