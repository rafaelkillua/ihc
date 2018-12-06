<template>
    <v-layout justify-center row wrap>
        <v-flex xs12 md6>
            <v-card>
                <v-card-title class="headline">Contas a pagar</v-card-title>

                <v-card-text>
                    <v-list-tile avatar v-for="conta in contasReceber" :key="'receber_' + conta.id">
                        <v-list-tile-avatar>
                            <v-icon>description</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>{{conta.titulo}}</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>RS {{conta.valor}}</v-list-tile-action>
                    </v-list-tile>
                </v-card-text>
            </v-card>
        </v-flex>

        <v-flex xs12 md6>
            <v-card>
                <v-card-title class="headline">Contas a pagar</v-card-title>

                <v-card-text>
                    <v-list-tile avatar v-for="conta in contasPagar" :key="'pagar_' + conta.id">
                        <v-list-tile-avatar>
                            <v-icon>description</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>{{conta.titulo}}</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>RS {{conta.valor}}</v-list-tile-action>
                    </v-list-tile>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import needAuth from "~/middleware/needAuth";

export default {
    middleware: needAuth,

    data() {
        return {
            contasPagar: [
                {
                    id: 1,
                    titulo: "Pedido 123223",
                    data: "05/12/2018",
                    valor: 99.99
                }
            ],

            contasReceber: [
                {
                    id: 1,
                    titulo: "Pedido 654645",
                    data: "01/12/2018",
                    valor: 49.99
                },
                {
                    id: 2,
                    titulo: "Pedido 988786",
                    data: "02/12/2018",
                    valor: 79.99
                }
            ]
        };
    }
};
</script>
