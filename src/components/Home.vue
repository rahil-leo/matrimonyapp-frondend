<template>
    <Navbar />
    <div class="container">
        <div class="userprofile-div">
            <div class="row w-100">
                <div class="col-3">
                    <div class="side-bar">
                        <img class="profile-photo" v-if="photo" :src="photo" alt="user image" />
                        <h5 v-if="userName">Welcome,{{ userName }}</h5>
                        <div class="space"></div>
                        <a class="  profile-btn" href="/editprofile">Edit profile</a>
                        <a class="  preference-btn" href="#">Edit preferences</a>
                    </div>
                </div>
                <div class="col-9">
                    <div class="content-page">
                        <div class="profile-complete">
                            <h5>Complete Your Profile</h5><br> <br>
                            <div id="photo-add" @click="popup" class="photoadd-div"><i
                                    class="bi bi-plus-square-fill add-btn"></i> Edit Profile photo</div>
                            <div id="family-details" @click="popup1" class="photoadd-div"><i
                                    class="bi bi-plus-square-fill add-btn"></i> Add family Details</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="popup" id="popup">
            <div class="set-photo">
                <div>
                    <h5 class="text-center" style="color:green ;">Add Your Photo Get Good Responses</h5>
                 <form @submit.prevent="editProfilePicture" enctype="multipart/form-data" class="form-wrapper">
          <label for="file" class="file-label">
            <i class="bi bi-upload"></i> Choose a Photo
          </label>
          <input type="file" id="file" accept="image/*" required class="hidden-input" />
          <button class="image-add-btn" type="submit">Add Image</button>
        </form>
                </div>
            </div>
            <span @click="Back" class="back">x</span>
        </div>
        <div class="popup2" id="popup2">
            <div class="set-details">

            </div>
            <span @click="Back" class="back">x</span>
        </div>
    </div>
</template>

<script setup>

import Navbar from "../components/Navbar.vue"


import { ref, onMounted } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

const userName = ref(null)
const message = ref('')
const photo = ref('')
// const image = ref('')


async function editProfilePicture() {
    const formData = new FormData();
    formData.append('image', document.getElementById('file').files[0]);
    const req = await fetch('http://localhost:3000/editprofilepicture', {
        method: 'POST',
        headers: {
            Authorization: `${localStorage.getItem('token')}`,
        },
        body: formData,
    });
    const res = await req.json()
    const popup = document.getElementById('popup')
    popup.style.display = 'none'
    photo.value = res.data.photo    
}

function Back() {
    const popup = document.getElementById('popup')
    const popup2 = document.getElementById('popup2')
    popup.style.display = 'none'
    popup2.style.display = 'none'

}

function popup() {
    const setphotobtn = document.getElementById('family-details')
    const popup = document.getElementById('popup')
    popup.style.display = 'flex'
}
function popup1() {
    const setphotobtn = document.getElementById('photo-add')
    const popup = document.getElementById('popup2')
    popup.style.display = 'flex'
}


onMounted(async () => {
    // console.log('assdfg')
    const token = localStorage.getItem('token')
    if (!token) {
        router.replace('/login')
    }
    if (!token) {
        message.value = 'No token found, please login first.'
        return
    }
    try {
        const req = await fetch('http://localhost:3000/', {
            method: 'get',
            headers: {
                Authorization: `${token}`,
            },
        })
        const res = await req.json()
        // console.log(res.data.name)
        if (req.ok) {
            userName.value = res.data.name
            photo.value = res.data.photo
        }
    } catch (err) {
        message.value = err.message || 'Error fetching home data.'
    }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css");

.userprofile-div {
    width: 100%;
    height: 100vh;
    background-color: white;
    padding: 3% 6%;
    padding-top: 120px;
    /* border: 1px solid black; */
}

.side-bar {
    height: 80vh;
    width: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px 10%;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.181);
    box-shadow: 1px 1px 3px rgba(27, 26, 26, 0.195);

}

.content-page {
    height: 80vh;
    width: 100%;
    background-color: white;
    /* display: inline-block; */
    border: 1px solid rgba(67, 63, 63, 0.156);
    box-shadow: 1px 1px 3px rgba(27, 26, 26, 0.195);

}

.profile-photo {
    width: 25%;
    height: 10%;

    border-radius: 50%;
}

.test {
    width: 100%;
    height: 100vh;
    background-color: blue;
}

.space {
    width: 100%;
    height: 13%;
}

.profile-btn {
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid black;
    text-decoration: none;
    color: black;

}

.preference-btn {
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid black;
    text-decoration: none;
    color: black;
}

body {
    font-family: 'Poppins', sans-serif;
}

.profile-complete {
    background-color: aliceblue;
    height: 200px;
    width: 100%;
    padding: 5% 2%;
}

.photoadd-div {
    background-color: white;
    width: 60%;
    padding: 3% 7%;
    border-radius: 0 10px 0 10px;
    display: inline;
    margin-left: 10px;
}

.popup {
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.34);
    position: fixed;
    top: 0;
    left: 0;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 10000;

}

.popup2 {
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.34);
    position: fixed;
    top: 0;
    left: 0;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 10000;

}

.set-photo {
    height: 50%;
    width: 35%;
    background-color: rgb(255, 255, 255);
    /* display: flex;
    align-items: center;
    justify-content: center; */
    padding: 5% 0;
}

.set-details {
    height: 50%;
    width: 35%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.back {
    /* padding: 10px; */
    background-color: black;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000;

}

.hidden-input {
  display: none;
}

.file-label {
  display: inline-block;
  padding: 10px 20px;
  background-color: orange;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.image-add-btn {
    padding: 10px 20px;
    background-color: green;
    border: none;
    color: white;
    border-radius: 6px;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    transition: all 0.2s ease;
}

.form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

/* icon css  */

.add-btn {
    color: green;
    font-size: x-large;
}
</style>
