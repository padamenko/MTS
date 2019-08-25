<template>
  <div class="game">
    <div class="name">{{ game.name }}</div>
    <div class="logo">
      <img :src="game.img" alt="" class="img">
    </div>
    <div class="lastupdate">Дата последнего обновления: {{ getDate(game.lastupdate) }}</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'Game',
  data () {
    return {
			game: []
    }
	},
	computed: {
    currentId: function () {
      let id = location.hash.substr(1);
      return 'http://localhost:3000/games/' + id
    }
	},
	mounted() {
    this.getGame()
	},
	methods: {
		getGame() {
			axios
				.get(this.currentId)
				.then(response => (this.game = response.data));
    },
    getDate(date){
      let updateDate = new Date(date);
      let dateString = updateDate.getDate() + '.' + (updateDate.getMonth() + 1) + '.' + updateDate.getFullYear();
      return dateString
    }
	}
}
</script>

<style scoped>
.game{
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}
.name{
  font-size: 26px;
  margin-bottom: 20px;
}
.logo{
  margin-bottom: 20px;
  line-height: 0;
}
.img{
  max-width: 200px;
}
.lastupdate{
  font-size: 16px;
}
</style>
