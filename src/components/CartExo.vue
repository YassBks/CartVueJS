<template>
  <div class="cart-js">
    <div class="Panier">
		<div class="titre"> Mon Panier</div>
		<div class="vide" v-if="prixProduits === 0">Votre panier est vide</div>
		<div v-for="(product,index) in products" :key="index">
			<Produit :infos="product" @change="majPrix"/> 
		</div>
	</div>
	<div class="paiement">
		<div class="recap"> <span class="titre">Total</span> <span class="totalPrix">{{ prixTotal}} €</span></div>
		<div>
			<span class="sousTitre">Sous-total</span><span class="prix">{{ prixProduits }} €</span>
		</div>
		<div>
			<span class="sousTitre">Livraison</span><span class="prix">{{ prixProduits === 0 ?  '0  €' : prixLivraison}}</span>
		</div>
		<select class="selectLivraison" name="livraison" id="livraison" v-model="prixLivraison" :disabled="prixProduits === 0">
			<option :value="3.00">Livraison standard en point relais (3,00 €)</option>
			<option :value="3.95">Livraison standard (3,95 €)</option>
			<option :value="10">Livraison 24h (10,00 €)</option>
		</select>

		<button>Paiement</button>
	</div>
  </div>
</template>

<script>
import Produit from './Produit.vue';
var data = require('@/assets/mocked.json');

export default {
  name: 'cartJs',
  components: {
    Produit
  },
  data () {
		return {
			prixLivraison: 3.00,
			products: data.products,
			prixProduits: 0
		};
  },
  computed: {
		prixTotal () {
			if(this.prixProduits === 0) {
				return 0;
			} else {
				return this.prixProduits + this.prixLivraison;
			}
		}
  },
  methods: {
		majPrix (quantite, ancienneQuantite, prix) {
			if (typeof(quantite) !== 'object') {
				if(ancienneQuantite){
					console.log(quantite, ancienneQuantite, prix);
					let dif = quantite - ancienneQuantite;  
					this.prixProduits += prix * dif;
				} else {
					console.log("icvi", quantite, prix);
					this.prixProduits += prix * quantite;
				}
			}
			
		}
  }
}
</script>

<style scoped>
.cart-js {
	display: flex;
    align-items: baseline;
    padding-right: 30%;
}

.Panier {
	padding: 12px;
    background-color: white;
	min-width: 460px;
}
.vide {
	text-align: center;
}
.titre {
	margin: 0;
    font-size: 1.15em;    
    font-style: normal;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    line-height: 2em;
}

.paiement {
	display: grid;
	margin-left: 10px;
    padding: 12px;
    background-color: white;
}
.sousTitre {
	letter-spacing: 2px;
	font-weight: 700;
	font-size: 1.15em;   
	float: left;
}
.recap {
	margin-bottom: 8px;
}
.totalPrix {
	float: right;
	font-weight: 700;
	letter-spacing: 1.9px;
	font-size: 1.5em;
	color: #d01345;
}

.prix {
	float: right;
	font-size: 1.15em;  
}

button {
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

button:hover {
	background: #006637;
}

.selectLivraison {
	margin-top: 12px;
}
</style>
