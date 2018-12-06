<template>
    <v-navigation-drawer app v-model="drawerChild" absolute temporary>
        <v-list class="pa-1">
            <v-list-tile avatar @click="$router.push(user ? '/perfil' : '/login')">
                <v-list-tile-avatar>
                    <img :src="user ? user.avatar : '/avatar.jpg'">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{user ? user.nome : 'Cadastre-se ou faça login!'}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <v-list-tile
                v-for="rota in rotas"
                :key="rota.nome"
                nuxt
                :to="rota.dispatch ? null : rota.caminho"
                @click="rota.dispatch ? $store.dispatch(rota.dispatch) : false"
                class="black--text"
            >
                <v-list-tile-action>
                    <v-icon>{{rota.icone}}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ rota.nome }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    props: ["user", "rotas", "drawer"],

    data() {
        return {
            drawerChild: null
        };
    },

    watch: {
        drawer(value) {
            this.drawerChild = value;
        },

        drawerChild(value) {
            this.$emit("toggleDrawer", value);
        }
    }
};
</script>
