<template>
  <div class="profile-page d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <div class="form-div">
            <h2 class="text-center mb-4">Personal Details</h2>
            <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
              <div class="row g-3">
                <div class="col-md-6">
                  <input type="date" class="form-control" v-model="date" required />
                </div>
                <div class="col-md-6">
                  <input type="number" class="form-control" placeholder="Enter age" id="age" v-model="age">
                </div>
                <div class="col-md-6">
                  <select class="form-select" required v-model="matrialstatus">
                    <option disabled selected value="">Matrial status</option>
                    <option value="Never married">Never married</option>
                    <option value="Widower">Widower</option>
                    <option value="Awaiting devorce">Awaiting devorce</option>
                    <option value="devorced">devorced</option>
                  </select>
                </div>

                <div class="col-md-6">
                  <select class="form-select" required id="accounttype" v-model="religion">
                    <option disabled selected value="">Select religion</option>
                    <option value="Hindu">Hindu</option>
                    <option value="muslim">muslim</option>
                    <option value="Christian"> Christian</option>
                    <option value="jain">jain</option>
                    <option value="Buddhist">Buddhist</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <select class="form-select" required id="residenceDistrict" v-model="district">
                    <option disabled selected value="">Select Resident District</option>
                    <option v-for="district in keralaDistricts" :key="district" :value="district">
                      {{ district }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6">
                  <select class="form-select" required id="residenceDistrict" v-model="education">
                    <option disabled selected value="">Select Educatonal Details</option>
                    <option v-for="job in educationalQualifications" :key="job" :value="job">
                      {{ job }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6">
                  <select class="form-select" required id="residenceDistrict" v-model="occupation">
                    <option disabled selected value="">Select occupation</option>
                    <option v-for="occupation in occupations" :key="occupation" :value="occupation">
                      {{ occupation }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6">
                  <select class="form-select" required id="residenceDistrict" v-model="income">
                    <option disabled selected value="">Select anual income</option>
                    <option v-for="income in allAnnualIncomeRanges" :key="income" :value="income">
                      {{ income }}
                    </option>
                  </select>
                </div>

                <div class="col-md-6">
                  <input type="file" class="form-control" id="file" ref="photoInput"  accept="image/*"  @input="photocheck" />
                </div>
                <div class="col-md-6">
                  <input type="text" class="form-control" id="address" v-model="address" placeholder="Address" required @input="inputcheck"  />
                </div>
                <div class="col-md-6">
                  <select class="form-select" required id="residenceDistrict" v-model="height">
                    <option disabled selected value="">select height</option>
                    <option v-for="height in humanHeightsFeet" :key="height" :value="height">
                      {{ height }}
                    </option>
                  </select>
                </div>

                 <div class="col-md-6">
                  <select class="form-select" required id="residenceDistrict" v-model="language">
                    <option disabled selected value="">select Monther toungue</option>
                    <option v-for="language in humanLanguages" :key="language" :value="language">
                      {{ language }}
                    </option>
                  </select>
                </div>
                

              </div>


              <div class="text-center mt-4">
                <button type="submit" class="btn btn-primary px-5">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>



<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()


var photo


const date = ref('')
const age = ref('')
const matrialstatus = ref('')
const religion = ref('')
const district = ref('')
const education = ref('')
const occupation = ref('')
const income = ref('')
const photoInput = ref(null);
const address = ref('')
const height = ref('')
const language = ref('')


function photocheck() {
  // console.log('photo is working')
  photo = document.getElementById('file').files[0]
  console.log(photo)

}
function inputcheck() {
  console.log('address working')
}

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('date', date.value);
    formData.append('age', age.value);
    formData.append('matrialstatus', matrialstatus.value);
    formData.append('religion', religion.value);
    formData.append('district', district.value);
    formData.append('education', education.value);
    formData.append('occupation', occupation.value);
    formData.append('income', income.value);
    formData.append('address', address.value);
    formData.append('photo', photo);
    formData.append('height', height.value);
    formData.append('language', language.value);



    const response = await fetch('http://localhost:3000/personal', {
      method: 'POST',
      headers: {
        Authorization: ` ${token}`, 
      },
      body: formData, 
    });

    const result = await response.json();
    console.log(result);

     if (response.ok) {
      return router.push('/')
    }
     
  } catch (err) {
    console.log(err);
    return result.message
  }
};

onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.replace('/login')
  }
})

const keralaDistricts = [
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod"
];
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

const humanLanguages = [
  "English", "Mandarin Chinese", "Hindi", "Spanish", "French",
  "Arabic", "Bengali", "Russian", "Portuguese", "Urdu",
  "German", "Japanese", "Swahili", "Turkish", "Korean",
  "Vietnamese", "Italian", "Thai", "Persian (Farsi)", "Polish",
  "Malay/Indonesian", "Punjabi", "Telugu", "Marathi", "Tamil",
  "Kannada", "Gujarati", "Hausa", "Yoruba", "Amharic",
  "Burmese", "Malayalam", "Odia", "Sindhi", "Nepali",
  "Sinhala", "Hebrew", "Pashto", "Ukrainian", "Dutch",
  "Czech", "Romanian", "Hungarian", "Slovak", "Swedish",
  "Finnish", "Danish", "Norwegian", "Greek", "Serbian",
  "Croatian", "Bulgarian", "Kazakh", "Azerbaijani", "Zulu",
  "Xhosa", "Somali", "Albanian", "Armenian", "Georgian",
];







</script>

<style scoped>
.profile-page {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 40px 0;
}

.form-div {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
}
</style>
