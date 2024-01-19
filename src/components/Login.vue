<template>
    <div class="flex justify-center items-center h-[785px]">
        <div class="bg-white shadow-lg rounded p-8 h-min">
            <h1 class="text-4xl text-primary font-bold text-center my-4 leading-none">
                LOGIN
            </h1>
            <form @submit.prevent="handleSubmit">
                <div className="max-w-xl mx-auto">
                    <div class="mb-5">
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                                <span class="label-text font-medium">Usuario</span>
                            </div>
                            <input type="text" placeholder="Introduzca el titulo"
                                class="input input-bordered w-full max-w-xs input-primary bg-white" v-model="username"
                                required />
                        </label>
                    </div>
                    <div class="mb-5">
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                                <span class="label-text font-medium">Contraseña</span>
                            </div>
                            <input type="password" placeholder="Introduzca el titulo"
                                class="input input-bordered w-full max-w-xs input-primary bg-white" v-model="password"
                                required />
                        </label>
                    </div>
                    <div class="flex justify-end mt-8">
                        <button class="btn btn-active btn-primary text-white">Iniciar Sesion</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Form',
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        handleSubmit() {
            const formData = {
                username: this.username,
                password: this.password,
            };

            console.log(formData);

            fetch('http://localhost:8000/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('token', data.access);
                    window.location.href = '/';
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
}
</script>