<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/tip">Tip</router-link> |
      <router-link v-if="this.$store.state.token" to="/profile"
        >Profile</router-link
      >
      <span v-if="this.$store.state.token">|</span>
      <router-link v-if="!this.$store.state.token" to="/sign-up"
        >Sign Up</router-link
      >
      <span v-if="!this.$store.state.token">| </span>
      <router-link v-if="!this.$store.state.token" to="/login"
        >Login</router-link
      >
      <router-link v-if="this.$store.state.token" to="/logout"
        >Logout</router-link
      >
    </div>
    <router-view class="rv" />
  </div>
</template>

<style lang="scss">
@import "scss/_variables.scss";

* {
  margin: 0px;
  padding: 0px;
}
#app {
  background-color: black;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.rv {
  flex-grow: 1;
}

.error-text {
  color: red;
  font-size: 2rem;
  font-weight: bold;
}

.secondary-button {
  height: 40px;
  margin: auto;
  margin-top: 16px;
  margin-right: 0px;
  width: 80px;
  text-align: center;
  border: 2px $primary solid;
  border-radius: 4px;
  color: $primary;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
}

.primary-button {
  @extend .secondary-button;

  background-color: $primary;
  border: 2px white solid;
  color: white;
}
</style>
