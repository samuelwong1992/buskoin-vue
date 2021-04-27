<template>
  <div class="profile">
    <div class="profile-container">
      <img :src="logo" alt="" v-if="!errorMessage" />
      <p class="entertainer-name" v-if="!errorMessage">
        {{ entertainer_name }}
      </p>
      <p class="entertainer-heading" v-if="!errorMessage">{{ headline }}</p>

      <p class="donation" v-if="!errorMessage">
        Thank you for your ${{ value }} donation
      </p>
      <p class="error-text" v-if="errorMessage">{{ errorMessage }}</p>

      <button
        class="profile-btn"
        v-on:click="backToTipScreen"
        v-if="entertainer_uuid && errorCode == 1"
      >
        Back to Tip Screen
      </button>
      <button
        class="profile-btn"
        v-on:click="backToProfileScreen"
        v-if="entertainer_uuid && errorCode != 1"
      >
        Entertainer Profile
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Confirmation",
  data: function () {
    return {
      entertainer_name: "",
      headline: "",
      logo: "",
      value: "",

      errorMessage: "",
      errorCode: "",
      entertainer_uuid: "",
    };
  },
  methods: {
    backToTipScreen: function () {
      this.$router.push({
        name: "TipUser",
        params: { id: this.entertainer_uuid },
      });
    },
    backToProfileScreen: function () {
      this.$router.push({
        name: "Profile",
        params: { id: this.entertainer_uuid },
      });
    },
  },
  mounted: function () {
    this.$nextTick(() => {
      this.axios
        .get(
          this.$hostname + "api/fetch-payment/" + this.$route.params.id + "/",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.error != null) {
            this.errorMessage = response.data.error;
            this.errorCode = response.data.code;
            this.entertainer_uuid = response.data.entertainer.uuid;
          } else {
            if (response.data.success != null) {
              this.entertainer_name =
                response.data.entertainer.entertainer_name;
              this.headline = response.data.entertainer.headline;
              this.logo = response.data.entertainer.logo;
              this.entertainer_uuid = response.data.entertainer.uuid;
              this.value = response.data.value;
            } else {
              this.errorMessage = "Something went wrong...";
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.profile {
  display: flex;
}

.profile-container {
  background-color: $primary;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 32px;
  width: 33%;

  img {
    height: 200px;
    width: 200px;
    margin: auto;
    margin-bottom: 16px;
  }

  .entertainer-name {
    font-size: 2rem;
    font-weight: bold;
    color: $on_primary;
  }

  .entertainer-heading {
    font-size: 1.5rem;
    font-weight: bold;
    color: $primary_light;
  }

  .donation {
    color: $on_primary;
    margin-top: 24px;
    font-size: 3rem;
    font-weight: bold;
  }

  button {
    height: 44px;
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 24px;
    border-radius: 20px;
    border: 2px $primary_light solid;
    font-weight: bold;
    color: $primary;
    cursor: pointer;

    &:focus {
      outline: 0;
    }
  }
}
</style>
