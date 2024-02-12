<template>
  <div class="navbar bg-white border-b-primary border-b-4">
    <div class="navbar-start">
      <div class="dropdown">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost lg:hidden hover:bg-base-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            ></path>
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a class="hover:bg-base-200 font-bold" href="/blog">Blog</a>
          </li>
          <li>
            <a class="hover:bg-base-200 font-bold" href="/about"
              >Sobre nosotros</a
            >
          </li>
          <li>
            <a class="hover:bg-base-200 font-bold" href="/contact">Contacto</a>
          </li>
          <li v-if="signed">
            <a class="hover:bg-base-200 font-bold" href="/admin/blog"
              >Editar Blog</a
            >
          </li>
          <li v-if="signed">
            <a class="hover:bg-base-200 font-bold" href="/admin/map"
              >Editar Mapa</a
            >
          </li>
        </ul>
      </div>
      <a class="btn btn-ghost text-xl hover:bg-base-200" href="/"
        ><img width="120" src="/icon.png" alt="logo"
      /></a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a class="hover:bg-base-200 font-bold" href="/blog">Blog</a></li>
        <li>
          <a class="hover:bg-base-200 font-bold" href="/about"
            >Sobre nosotros</a
          >
        </li>
        <li>
          <a class="hover:bg-base-200 font-bold" href="/contact">Contacto</a>
        </li>
      </ul>
    </div>
    <div class="navbar-end gap-2">
      <a v-if="!signed" class="btn hover:bg-base-200" href="/admin">Admin</a>
      <a
        v-if="signed"
        class="btn hover:bg-base-200 hidden lg:flex"
        href="/admin/blog"
        >Editar Blog</a
      >
      <a
        v-if="signed"
        class="btn hover:bg-base-200 hidden lg:flex"
        href="/admin/map"
        >Editar Mapa</a
      >
      <a v-if="signed" @click="logout" class="btn btn-primary text-white"
        >Cerrar sesión</a
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signed: localStorage.token ? true : false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      window.location.href = "/";
    },
  },
};
</script>
