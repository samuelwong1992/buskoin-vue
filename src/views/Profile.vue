<template>
  <div class="profile">
    <div v-if="!notFound" class="profile-container">
      <div class="logo-container">
        <img :src="logo" alt="" srcset="" />
        <button
            v-if="!uuid"
            v-on:click="goToGenerate"
            class="primary-button"
            style="width: 100%; margin-bottom: 24px"
          >
            Generate QR Code
          </button>
        <div class="social-links">
          <div v-if="facebook_url || editing" class="social-link">
            <a target="_blank" :href="facebook_url" v-if="!editing">
              <img src="@/assets/images/facebook_logo.png" alt="" srcset="" />
              <p>{{ facebook_url }}</p>
            </a>

            <img
              v-if="editing"
              src="@/assets/images/facebook_logo.png"
              alt=""
              srcset=""
            />
            <input type="text" v-model="facebook_url" v-if="editing" />
          </div>

          <div v-if="insta_url || editing" class="social-link">
            <a target="_blank" :href="insta_url" v-if="!editing">
              <img src="@/assets/images/insta_logo.png" alt="" srcset="" />
              <p>{{ insta_url }}</p>
            </a>

            <img
              v-if="editing"
              src="@/assets/images/insta_logo.png"
              alt=""
              srcset=""
            />
            <input type="text" v-model="insta_url" v-if="editing" />
          </div>

          <div v-if="youtube_url || editing" class="social-link">
            <a target="_blank" :href="youtube_url" v-if="!editing">
              <img src="@/assets/images/youtube_logo.png" alt="" srcset="" />
              <p>{{ youtube_url }}</p>
            </a>

            <img
              v-if="editing"
              src="@/assets/images/youtube_logo.png"
              alt=""
              srcset=""
            />
            <input type="text" v-model="youtube_url" v-if="editing" />
          </div>

          <div v-if="twitter_url || editing" class="social-link">
            <a target="_blank" :href="twitter_url" v-if="!editing">
              <img src="@/assets/images/twitter_logo.png" alt="" srcset="" />
              <p>{{ twitter_url }}</p>
            </a>

            <img
              v-if="editing"
              src="@/assets/images/twitter_logo.png"
              alt=""
              srcset=""
            />
            <input type="text" v-model="twitter_url" v-if="editing" />
          </div>

          <div v-if="snapchat_url || editing" class="social-link">
            <a target="_blank" :href="snapchat_url" v-if="!editing">
              <img src="@/assets/images/snapchat_logo.png" alt="" srcset="" />
              <p>{{ snapchat_url }}</p>
            </a>

            <img
              v-if="editing"
              src="@/assets/images/snapchat_logo.png"
              alt=""
              srcset=""
            />
            <input type="text" v-model="snapchat_url" v-if="editing" />
          </div>
        </div>
      </div>
      <div class="entertainer-info">
        <input
          :disabled="!editing || saving"
          class="entertainer-name"
          :class="{ 'not-editing': !editing, editing: editing }"
          v-model="entertainer_name"
        />
        <input
          :disabled="!editing || saving"
          class="entertainer-heading"
          :class="{ 'not-editing': !editing, editing: editing }"
          v-model="headline"
        />
        <textarea
          :disabled="!editing || saving"
          class="entertainer-bio"
          :class="{ 'not-editing': !editing, editing: editing }"
          v-model="bio"
        ></textarea>
        <button
          class="edit-button"
          v-if="!editing && !uuid"
          v-on:click="enableEdit"
        >
          Edit
        </button>
        <button class="save-button" v-if="editing && !uuid" v-on:click="save">
          {{ saving ? "Saving..." : "Save" }}
        </button>
        <p class="error-text">{{ errorMessage }}</p>
      </div>
    </div>
    <not-found-component v-if="notFound"></not-found-component>
  </div>
</template>

<script>
import NotFoundComponent from "../components/NotFoundComponent.vue";

export default {
  name: "Profile",
  data: function () {
    return {
      errorMessage: "",

      entertainer_name: "",
      headline: "",
      bio: "",
      facebook_url: "",
      insta_url: "",
      youtube_url: "",
      twitter_url: "",
      snapchat_url: "",
      logo: "",

      editing: false,
      saving: false,

      uuid: this.$route.params.id,
      notFound: false,
    };
  },
  components: {
    NotFoundComponent,
  },
  methods: {
    getProfile: function () {
      let app = this;
      if (!this.uuid) {
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
            }
            if (response.data.profile != null) {
              this.entertainer_name = response.data.profile.entertainer_name;
              this.headline = response.data.profile.headline;
              this.bio = response.data.profile.bio;
              this.facebook_url = response.data.profile.facebook_url;
              this.insta_url = response.data.profile.insta_url;
              this.youtube_url = response.data.profile.youtube_url;
              this.twitter_url = response.data.profile.twitter_url;
              this.snapchat_url = response.data.profile.snapchat_url;
              this.logo = response.data.profile.logo;
            }
          })
          .catch(function (error) {
            console.log(error);
            app.notFound = true;
          });
      } else {
        this.axios
          .get(this.$hostname + "api/fetch-profile/" + this.uuid + "/", {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.data.error != null) {
              this.errorMessage = response.data.error;
            }
            if (response.data.profile != null) {
              this.entertainer_name = response.data.profile.entertainer_name;
              this.headline = response.data.profile.headline;
              this.bio = response.data.profile.bio;
              this.facebook_url = response.data.profile.facebook_url;
              this.insta_url = response.data.profile.insta_url;
              this.youtube_url = response.data.profile.youtube_url;
              this.twitter_url = response.data.profile.twitter_url;
              this.snapchat_url = response.data.profile.snapchat_url;
              this.logo = response.data.profile.logo;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    goToGenerate: function () {
      this.$router.push({ name: "GenerateQR" });
    },
    enableEdit: function () {
      this.editing = true;
    },
    save: function () {
      if (this.saving) {
        return;
      }

      var formData = new FormData();

      formData.append("entertainer_name", this.entertainer_name);
      formData.append("headline", this.headline);
      formData.append("bio", this.bio);
      formData.append("facebook_url", this.facebook_url);
      formData.append("insta_url", this.insta_url);
      formData.append("youtube_url", this.youtube_url);
      formData.append("twitter_url", this.twitter_url);
      formData.append("snapchat_url", this.snapchat_url);

      this.saving = true;
      this.axios
        .patch(this.$hostname + "api/profile/", formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + this.$store.state.token,
          },
        })
        .then((response) => {
          this.saving = false;
          this.editing = false;
          if (response.data.error != null) {
            this.errorMessage = response.data.error;
          }
          if (response.data.profile != null) {
            this.entertainer_name = response.data.profile.entertainer_name;
            this.headline = response.data.profile.headline;
            this.bio = response.data.profile.bio;
            this.facebook_url = response.data.profile.facebook_url;
            this.insta_url = response.data.profile.insta_url;
            this.youtube_url = response.data.profile.youtube_url;
            this.twitter_url = response.data.profile.twitter_url;
            this.snapchat_url = response.data.profile.snapchat_url;
            this.logo = response.data.profile.logo;
          }
        })
        .catch(function (error) {
          this.saving = false;
          this.editing = false;
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

    @media (max-width: $breakpoint-mobile) {
      flex-direction: column;
    }
  }
}

.logo-container {
  padding: 32px;

  img {
    height: 160px;
  }

  .social-links {
    @media (max-width: $breakpoint-mobile) {
      display: flex;
    }
  }

  .social-link {
    height: 32px;
    display: flex;
    color: white;
    margin: auto;

    a {
      display: flex;
      color: white;

      p {
        margin: auto;

        @media (max-width: $breakpoint-mobile) {
          display: none;
        }
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
