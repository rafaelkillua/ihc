<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card>
                <v-card-title class="title">Carrinho</v-card-title>

                <v-flex xs12 v-if="carrinho.length > 0">
                    <v-list two-line>
                        <div v-for="item in carrinho" :key="item.id">
                            <v-list-tile avatar>
                                <v-list-tile-avatar>
                                    <v-img :src="item.imagem"/>
                                </v-list-tile-avatar>

                                <v-list-tile-content>
                                    <v-list-tile-title v-html="item.nome"></v-list-tile-title>
                                    <v-list-tile-sub-title v-html="item.descricao"></v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-spacer/>

                                <v-list-tile-content>
                                    <span>Quantidade: {{item.quantidadeCarrinho}}</span>
                                </v-list-tile-content>

                                <v-list-tile-content>
                                    <span>Valor: R$ {{item.preco}}</span>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-list-tile-action-text v-if="item.id == 1">Adicionar</v-list-tile-action-text>
                                    <v-btn icon ripple @click="aumentarQuantidade(item.id)">
                                        <v-icon color="success">add</v-icon>
                                    </v-btn>
                                </v-list-tile-action>

                                <v-list-tile-action>
                                    <v-list-tile-action-text v-if="item.id == 1">Remover</v-list-tile-action-text>
                                    <v-btn icon ripple @click="diminuirQuantidade(item.id)">
                                        <v-icon color="error">remove</v-icon>
                                    </v-btn>
                                </v-list-tile-action>

                                <v-list-tile-action>
                                    <v-list-tile-action-text v-if="item.id == 1">Apagar</v-list-tile-action-text>
                                    <v-btn icon ripple @click="removerDoCarrinho(item.id)">
                                        <v-icon color="error">delete</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>

                            <v-divider v-if="item.id < carrinho.length" inset="true"></v-divider>
                        </div>
                    </v-list>
                </v-flex>

                <v-flex xs12 v-else>
                    <strong class="title">Não há itens no carrinho, vai adicionar!</strong>
                </v-flex>
            </v-card>
        </v-flex>

        <v-flex xs12>
            <v-layout row wrap>
                <v-flex xs12 sm6>
                    <v-card>
                        <v-card-title class="title">Frete</v-card-title>
                        <v-card-text>
                            <v-layout>
                                <v-flex xs12>
                                    <v-text-field placeholder="CEP"></v-text-field>
                                    <span>Valor: R$ 0</span>
                                    <br>
                                    <strong>Frete grátis para Norte e Nordeste!</strong>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-flex>

                <v-flex xs12 sm6>
                    <v-card>
                        <v-card-title class="title">Checkout</v-card-title>
                        <v-card-text>
                            <span>Total dos itens: {{precoTotal}}</span>
                            <br>
                            <span>Frete: R$ 0.00</span>
                            <br>
                            <strong>Total: {{precoTotal}}</strong>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                flat
                                nuxt
                                to="checkout"
                                color="orange"
                                :disabled="precoTotal === 0"
                            >
                                <v-icon>check</v-icon>Checkout
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    computed: {
        carrinho() {
            return this.$store.getters.getCarrinho;
        },

        precoTotal() {
            return this.$store.getters.getCarrinho.reduce(
                (anterior, item) =>
                    anterior + item.preco * item.quantidadeCarrinho,
                0
            );
        }
    },

    methods: {
        removerDoCarrinho(itemID) {
            this.$store.dispatch("removerDoCarrinho", itemID);
        },

        aumentarQuantidade(itemID) {
            this.$store.dispatch("aumentarQuantidade", itemID);
        },

        diminuirQuantidade(itemID) {
            this.$store.dispatch("diminuirQuantidade", itemID);
        }
    }
};
</script>

