<template>
  <div>
    <form class="my-12" @submit.prevent="handleSubmit">
      <div className="max-w-xl mx-auto">
        <div class="mb-5">
          <!-- <label>
            Titulo
            <input
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text" v-model="title" required />
          </label> -->
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Titulo</span>
            </div>
            <input type="text" placeholder="Introduzca el titulo"
              class="input input-bordered w-full max-w-xs input-primary" v-model="title" required />
          </label>
        </div>
        <div class="mb-5">
          <!-- <label>
            Description
            <input
              class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="message" v-model="description" required />
          </label> -->
          <label class="form-control">
            <div class="label">
              <span class="label-text">Descripcion</span>
            </div>
            <textarea class="textarea textarea-bordered h-24 textarea-primary textarea-md" placeholder="Descripcion"
              v-model="description" required></textarea>
          </label>
        </div>
        <div class="mb-5">
          <!-- <label>
            Content
            <input
              class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="message" v-model="content" required />
          </label> -->
          <label class="form-control">
            <div class="label">
              <span class="label-text">Contenido</span>
            </div>
            <textarea class="textarea textarea-bordered h-24 textarea-primary textarea-md" placeholder="Contenido"
              v-model="content" required></textarea>
          </label>
        </div>
        <div class="mb-5">
          <!-- <label>
            Cover
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file" accept="image/*" @change="previewFiles" required />
          </label> -->
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Seleccione su imagen</span>
            </div>
            <input type="file" accept="image/*" class="file-input file-input-bordered w-full max-w-xs"
              @change="previewFiles" required />
          </label>
        </div>
        <div class="mb-5">
          <!-- <label>
            Author
            <select v-model="selauthor"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="author" id="author">
              <option v-for="author in authors" :value='author.id'> {{ author.name }} </option>
            </select>
          </label> -->
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Autor</span>
            </div>
            <select class="select select-bordered select-primary" v-model="selauthor" name="author" id="author">
              <option disabled selected>Seleccione un Autor</option>
              <option v-for="author in authors" :value="author.id">{{ author.name }}</option>
            </select>
          </label>
        </div>
        <!-- <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-auto">Send</button> -->
        <button class="btn btn-active btn-primary">Enviar Formulario</button>
      </div>
    </form>
  </div>
</template>
  
<script>
export default {
  name: 'Form',
  data() {
    return {
      title: '',
      description: '',
      coverSVG: [],
      content: '',
      selauthor: '',
      authors: [],
      form: [],
    }
  },
  methods: {
    previewFiles(event) {
      this.coverSVG = event.target.files[0]
      const formData = new FormData()
      formData.append('image', this.coverSVG)
      formData.append('name', this.coverSVG.name)

      fetch('http://localhost:8000/api/coverimage/',
        {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          this.data = data
        })
        .catch(error => console.error(error));
    },
    async getAuthors() {
      let response = await fetch('http://127.0.0.1:8000/api/author/')
      let data = await response.json()
      this.authors = data
    },
    handleSubmit(event) {
      const formData = {
        title: this.title,
        description: this.description,
        author: parseInt(this.selauthor),
        coverSVG: this.data.id,
        content: this.content,
      };

      fetch('http://localhost:8000/api/mdpost/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
          this.form = data;
          console.log(this.form.author_details.name);
        }).then(() => {
          this.generateMarkdownFile();
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  created() {
    this.getAuthors()
  }
}
</script>