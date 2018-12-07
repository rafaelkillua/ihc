<template>
    <v-toolbar app color="primary">
        <v-toolbar-side-icon class="hidden-md-and-up white--text" @click="toggleDrawer"></v-toolbar-side-icon>
        <v-toolbar-title ripple>
            <v-btn
                to="/"
                nuxt
                depressed
                flat
                active-class="default-class"
                large
                block
                class="white--text"
            >
                <v-icon left dark>headset</v-icon>
                {{ title }}
            </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn
                flat
                v-for="rota in rotasToolbar"
                :to="rota.dispatch ? null : rota.caminho"
                nuxt
                :key="rota.nome"
                @click="rota.dispatch ? $store.dispatch(rota.dispatch) : null"
                class="white--text"
            >
                <v-badge left v-if="rota.icone === 'shopping_cart'" color="info">
                    <span slot="badge" v-if="rota.icone === 'shopping_cart'">{{tamanhoCarrinho}}</span>
                    <v-icon left>{{rota.icone}}</v-icon>
                </v-badge>
                <v-icon left v-else>{{rota.icone}}</v-icon>
                {{rota.nome}}
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
    props: ["title", "rotas", "toggleDrawer", "tamanhoCarrinho"],

    computed: {
        rotasToolbar() {
            return this.rotas.filter(rota => !rota.drawerOnly);
        }
    }
};
</script>
