<template>
  <div class="area">
    <h2 v-if="area.district" v-text="area.district" />
    <div class="box-container">
      <div class="box-info">
        <h3>Have your parents 'round for a cuppa?</h3>
        <p>{{ area.restrictions.meet_indoors }}</p>
      </div>
      <div class="box-info">
        <h3>Bit of grouse shooting?</h3>
        <p>{{ area.restrictions.meet_outdoors }}</p>
      </div>
    </div>
    <div class="box-container">
      <div class="box-info">
        <h3>Meet the lads at the pub?</h3>
        <p>{{ area.restrictions.meet_in_pub }}</p>
      </div>
      <div class="box-info">
        <h3>Home by 10 pm?</h3>
        <p>{{ area.restrictions.time_restrictions }}</p>
      </div>
    </div>
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
.box-container {
  display: flex;
}
.box-info {
  width: 50%;
  border: 4px solid white;
  border-radius: 15px;
  margin: 5px;
}
</style>
