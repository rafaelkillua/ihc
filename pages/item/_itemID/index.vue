<template>
    <v-container grid-list-md>
        <v-layout row>
            <v-flex xs12>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-card>
                                        <v-img
                                            class="white--text"
                                            height="500px"
                                            contain
                                            :src="item.imagem"
                                        />
                                        <v-card-text>
                                            <div>
                                                <span class="headline">{{item.nome}}</span>
                                                <br>
                                                <strong class="title">R$ {{item.preco}}</strong>
                                                <br>
                                                <span>{{item.descricao}}</span>
                                            </div>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer/>
                                            <v-btn
                                                flat
                                                @click="adicionarAoCarrinho(item.id)"
                                                color="orange"
                                            >Adicionar ao Carrinho</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    computed: {
        item() {
            return this.$store.getters.getAllItens.find(
                item => item.id === this.$route.params.itemID
            );
        }
    },

    methods: {
        adicionarAoCarrinho(itemID) {
            this.$store.dispatch("adicionarAoCarrinho", itemID);
        }
    }
};
</script>
