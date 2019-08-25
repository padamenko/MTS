<template>
  <div class="games">
    <a :href="getLink(index)" class="game" v-for="(game, index) in games" :key="index">
      <div class="image">
        <img :src="game.img" alt="" class="img">
      </div>
      <div class="name">{{ game.name }}</div>
      <div class="update">Дата последнего обновления: {{ getDate(game.lastupdate) }}</div>
      <div class="description">{{ game.description }}</div>
    </a>
    <div class="addGameButton" @click="showAddGame">Добавить игру</div>
    <div class="addGame" v-if="showAddBlock">
      <div class="back" @click="showAddGame"></div>
      <div class="form">
        <form @submit="postGame">
          <div class="block">
            <label class="label" for="name">Имя:</label>
            <input class="input" id="name" type="text" placeholder="Введите имя игры" v-model="name" required>
          </div>
          <div class="block">
            <label class="label" for="description">Описание:</label>
            <input class="input" id="description" type="text" placeholder="Введите описание игры" v-model="description">
          </div>
          <div class="block">
            <button class="button" type="submit" :disabled="isFormValid">Добавить</button>
          </div>
          <div v-if="errors.length">
            <b>Пожалуйста исправьте указанные ошибки:</b>
            <ul>
              <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'GamesList',
  data () {
    return {
      games: [],
      errors: [],
      name: null,
      description: null,
      showAddBlock: false
    }
	},
	computed: {
    isFormValid() {
      let valid = this.name ? false : true
      return valid
    },
    curentDate() {
      return Date.now()
    }
	},
	mounted() {
    this.getGames()
	},
	methods: {
    showAddGame() {
      this.showAddBlock = this.showAddBlock ? false : true
    },
		getGames() {
			axios
				.get('http://localhost:3000/games')
				.then(response => (this.games = response.data));
    },
    postGame: function (e) {
      if (this.name) {
        axios
        .post('http://localhost:3000/games/',
          {
            name: this.name,
            description: this.description,
            img: "/static/images/logo.png",
            lastupdate: this.curentDate
          }
        )
        .then(response => {
          this.games = response.data
          this.showAddGame()
        })
        .catch(e => {
          this.errors.push(e)
        });
      }
      this.errors = [];
      if (!this.name) {
        this.errors.push('Требуется указать имя.');
      }
      e.preventDefault();
    },
    getDate(date){
      let updateDate = new Date(date);
      let dateString = updateDate.getDate() + '.' + (updateDate.getMonth() + 1) + '.' + updateDate.getFullYear();
      return dateString
    },
    getLink(id){
      let link = 'game/#' + id;
      return link
    }
	}
}
</script>

<style scoped>
.games{
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-wrap: wrap;
}
.addGameButton{
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  width: 250px;
  margin: 15px;
  vertical-align: top;
  text-align: center;
  border: solid 1px #000;
  box-sizing: border-box;
  padding: 34px;
  position: relative;
  color: #615d5d;;
  font-size: 30px;
}
.game{
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  width: 250px;
  margin: 15px;
  vertical-align: top;
  text-align: left;
  border: solid 1px #000;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
}
.game:hover .description{
  opacity: 1;
}
.image{
  line-height: 0;
  text-align: center;
  margin-bottom: 15px;
}
.img{
  width: 100%;
  max-width: 200px;
}
.name{
  font-size: 18px;
  padding-bottom: 10px;
  color: #615d5d;
}
.update{
  color: #000;
  font-size: 12px;
}
.description{
  display: block;
  opacity: 0;
  transition: opacity 100ms ease-in-out;
  box-sizing: border-box;
  padding: 15px;
  background: rgba(0,0,0,0.5);
  color: #ffffff;
  font-size: 14px;
  position: absolute;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
}
.addGame{
  position: fixed;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
}
.back{
  position: absolute;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1;
}
.form{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left:-150px;
  margin-top: -200px;
  width: 400px;
  height: 300px;
  padding: 20px;
  border-radius: 5px;
  background: #ffffff;
  z-index: 2;
}
.block{
  margin-bottom: 10px;
}
.label{
  font-size: 15px;
  margin-bottom: 5px;
}
.input{
  width: 100%;
  height: 25px;
  font-size: 16px;
  padding: 5px;
}
.button{
  width: 100px;
  height: 35px;
  font-size: 15px;
  background: green;
  color: white;
  font-weight: bold;
}
.button:disabled{
  background: gray;
}
</style>
