<template>
  <div>
    <h1>{{ greeting }}</h1>
    <input @keyup.enter="changeName" v-model='name'></input> 
  </div> 
</template>

<script>
export default {
  data() {
    return {
      greeting: 'Howdy!',
      name: ''
    }
  },
  methods: {
    changeGreeting() {
      this.greeting = 'Hello there!'
    },
    changeName() {
      this.$emit('nameWasChanged', this.name);
    }
  }
}
</script>

<style scoped>
  h1 {
    color: red;
  }
</style>