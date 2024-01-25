<template>
    <div>
        <form class="my-8" @submit.prevent="handleSubmit">
            <div className="max-w-xl mx-auto">
                <div class="mb-5">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text font-medium">Longitud</span>
                        </div>
                        <input type="text" placeholder="Introduzca la longitud de la localizacion"
                            class="input input-bordered w-full max-w-xs input-primary bg-white" v-model="lat" required />
                    </label>
                </div>
                <div class="mb-5">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text font-medium">Latitud</span>
                        </div>
                        <input type="text" placeholder="Introduzca la latitud de la localizacion"
                            class="input input-bordered w-full max-w-xs input-primary bg-white" v-model="long" required />
                    </label>
                </div>
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
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text font-medium">Categoria</span>
                        </div>
                        <select class="select select-bordered select-primary bg-white" v-model="selauthor" name="author">
                            <option disabled selected>Seleccione una categoria</option>
                            <option value="">Evento</option>
                            <option value="">Alojamiento</option>
                            <option value="">Arte</option>
                            <option value="">Economia</option>
                            <option value="">Comida</option>
                            <option value="">Comunicacion</option>
                            <option value="">Natural</option>
                            <option value="">Negocios</option>
                            <option value="">Rutas</option>
                            <option value="">Souvenirs</option>
                        </select>
                    </label>
                </div>
                <div class="flex justify-end mt-8">
                    <button class="btn btn-active btn-primary text-white">Enviar Formulario</button>
                </div>
            </div>
        </form>
    </div>
</template>
    
<script>
export default {
    name: 'Form',
    data() {
        return {
            lat: '',
            long: '',
            title: '',
            description: '',
            content: '',
            form: [],
        }
    },
    methods: {
        previewFiles(event) {
            this.image = event.target.files[0]
            const formData = new FormData()
            formData.append('image', this.image)
            formData.append('name', this.image.name)

            fetch(`${import.meta.env.PUBLIC_DB}/image/`,
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
            let response = await fetch(`${import.meta.env.PUBLIC_DB}/author/`)
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

            fetch(`${import.meta.env.PUBLIC_DB}/blogpost/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    this.form = data;
                    location.reload();
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