<template>
  <div>
    <form class="mt-8" @submit.prevent="handleSubmit">
      <div className="max-w-xl mx-auto">
        <div class="mb-5">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text font-medium">Nombre</span>
            </div>
            <input
              type="text"
              placeholder="Nombre y apellido del autor"
              class="input input-bordered w-full max-w-xs input-primary bg-white"
              v-model="name"
              required
            />
          </label>
        </div>
        <div class="mb-5">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text font-medium">Foto de Perfil</span>
            </div>
            <input
              type="file"
              accept="image/*"
              class="file-input file-input-bordered w-full max-w-xs bg-white"
              @change="previewFiles"
              required
            />
          </label>
        </div>
        <div class="flex justify-end mt-8">
          <button class="btn btn-active btn-primary text-white" :disabled="disable">
            Enviar Formulario
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      name: "",
      image: [],
      form: [],
      disable: false,
    };
  },
  methods: {
    previewFiles(event) {
      this.image = event.target.files[0];
    },
    async getAuthors() {
      let response = await fetch(`${import.meta.env.PUBLIC_DB}/author/`);
      let data = await response.json();
      this.authors = data;
    },
    handleSubmit() {
      this.disable = true;
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("image", this.image);

      fetch(`${import.meta.env.PUBLIC_DB}/author/`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          this.form = data;
          location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
