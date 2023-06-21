<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <h1 class="navbar-brand">Vue-3</h1>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/">Главная страница</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/about">О нас</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/users">Option API</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/store">Store</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/composition">Composition API</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/hooks">Hooks</router-link>
            </li>
          </ul>
          <slot v-if="$route.path === '/users' || '/store' || '/composition' || '/hooks'"></slot>
        </div>
      </div>
    </nav>
  </div>
</template>
