<template>
  <div class="profile">
    <StripeCheckout
      ref="checkoutRef"
      pk="pk_test_51IXzZ1HfGkYzo1kqXdmETsXtFVJHnBz9Fx4kFxBdm4sW5qVQUJW61fjWs2ppM5w2Ep779xDI5j4EMYimlS7VGvvY00yx2gYEDt"
      :sessionId="sessionId"
    />
    <div class="profile-container" v-if="!errorMessage && !notFound">
      <img :src="logo" alt="" />
      <p class="entertainer-name">{{ entertainer_name }}</p>
      <p class="entertainer-heading">{{ headline }}</p>

      <div class="button-container">
        <button v-if="!isCustom" v-on:click="createPayment(2)">$2</button>
        <button v-if="!isCustom" v-on:click="createPayment(5)">$5</button>
        <button v-if="!isCustom" v-on:click="isCustom = !isCustom">
          Custom
        </button>
        <div v-if="isCustom" class="input-container">
          <p>$</p>
          <input type="number" placeholder="Donation Amount" />
        </div>
        <button v-if="isCustom">Donate</button>
      </div>
    </div>

    <div class="profile-container" v-if="errorMessage">
      <p class="error-text">{{ errorMessage }}</p>
    </div>

    <not-found-component v-if="notFound"></not-found-component>
  </div>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import NotFoundComponent from "../components/NotFoundComponent.vue";

export default {
  name: "TipUser",
  data: function () {
    return {
      entertainer_name: "",
      headline: "",
      logo: "",

      sessionId: "",

      errorMessage: "",

      isCustom: false,
      notFound: false,
    };
  },
  components: {
    StripeCheckout,
    NotFoundComponent,
  },
  methods: {
    createPayment: function (value) {
      var formData = new FormData();
      formData.append("value", value);
      formData.append("user", this.$route.params.id);

      this.axios
        .post(this.$hostname + "api/create-payment/", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.error != null) {
            this.errorMessage = response.data.error;
          }
          if (response.data.client_secret.id != null) {
            this.sessionId = response.data.client_secret.id;
            this.$refs.checkoutRef.redirectToCheckout();
          } else {
            this.errorMessage = "Something went wrong...";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted: function () {
    this.$nextTick(() => {
      let app = this;
      this.axios
        .get(
          this.$hostname + "api/fetch-profile/" + this.$route.params.id + "/",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.error != null) {
            this.errorMessage = response.data.error;
          } else {
            if (response.data.profile != null) {
              this.entertainer_name = response.data.profile.entertainer_name;
              this.headline = response.data.profile.headline;
              this.logo = response.data.profile.logo;
            }
          }
        })
        .catch(function (error) {
          console.log(error);
          app.notFound = true;
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
  border-radius: 8px;

  @media (max-width: $breakpoint-mobile) {
    width: 80%;
    padding: 18px;
  }

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

  .button-container {
    display: grid;
    grid-template: 1fr / 1fr 1fr 1fr;
    margin-top: 32px;

    button {
      height: 44px;
      margin-left: 8px;
      margin-right: 8px;
      border-radius: 20px;
      border: 2px $primary_light solid;
      font-weight: bold;
      color: $primary;
      cursor: pointer;

      &:focus {
        outline: 0;
      }
    }

    .input-container {
      @extend button;
      text-align: center;
      overflow: hidden;
      grid-column: 1 / span 2;
      display: flex;
      background-color: white;
      height: 40px;

      input {
        flex-grow: 1;
        background-color: clear;
        border: none;
        color: $primary;
        padding-left: 8px;
        padding-right: 8px;
        font-weight: bold;

        &:focus {
          outline: 0;
        }
      }

      p {
        width: 24px;
        color: $primary;
        margin: auto;
        margin-left: 20px;
        text-align: center;
      }
    }
  }
}
</style>
