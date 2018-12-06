<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm4>
                <v-card>
                    <v-card-text>Teste</v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm8>
                <v-card>
                    <v-card-text>
                        <v-container grid-list-sm>
                            <v-layout row wrap>
                                <v-flex xs12 sm6 v-for="item in itens" :key="item.id">
                                    <v-card>
                                        <v-img
                                            class="white--text"
                                            height="200px"
                                            :src="item.imagem"
                                        >
                                            <v-container fill-height fluid>
                                                <v-layout fill-height>
                                                    <v-flex xs12 align-end flexbox>
                                                        <span class="headline">{{item.nome}}</span>
                                                    </v-flex>
                                                </v-layout>
                                            </v-container>
                                        </v-img>
                                        <v-card-title>
                                            <div>
                                                <span>R$ {{item.preco}}</span>
                                                <br>
                                                <span>{{item.descricao}}</span>
                                            </div>
                                        </v-card-title>
                                        <v-card-actions>
                                            <v-btn
                                                flat
                                                nuxt
                                                :to="'item/' + item.id"
                                                color="orange"
                                            >Visualizar</v-btn>
                                            <v-btn
                                                flat
                                                @click="addCarrinho(item)"
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
    data() {
        return {
            itens: [
                {
                    id: "1",
                    nome: "Headset",
                    imagem: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
                    descricao: "ue",
                    preco: 99.99
                }
            ]
        };
    }
};
</script>
