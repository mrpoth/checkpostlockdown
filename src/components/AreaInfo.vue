<template>
  <div class="area">
    <h2 v-if="area.district" v-text="area.district"/>
    <h3>Have your parents 'round for a cuppa?</h3>
    <p> {{area.restrictions.meet_indoors}}</p>
    <h3>Bit of grouse shooting?</h3>
    <p> {{area.restrictions.meet_outdoors}}</p>
    <h3>Meet the lads at the pub?</h3>
    <p> {{area.restrictions.meet_in_pub}}</p>
    <h3>Home by 10 pm?</h3>
    <p> {{area.restrictions.time_restrictions}}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: ["area"],
  data() {
    return {
      disabled: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.area p {
  margin: 0.5em;
}
.area h3 {
  margin: 0.5em;
}
</style>
