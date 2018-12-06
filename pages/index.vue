<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-text class="pa-5">
                        <strong class="display-3">Bem vindo ao E-letronic!</strong>
                        <br>
                        <span class="display-1">Uma loja online de artigos eletrônicos!</span>
                        <br>
                        <span class="subtitle">Finge que tem um banner bem massa de fundo...</span>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm4>
                <v-card>
                    <v-card-title class="title">
                        <v-icon left>search</v-icon>Pesquisar
                    </v-card-title>
                    <v-card-text>
                        <v-text-field v-model="pesquisa"></v-text-field>
                    </v-card-text>

                    <v-card-title class="title">
                        <v-icon left>category</v-icon>Categorias
                    </v-card-title>
                    <v-card-text>
                        <v-select :items="categorias" v-model="categoria"></v-select>
                    </v-card-text>

                    <v-card-title class="title">
                        <v-icon left>filter_list</v-icon>Filtros
                    </v-card-title>
                    <v-card-text>
                        <strong>
                            <v-icon left>attach_money</v-icon>Preço:
                        </strong>

                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-range-slider v-model="preco" :max="1000" :min="0" :step="5"></v-range-slider>
                            </v-flex>

                            <v-flex shrink xs6>
                                <v-text-field
                                    v-model="preco[0]"
                                    class="mt-0"
                                    hide-details
                                    single-line
                                    prefix="R$"
                                    type="number"
                                ></v-text-field>
                            </v-flex>

                            <v-flex shrink xs6>
                                <v-text-field
                                    v-model="preco[1]"
                                    class="mt-0"
                                    hide-details
                                    single-line
                                    prefix="R$"
                                    type="number"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm8>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <v-layout row wrap>
                                <v-flex xs12 sm6 v-for="item in itens" :key="item.id">
                                    <v-card>
                                        <v-img
                                            class="white--text"
                                            height="200px"
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
                                            <v-btn
                                                flat
                                                nuxt
                                                :to="'item/' + item.id"
                                                color="orange"
                                            >Visualizar</v-btn>
                                            <v-spacer/>
                                            <v-btn
                                                flat
                                                @click="adicionarAoCarrinho(item.id)"
                                                color="orange"
                                            >
                                                <v-icon>add</v-icon>Carrinho
                                            </v-btn>
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
            pesquisa: "",
            categoria: "Todas",
            preco: [0, 1000]
        };
    },

    computed: {
        itens() {
            return this.$store.getters.getAllItens.filter(item =>
                item.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
            );
        },

        categorias() {
            return this.$store.getters.getCategorias;
        }
    },

    methods: {
        adicionarAoCarrinho(itemID) {
            this.$store.dispatch("adicionarAoCarrinho", itemID);
        }
    }
};
</script>
