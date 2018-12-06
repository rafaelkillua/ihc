<template>
    <v-layout row>
        <v-flex xs12>
            <v-stepper v-model="step">
                <v-stepper-header>
                    <v-stepper-step :complete="step > 1" step="1">Endereço</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="step > 2" step="2">Pagamento</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="step > 3" step="3">Revisão</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="4">Confirmação</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card class="mb-5" height="200px">
                            <v-card-text>Dados de endereço...</v-card-text>
                        </v-card>

                        <v-btn flat nuxt to="/carrinho">Voltar</v-btn>

                        <v-btn color="primary" @click="step = 2">Continuar</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card class="mb-5" height="200px">
                            <v-card-text>Dados de Pagamento...</v-card-text>
                        </v-card>

                        <v-btn flat>Voltar</v-btn>

                        <v-btn color="primary" @click="step = 3">Continuar</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-card class="mb-5" height="200px">
                            <v-card-text>Revisão...</v-card-text>
                        </v-card>

                        <v-btn flat>Voltar</v-btn>

                        <v-btn
                            color="primary"
                            @click="() => {if (limparCarrinho()) step = 4}"
                        >Concluir!</v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="4">
                        <v-card class="mb-5" height="200px">
                            <v-card-text>Compra confirmada!</v-card-text>
                        </v-card>

                        <v-btn color="primary" nuxt to="/">Voltar à página inicial</v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-flex>
    </v-layout>
</template>

<script>
import needAuth from "~/middleware/needAuth";

export default {
    middleware: needAuth,

    data() {
        return {
            step: 0
        };
    },

    methods: {
        limparCarrinho() {
            if (window.confirm("Deseja mesmo finalizar a compra?")) {
                this.$store.commit("limparCarrinho");
                return true;
            } else {
                return false;
            }
        }
    }
};
</script>
