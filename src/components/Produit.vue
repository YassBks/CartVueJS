<template>
  <div class="Produit" v-if="exist && infos"> 
	<button class="effacer" @click="modal = !modal;">x</button>
	<img :src="infos.images[0].xsmall" >
	<div class="texte">
		<div class="prix">{{infos.price.base.amount * quantite}}  €</div>
		<div class="nom">{{infos.name}}</div>
		<span> Qté
		<select id="quantite" name="quantite" v-model="quantite">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
			<option value="10">10</option>

		</select></span>
	</div>
	<div id="myModal" class="modal" v-show="modal">
		<div class="modal-content">
			<span class="close" @click="modal = !modal;">&times;</span>
			<p>Etes vous sur de vouloir supprimer cette article ?</p>
			<div class="supprimer" @click="handleDelete"> Supprimer </div>
		</div>
	</div>
  </div>
</template>

<script>

export default {
  name: 'Produit',
  props: {
    infos: {
		type: Object,
		required: true
       }
  },
  data () {
		return {
			exist: 'true',
			modal:false,
			quantite: this.infos.qty
		};
  },
	watch: {
		quantite: {
			handler (val, oldVal) {
				if (val !== oldVal && oldVal) {
					this.$emit('change', val, oldVal, this.infos.price.base.amount);
				}
			},
			immediate: true
		}
	},
  created () {
		this.$emit('change', this.quantite, null, this.infos.price.base.amount);
  },
	methods: {
		handleDelete() {
			this.modal = false; 
			this.$emit('change', -this.quantite, null, this.infos.price.base.amount);
			this.exist = false;
		}
	}
}
</script>

<style scoped>
	.Produit {
		position: relative;
		display:flex;
	}
	.texte {
		padding: 8px;
	}

	.prix {
		color: #d01345;
		font-weight: 600;
	}
	.nom {
		padding: 8px 0;
	}
	.effacer {
		position: absolute;
		top: 0;
		right: 0;
		text-decoration: none;
		border: none;
		background-color: white;
		font-weight: 700;
		cursor: pointer;
		font-size: 1.15em;   
	}
	.supprimer {
		display: block;
		background: #018849;
		color: #fff;
		letter-spacing: 1.9px;
		max-width: 100%;
		text-decoration: none;
		font-size: .875em;
		text-transform: uppercase;
		border: none;
		font-weight: 700;
		padding: 1em;
		margin-top: 24px;
		cursor: pointer;
	}

	.modal {
	position: fixed; 
	z-index: 1; 
	left: 0;
	top: 0;
	width: 100%; 
	height: 100%; 
	overflow: auto; 
	background-color: rgb(0,0,0); 
	background-color: rgba(0,0,0,0.4); 
	}

	
	.modal-content {
	background-color: #fefefe;
	margin: 15% auto; 
	padding: 20px;
	border: 1px solid #888;
	width: 80%; 
	}

	
	.close {
	color: #aaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
	}

	.close:hover,
	.close:focus {
	color: black;
	text-decoration: none;
	cursor: pointer;
	}
</style>
