<template>
    <Navbar />
    <div class="adjust"></div>
    <div class="container">
        <div class="p-5 edit-profile-div ">
            <div class="row edit-profile align-items-center gy-3">
                <div class="col-3 col-md-4  col-lg-2 profile-pic mb-3 mb-md-0">
                    <img :src="image" alt="" class="img-fluid" style="border-radius: 0;" />
                </div>
                <div class="col-12 col-md-8 col-lg-10  profile-content">
                    <h3 v-if="name">{{ name }}</h3>
                    <span v-if="age">{{ age }} Yrs,</span> <span v-if="height"> {{ height }} Ft</span><br>
                    <span v-if="district">{{ district }}, <span v-if="address">{{ address }}</span></span>
                    <p v-if="education">{{ education }}, <span v-if="occupation">{{ occupation }}</span></p>
                    <p v-if="email">{{ email }}</p>
                </div>
            </div>
            <h3>personal information</h3>
            <div class=" personal-information-div">
                <h4>basic details</h4>
                <p v-if="name">name : <span>{{ name }}</span></p>
                <p v-if="age">age : <span>{{ age }} years</span></p>
                <p v-if="height">height : <span>{{ height }} Ft</span></p>
                <p v-if="mothertongue">mother toungue : <span>{{ mothertongue }}</span> </p>
                <p v-if="maritalStatus">Marital Status : <span>{{ maritalStatus }}</span> </p>
                <p v-if="address">currect place : <span>{{ address }}</span> </p>
                <p @click="popup" class="edit-btn">Edit</p>
            </div>
            <h3>Professional Information</h3>
            <div class=" personal-information-div">
                <h4>basic details</h4>
                <p v-if="education">education : <span>{{ education }}</span></p>
                <p v-if="occupation">occupation : <span>{{ occupation }} </span></p>
                <p v-if="AnnualIncome">Annual Income : <span>{{ AnnualIncome }}</span></p>
                <p @click="popup2" class="edit-btn">Edit</p>
            </div>
        </div>
    </div>
    <div id="popup" class="popup">
        <div class="popup-div">
            <h4 class="text-center ">Edit Personal Information</h4>
            <form @submit.prevent="editpersonalinfo" class="row">
                <div class="col-12">
                    <input class="form-control" required v-model="nameInput" type="text" placeholder="Enter name" />
                </div>
                <div class="col-12">
                    <input class="form-control" required v-model="ageInput" type="number" placeholder="Enter age" />
                </div>
                <div class="col-12 ">
                    <select class="form-select" required v-model="heightInput">
                        <option disabled selected value="">Select height</option>
                        <option v-for="height in humanHeightsFeet" :key="height" :value="height">{{ height }}</option>
                    </select>
                </div>
                <div class="col-12">
                    <input class="form-control" required v-model="addressInput" type="text"
                        placeholder="Enter address" />
                </div>
                <div class="col-12 text-center">
                    <button class="btn btn-success px-5" type="submit">Add</button>
                </div>
            </form>
        </div>
        <span @click="Back" class="back">x</span>
    </div>

    <div id="popup2" class="popup2">
        <div class="popup-div2">
            <h4 class="text-center ">Edit Professional Information</h4>
            <form @submit.prevent="editProfessional" class="row">
                <div class="col-12 ">
                    <select class="form-select" required v-model="Eduction">
                        <option disabled selected value="">Select Eduction</option>
                        <option v-for="eduction in educationalQualifications" :key="eduction" :value="eduction">{{
                            eduction }}</option>
                    </select>
                </div>
                <div class="col-12 ">
                    <select class="form-select" required v-model="Occupation">
                        <option disabled selected value="">Select Occupation</option>
                        <option v-for="occupation in occupations" :key="occupation" :value="occupation">{{ occupation }}
                        </option>
                    </select>
                </div>
                <div class="col-12 ">
                    <select class="form-select" required v-model="Income">
                        <option disabled selected value="">Select annual income</option>
                        <option v-for="income in allAnnualIncomeRanges" :key="income" :value="income">{{ income }}
                        </option>
                    </select>
                </div>
                <div class="col-12 text-center">
                    <button class="btn btn-success px-5" type="submit">Add</button>
                </div>
            </form>
        </div>
        <span @click="Back" class="back">x</span>
    </div>
    <Footer />
</template>

<script setup>

import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"

import { ref, onMounted } from "vue"

function popup() {
    const popup = document.getElementById('popup')
    popup.style.display = 'flex'
    nameInput.value = name.value
    ageInput.value = age.value
    heightInput.value = height.value
    addressInput.value = address.value
}
function popup2() {
    const popup = document.getElementById('popup2')
    popup.style.display = 'flex'
    Eduction.value = education.value
    Occupation.value = occupation.value
    Income.value = AnnualIncome.value
}

function Back() {
    const popup = document.getElementById('popup')
    const popup2 = document.getElementById('popup2')
    popup.style.display = 'none'
    popup2.style.display = 'none'

}


const name = ref('')
const image = ref('')
const age = ref('')
const height = ref('')
const district = ref('')
const address = ref('')
const education = ref('')
const occupation = ref('')
const email = ref('')
const mothertongue = ref('')
const maritalStatus = ref('')
const AnnualIncome = ref('')

// for personal 

const nameInput = ref('')
const ageInput = ref('')
const heightInput = ref('')
const addressInput = ref('')

// for professional

const Eduction = ref('')
const Occupation = ref('')
const Income = ref('')




async function editpersonalinfo() {
    const token = localStorage.getItem('token')

    try {
        const req = await fetch('http://localhost:3000/posteditProfile', {
            method: 'post',
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nameInput.value,
                age: ageInput.value,
                height: heightInput.value,
                address: addressInput.value,
            }),
        })
        const res = await req.json()
        console.log(res, 'here the edit data')
        if (req.ok) {
            const popup = document.getElementById('popup')
            popup.style.display = 'none'
            name.value = res.editdata.name
            age.value = res.editdata.age
            height.value = res.editdata.height
            address.value = res.editdata.address
            nameInput.value = ''
            ageInput.value = ''
            heightInput.value = ''
            addressInput.value = ''
        }
    } catch (err) {
        console.log(err)
    }
}
async function editProfessional() {
    const token = localStorage.getItem('token')
    try {
        const req = await fetch('http://localhost:3000/posteditprofessional', {
            method: 'post',
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                education: Eduction.value,
                occupation: Occupation.value,
                income: Income.value,
            }),
        })
        const res = await req.json()
        console.log(res, 'here the proffesiona edit data')
        if (req.ok) {
            const popup2 = document.getElementById('popup2')
            popup2.style.display = 'none'
            Eduction.value = res.editdata.eduction
            Occupation.value = res.editdata.occupation
            Income.value = res.editdata.income
            Eduction.value = ""
            Occupation.value = ""
            Income.value = ""
        }
    } catch (err) {
        console.log(err)
    }
}





onMounted(async () => {
    const token = localStorage.getItem('token')
    try {
        const formData = new FormData();
        const req = await fetch('http://localhost:3000/editprofile', {
            method: 'get',
            headers: {
                Authorization: `${token}`,
            },
        })
        const res = await req.json()
        console.log(res, 'here is response')
        if (req.ok) {
            name.value = res.data.name
            image.value = res.data.photo
            age.value = res.data.age
            height.value = res.data.height
            district.value = res.data.district
            address.value = res.data.address
            education.value = res.data.education
            occupation.value = res.data.occupation
            email.value = res.data.email
            mothertongue.value = res.data.language
            maritalStatus.value = res.data.matrialstatus
            AnnualIncome.value = res.data.income
        }
    } catch (err) {
        console.log(err)
    }

})

const educationalQualifications = [
    "Below SSLC",
    "SSLC / 10th",
    "Plus Two / 12th / HSC",
    "Diploma",
    "ITI / Vocational Training",
    "Undergraduate (UG)",
    "Bachelor's Degree",
    "Postgraduate (PG)",
    "Master's Degree",
    "M.Phil.",
    "Ph.D.",
    "MBBS",
    "BDS",
    "B.Tech / B.E.",
    "M.Tech / M.E.",
    "B.Com",
    "M.Com",
    "B.Sc",
    "M.Sc",
    "B.A.",
    "M.A.",
    "LLB",
    "LLM",
    "BBA",
    "MBA / PGDM",
    "CA / ICWA / CS",
    "Other"
];
const occupations = [
    "Government Employee",
    "Private Sector Employee",
    "Business / Entrepreneur",
    "Self-Employed",
    "Farmer / Agriculturist",
    "Daily Wage Worker",
    "Teacher / Professor",
    "Doctor",
    "Nurse / Medical Staff",
    "Engineer",
    "Lawyer / Advocate",
    "Accountant",
    "Police / Defense Personnel",
    "Driver",
    "Electrician / Plumber / Mechanic",
    "Construction Worker",
    "IT Professional",
    "Banking / Finance Professional",
    "Artist / Performer",
    "Journalist / Media Professional",
    "Student",
    "Homemaker",
    "Unemployed",
    "Retired",
    "Social Worker",
    "Clergy / Religious Worker",
    "Other"
];
const allAnnualIncomeRanges = [
    "Below ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,001- ₹2,00,000",
    "₹2,00,001- ₹3,00,000",
    "₹3,00,001- ₹4,00,000",
    "₹4,00,001- ₹5,00,000",
    "₹5,00,001- ₹7,50,000",
    "₹7,50,001- ₹10,00,000",
    "₹10,00,001- ₹12,50,000",
    "₹12,50,001- ₹15,00,000",
    "₹15,00,001- ₹20,00,000",
    "₹20,00,001- ₹25,00,000",
    "Above ₹25,00,000"
];

const humanHeightsFeet = [
    "4'0\"", "4'1\"", "4'2\"", "4'3\"", "4'4\"", "4'5\"", "4'6\"", "4'7\"", "4'8\"", "4'9\"", "4'10\"", "4'11\"",
    "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"",
    "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\"", "6'6\"", "6'7\"", "6'8\"", "6'9\"", "6'10\"", "6'11\"",
    "7'0\""
];
</script>

<style scoped>
/* * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
} */



.adjust {
    height: 100px;
    background-color: transparent;
}


.edit-profile-div {
    background-color: white;
    min-height: 100vh;
    width: 100%;
    overflow-y: auto;
    /* safer than scroll */
    scrollbar-width: none;
    padding: 1rem;
    /* added */

}


.edit-profile {
    background-color: white;
    padding: 1%;
}


.profile-pic {
    background-color: grey;
    width: 200px;
    height: 200px;
    padding: 10px;

}

.profile-pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* border-radius: 8px; */
    /* object-fit: cover; */
}


.profile-content {
    background-color: beige;
    /* height: 150px; */
    text-transform: capitalize;
    padding: 15px;
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
    z-index: 100;

}

.profile-content img {
    max-width: 100%;
    height: auto;
    display: block;
}

.personal-information-div {
    background-color: beige;
    padding: 1%;
    height: max-content;
    text-transform: capitalize;

}

.personal-information-div span {
    font-weight: bolder;
}

h3 {
    text-transform: capitalize;

}

.edit-btn {
    padding: 2px 20px;
    background-color: black;
    color: white;
    width: max-content;
    text-decoration: underline;
}

/* popup css */

.popup {
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.244);
    position: fixed;
    top: 0;
    left: 0;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 99;
}

.popup-div {
    width: 100%;
    max-width: 500px;
    background-color: white;
    border-radius: 10px;
}

.popup-div form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 8px;
}

/* popup 2 */

.popup2 {
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.244);
    position: fixed;
    top: 0;
    left: 0;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 10000;
}

.popup-div2 {
    width: 100%;
    max-width: 500px;
    background-color: white;
    border-radius: 10px;
}
.popup-div2 form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 8px;
}
</style>
