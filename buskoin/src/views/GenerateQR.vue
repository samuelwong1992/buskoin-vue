<template>
  <div class="generate-qr">
    <qrcode-vue
      v-if="entertainer_uuid"
      :value="entertainer_uuid"
      :size="300"
      level="H"
    />
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  name: "GenerateQR",
  data: function () {
    return {
      errorMessage: "",

      entertainer_uuid: "",
      entertainer_name: "",
      headline: "",
      logo: "",
    };
  },
  components: {
    QrcodeVue,
  },
  methods: {
    getProfile: function () {
      this.axios
        .get(this.$hostname + "api/profile/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + this.$store.state.token,
          },
        })
        .then((response) => {
          if (response.data.error != null) {
            this.errorMessage = response.data.error;
          } else {
            if (response.data.profile != null) {
              this.entertainer_uuid =
                this.$hostname + "api/tip-user/" + response.data.profile.uuid;
              this.entertainer_name = response.data.profile.entertainer_name;
              this.headline = response.data.profile.headline;
              this.logo = response.data.profile.logo;
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted: function () {
    this.$nextTick(() => this.getProfile());
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.profile {
  display: flex;
  margin: 0px;

  .profile-container {
    display: flex;
    margin: auto;
    margin-top: 0px;
    margin-bottom: 0px;
    padding: 32px;
    width: 80%;
  }
}

.logo-container {
  padding: 32px;

  img {
    height: 160px;
  }

  .social-link {
    height: 32px;
    display: flex;
    color: white;

    a {
      display: flex;
      color: white;

      p {
        margin: auto;
      }
    }

    img {
      margin: auto;
      margin-left: 0px;
      height: 20px;
      margin-right: 8px;
    }
  }
}

.entertainer-info {
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  * {
    text-align: left;
  }

  .entertainer-name {
    font-size: 2rem;
    font-weight: bold;
    color: $primary_light;
  }

  .entertainer-heading {
    font-size: 1.5rem;
    font-weight: bold;
    color: $on_primary;
  }

  .entertainer-bio {
    font-size: 1.2rem;
    color: white;
    flex-grow: 1;
    resize: none;

    &:focus {
      border: none;
    }
  }

  .edit-button {
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

  .save-button {
    @extend .edit-button;

    background-color: $primary;
    border: 2px white solid;
    color: white;
  }

  .not-editing {
    background-color: black;
    border: none;
  }

  .editing {
    margin-top: 8px;
    margin-bottom: 8px;
    background-color: white;
    color: black;
    padding-left: 8px;
    border-radius: 4px;
  }
}
</style>
