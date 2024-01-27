<template>
  <div>
    <form class="my-8" @submit.prevent="handleSubmit">
      <div className="max-w-xl mx-auto">
        <div class="mb-5">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text font-medium">Longitud</span>
            </div>
            <input
              type="number"
              placeholder="Introduzca la longitud de la localizacion"
              class="input input-bordered w-full max-w-xs input-primary bg-white"
              v-model="lat"
              required
            />
          </label>
        </div>
        <div class="mb-5">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text font-medium">Latitud</span>
            </div>
            <input
              type="number"
              placeholder="Introduzca la latitud de la localizacion"
              class="input input-bordered w-full max-w-xs input-primary bg-white"
              v-model="long"
              required
            />
          </label>
        </div>
        <div class="mb-5">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text font-medium">Titulo</span>
            </div>
            <input
              type="text"
              placeholder="Introduzca el titulo"
              class="input input-bordered w-full max-w-xs input-primary bg-white"
              v-model="title"
              required
            />
          </label>
        </div>
        <div class="mb-5">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text font-medium">Fecha del Evento</span>
            </div>
            <input
              type="date"
              class="input input-bordered w-full max-w-xs input-primary bg-white"
              v-model="inputdate"
              required
            />
          </label>
        </div>
        <div class="mb-5">
          <label class="form-control">
            <div class="label">
              <span class="label-text font-medium">Descripcion</span>
            </div>
            <textarea
              class="textarea textarea-bordered h-24 textarea-primary bg-white textarea-md"
              placeholder="Descripcion"
              v-model="description"
              required
            ></textarea>
          </label>
        </div>
        <div class="mb-5">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text font-medium">Category</span>
            </div>
            <select
              class="select select-bordered select-primary bg-white"
              v-model="category"
              name="category"
              required
            >
              <option disabled selected>Seleccione una categoria</option>
              <option value="event">Evento</option>
              <option value="place">Alojamiento</option>
              <option value="art">Arte</option>
              <option value="economy">Economia</option>
              <option value="food">Comida</option>
              <option value="comms">Comunicacion</option>
              <option value="nature">Natural</option>
              <option value="bussines">Negocios</option>
              <option value="routes">Rutas</option>
            </select>
          </label>
        </div>
        <div class="flex justify-end mt-8">
          <button class="btn btn-active btn-primary text-white">
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
      lat: "",
      long: "",
      title: "",
      description: "",
      content: "",
      category: "",
      inputdate: "",
    };
  },
  methods: {
    handleSubmit(event) {
      const date = new Date(this.inputdate);
      const formatedate = date.toLocaleDateString("en-GB");
      const formData = {
        title: this.title,
        description: this.description,
        category: this.category,
        lat: this.lat,
        long: this.long,
        date: formatedate,
      };

      fetch(`${import.meta.env.PUBLIC_DB}/blogpost/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
