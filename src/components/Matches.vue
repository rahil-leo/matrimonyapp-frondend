<template>
    <Navbar />
    <div style="width: 100%; height: 110px; background-color: aliceblue ;"></div>

    <div class="match-page-div">
        <div class="container" v-for="match in matchprofile" :key="match">
            <div class="row w-100 d-flex justify-content-center gap-3">
                <div class="col-12 col-md-7 col-lg-8 mb-3">
                    <div class="match-div gap-3 rounded" id="a">
                        <div class="photo-div">
                            <img :src="match.photo" alt="match photo" />
                        </div>
                        <div class="text-div">
                            <p class="match-name">{{ match.name }}</p>
                            <p class="match-name">{{ match.age }} yrs &nbsp; | <span>{{ match.education }}</span> &nbsp;
                                | <span>{{ match.address }}</span> &nbsp; | <span>{{ match.occupation }}</span> </p>
                            <div style="height: 80px;width: 100%;"></div>
                            <button id="b" class="rounded btn-bg-light">x dont show</button> &nbsp;
                            <button id="btnCheck" class="rounded btn-warning" @click="sendRequest(match.userid)">send request</button><br>
                            <a class="message" href="">message</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import Navbar from '../components/Navbar.vue';

import { ref, onMounted } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const matchprofile = ref([])

// function btnRequestedCheck(userid) {
//     const token = localStorage.getItem('token')
//     if (!token) {
//         router.replace('/login')
//     }
//     try {
//         const req = await fetch('http://localhost:3000/btnRequestedCheck', {
//             method: 'post',
//             headers: {
//                 Authorization: `${token}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 id: userid
//             }),
//         })
//         const res = await req.json()
//         console.log(res)
//         // if (req.ok) {
//         //     // request.value = 
//         // }
//     } catch (err) {
//         console.log(err)
//     }
// }

async function sendRequest(userid) {
    const token = localStorage.getItem('token')
    if (!token) {
        router.replace('/login')
    }
    try {
        const req = await fetch('http://localhost:3000/requestsmatches', {
            method: 'post',
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id:userid
            }),
        })
        const res = await req.json()
        console.log(res)
        if (req.ok) {
            // if (userid) {
            //     console.log(userid)
            //     let btnCheck = document.getElementById('btnCheck')
            //     btnCheck.style.display ='none'
            // }
            
            
        }
    } catch (err) {
        console.log(err)
    }
}



onMounted(async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        router.replace('/login')
    }
    try {
        const req = await fetch('http://localhost:3000/matches', {
            method: 'get',
            headers: {
                Authorization: `${token}`,
            },
        })
        const res = await req.json()
        console.log(res)
        if (req.ok) {
            matchprofile.value = res.matches
        }
    } catch (err) {
        console.log(err)
    }
})


</script>

<style scoped>
* {
    text-transform: capitalize;
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
    /* flex-shrink: 0; */
}

.photo-div img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.match-name {
    /* display: inline-block; */
    font-size: 1.2rem;
    margin: 0;
    word-break: break-word;
}
.message{
    display: none;
}
</style>