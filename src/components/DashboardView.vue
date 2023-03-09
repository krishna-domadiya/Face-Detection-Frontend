<template>
  <div class="container">
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
        <label>
          Image
          <input class="form-control" type="file" ref="fileInput" @change="handleFileInputChange" required/>
        </label>
        <br>
        <br>
        <label>
          Name/Annotation
          <input class="form-control" type="text" v-model="requestName" required/>
        </label>
        <br>
        <br>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <hr v-if="userRequests.length">
    <h5 v-if="userRequests.length">Requests:</h5>
    <div class="container" v-if="userRequests.length">
      <div class="row">
        <div class="col-sm-3 request-div" v-for="(request) in userRequests" :key="request.id">
          <h6 class="card-title text-center">{{ request.name }}</h6>
          <div class="text-center">
            <img :src="request.image" height="50" weight="50">
          </div>
          <div class="card-body">
            <p class="card-text">
              <b>Person count:</b> {{ request.personCount }}
            </p>
            <p>
              <b>Female:</b> {{ request.fCount }}, <b>Male:</b> {{ request.mCount }}
            </p>
            <p>
              <b>Age range:</b> {{ request.ageLow }} to {{ request.ageHigh }}
            </p>
            <p>
              {{ request.eyeGlassesCount }} with eyeglasses
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api.js';
export default {
  name: 'DashboardView',
  props: {
  },
  data() {
    return {
        file: null,
        requestName: '',
        userRequests: []
    }
  },
  methods: {
    async submitForm() {
      if (!this.file) {
        return alert('Please select an image file.');
      }
      const formData = new FormData()
      formData.append('image', this.file)
      formData.append('name', this.requestName)
      try {
        const response = await api.post('detect', formData);
        this.userRequests.push(response.data.data);
        this.requestName = '';
        this.$refs.fileInput.value = "";
      } catch (error) {
        console.error(error)
        alert('An error occurred while processing your request.')
      }
    },
    handleFileInputChange(event) {
      let selectedFile = event.target.files[0]
      if (selectedFile) {
        const fileType = selectedFile.type;
        if (fileType === "image/jpeg" || fileType === "image/png") {
            this.file = selectedFile;
        } else {
            this.$refs.fileInput.value = "";
            alert("Please select a JPEG or PNG image.");
        }
      }
    },
    async getUserRequests() {
      try {
        const response = await api.get('requests')
        this.userRequests = response.data.userRequests
      } catch (error) {
        console.error(error)
        alert('An error occurred while retrieving the requests.')
      }
    }
  },
  mounted() {
    this.getUserRequests()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.request-div {
  margin-bottom: 15px; 
  margin-left: 3px;
  padding: 10px; 
  border: 1px solid lightgrey;
}

p {
  font-size: 15px;
  margin: 0;
}
</style>
