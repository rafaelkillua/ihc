<template>
    <v-content v-if="carregando">
        <v-container fluid fill-height text-xs-center grid-list-md>
            <v-layout align-center justify-center wrap>
                <v-flex xs12>
                    <v-progress-circular indeterminate color="#f79813"></v-progress-circular>
                </v-flex>
                <v-flex xs12>
                    <h3>Aguenta um pouco que vai...</h3>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
    <v-app v-else>
        <TheDrawer :user="user" :rotas="rotas" :drawer="drawer" @toggleDrawer="drawer = $event"/>
        <TheToolbar :toggleDrawer="toggleDrawer" :title="title" :rotas="rotas"/>
        <v-content>
            <v-container fluid fill-height text-xs-center>
                <nuxt/>
            </v-container>
        </v-content>
        <v-snackbar
            v-model="snackbarShow"
            :color="notificacao ? notificacao.tipo : 'info'"
            :bottom="true"
            :multi-line="true"
            :timeout="3000"
            @click="snackbarShow = false"
        >{{notificacao ? notificacao.mensagem : "????"}}</v-snackbar>
        <TheFooter/>
    </v-app>
</template>

<script>
import TheFooter from "~/components/TheFooter";
import TheDrawer from "~/components/TheDrawer";
import TheToolbar from "~/components/TheToolbar";

export default {
    components: { TheFooter, TheDrawer, TheToolbar },

    data: () => ({
        title: "E-LETRONIC",
        drawer: false,
        snackbarShow: false
    }),

    computed: {
        user() {
            return this.$store.getters.getLoggedUser;
        },

        notificacao() {
            return this.$store.getters.getNotificacao;
        },

        mostrarNotificacao() {
            return this.$store.getters.getMostrarNotificacao;
        },

        carregando() {
            return this.$store.getters.getCarregando;
        },

        rotas() {
            let rotas = [];
            rotas.push({
                nome: "Início",
                icone: "home",
                caminho: "/",
                drawerOnly: true
            });

            if (this.user.email === "rafael_killua@msn.com") {
                rotas.push({
                    nome: "Admin",
                    icone: "person",
                    caminho: "/cadastroColabProd"
                });
            }

            if (this.user) {
                rotas.push(
                    {
                        nome: "Contas",
                        icone: "description",
                        caminho: "/contas"
                    },
                    { nome: "Perfil", icone: "person", caminho: "/perfil" },
                    {
                        nome: "Logout",
                        icone: "exit_to_app",
                        caminho: "/",
                        dispatch: "logout"
                    }
                );
            } else {
                rotas.push(
                    {
                        nome: "Cadastrar-se",
                        icone: "person_add",
                        caminho: "/cadastro"
                    },
                    { nome: "Login", icone: "person", caminho: "/login" }
                );
            }

            rotas.push({
                nome: "Carrinho",
                icone: "shopping_cart",
                caminho: "/carrinho"
            });
            return rotas;
        }
    },

    methods: {
        toggleDrawer(value) {
            this.drawer = value;
        }
    },

    watch: {
        mostrarNotificacao(value) {
            if (value) this.snackbarShow = value;
        },

        snackbarShow(value) {
            if (!value) this.$store.dispatch("limparNotificacao");
        }
    }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Krub");

html {
    font-family: "Krub", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}

a,
a:link {
    text-decoration: none;
    color: white;
}
</style>
