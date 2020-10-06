<template>
  <div id="app">
    <form @submit.prevent="getRestrictions">
      <input
        type="text"
        v-model="thepostcode"
        id="thepostcode"
        placeholder="Enter a postcode"
      />
    </form>
    <h2 v-if="default_restrictions">Here are the default restrictions!</h2>
    <AreaInfo v-bind:area="area" />
    <h3 class="error" v-if="error">{{ error }}</h3>
    <img class="lockdown-gif" :src="gif" />
  </div>
</template>

<script>
import AreaInfo from "./components/AreaInfo.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    AreaInfo,
  },
  data() {
    return {
      area: {
        id: "",
        postcode: "",
        district: "",
        restrictions: {
          meet_in_pub: "Yes",
          meet_indoors: "Yes",
          meet_outdoors: "Yes",
          time_restrictions: "No",
        },
      },
      default_restrictions: true,
      error: "",
      thepostcode: "",
      gif: "",
    };
  },
  methods: {
    getRestrictions() {
      axios
        .post("http://localhost:3000/areainfo", {
          postcode: this.thepostcode.replace(/ /g, ""),
        })
        .then((res) => {
          if (res.data.error) {
            this.error = res.data.error;
            this.default_restrictions = true;
            this.area.id = "";
            this.area.district = "";
            this.area.restrictions = {
              meet_in_pub: "Yes",
              meet_indoors: "Yes",
              meet_outdoors: "Yes",
              time_restrictions: "No",
            };
            return;
          }
          this.area.id = res.data.area_id;
          this.area.district = res.data.area_name;
          this.area.restrictions = res.data.area_restrictions;
          this.default_restrictions = false;
          this.error = null;
        });
    },

    getLockdownGif() {
      axios
        .get("http://localhost:3000/lockdowngif")
        .then((res) => {
          let url = res.data.url;
          this.gif = url;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getLockdownGif();
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.error {
  color: #ef3838;
  text-decoration: underline;
  padding: 5px;
}
body {
  background: #005eb8;
  color: white;
}
.lockdown-gif {
  display: block;
  margin: 10px;
  height:auto;
  max-width:100%;
}
input#thepostcode {
    text-align: center;
    padding: 5px 10px;
    text-transform: uppercase;
    display: block;
    max-width: 100%;
    width: 20em;
    border: 3px solid #00A9CE;
}
</style>
