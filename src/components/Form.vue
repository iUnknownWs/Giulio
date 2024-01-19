<template>
  <div>
    <form class="my-8" @submit.prevent="handleSubmit">
      <div className="max-w-xl mx-auto">
        <div class="mb-5">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text font-medium">Titulo</span>
            </div>
            <input type="text" placeholder="Introduzca el titulo"
              class="input input-bordered w-full max-w-xs input-primary bg-white" v-model="title" required />
          </label>
        </div>
        <div class="mb-5">
          <label class="form-control">
            <div class="label">
              <span class="label-text font-medium">Descripcion</span>
            </div>
            <textarea class="textarea textarea-bordered h-24 textarea-primary bg-white textarea-md"
              placeholder="Descripcion" v-model="description" required></textarea>
          </label>
        </div>
        <div class="mb-5">
          <label class="form-control">
            <div class="label">
              <span class="label-text font-medium">Contenido</span>
            </div>
            <textarea class="textarea textarea-bordered h-24 textarea-primary bg-white textarea-md"
              placeholder="Contenido" v-model="content" required></textarea>
          </label>
        </div>
        <div class="mb-5">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text font-medium">Portada</span>
            </div>
            <input type="file" accept="image/*" class="file-input file-input-bordered w-full max-w-xs bg-white"
              @change="previewFiles" required />
          </label>
        </div>
        <div class="mb-5">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text font-medium">Autor</span>
            </div>
            <select class="select select-bordered select-primary bg-white" v-model="selauthor" name="author" id="author">
              <option disabled selected>Seleccione un Autor</option>
              <option v-for="author in authors" :value="author.id">{{ author.name }}</option>
            </select>
          </label>
        </div>
        <div class="flex justify-end mt-8"><button class="btn btn-active btn-primary text-white">Enviar
            Formulario</button></div>
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
      image: [],
      content: '',
      selauthor: '',
      authors: [],
      form: [],
    }
  },
  methods: {
    previewFiles(event) {
      this.image = event.target.files[0]
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('name', this.image.name)

      fetch('http://localhost:8000/image/',
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
      let response = await fetch('http://127.0.0.1:8000/author/')
      let data = await response.json()
      this.authors = data
    },
    handleSubmit(event) {
      const formData = {
        title: this.title,
        description: this.description,
        author: parseInt(this.selauthor),
        image: this.data.id,
        content: this.content,
      };

      fetch('http://localhost:8000/blogpost/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
          this.form = data;
          window.location.href = '/';
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