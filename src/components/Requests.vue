<template>
    <Navbar />
    <div style="width: 100%; height: 110px; background-color: aliceblue;"></div>

    <div v-if="receivedRequests" class="match-page-div">
        <div class="container">
            <h2 class="text-center mb-4">Requests</h2>
            <div class="row d-flex justify-content-center gap-3">
                <div class="col-12 col-md-7 col-lg-8 mb-3" v-for="request in receivedRequests" :key="request.id">
                    <div class="match-div gap-3 rounded p-3" style="background-color: #f5f5f5;">
                        <div class="photo-div">
                            <img :src="request.photo" alt="photo" width="100" class="rounded" />
                        </div>
                        <div class="text-div">
                            <p class="match-name"><strong>{{ request.name }}</strong> ({{ request.age }} yrs)</p>
                            <p class="match-name">{{ request.education }} | {{ request.occupation }} | {{
                                request.address }}</p>
                            <!-- You can add buttons or actions here -->
                            <div style="height: 100px;"></div>
                            <button>decline</button>
                            <button>accept</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import { ref, onMounted } from 'vue'

const receivedRequests = ref([])

onMounted(async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
        const req = await fetch('http://localhost:3000/receivedrequests', {
            headers: {
                Authorization: token
            }
        })
        const res = await req.json()
        if (req.ok) {
            receivedRequests.value = res.requests
        } else {
            console.error('Failed to fetch requests', res.message)
        }
    } catch (err) {
        console.error('Error fetching requests:', err)
    }
})
</script>


<style>

*{
    text-transform: capitalize;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.match-page-div {
    background-color: aliceblue;
    height: 100vh;
}

.match-div {
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.181);
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 15px;
    overflow-y: scroll;
    scrollbar-width: none;
}


.photo-div {
    height: 200px;
    width: 150px;
}

.photo-div img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
}

.match-name {
    margin: 0;
}

</style>