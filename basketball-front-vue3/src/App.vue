<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <img alt="logo" class="logo" src="@/assets/basketball.png" />
      <nav>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/">Games</RouterLink>
        <RouterLink to="/teams">Teams</RouterLink>
        <RouterLink to="/players">Players</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

  .wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }
  .logo {
    height: 6rem;
    width: 6rem;
  }
  nav {
    font-size: 1.4rem;
    display: flex;
    align-items: center;
  }
  nav a.router-link-exact-active {
    color: var(--color-text);
  }
  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }
  nav a {
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }
  nav a:first-of-type {
    border: 0;
  }
  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }
    .logo {
      margin: 0 2rem 0 0;
    }
    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
    nav {
      text-align: left;
      font-size: 1.4rem;
      padding: 1rem 0;
      margin-top: 1rem;
    }
  }
</style>
