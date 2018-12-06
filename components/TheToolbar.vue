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
                class="white--text"
            >{{ title }}</v-btn>
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
                <v-icon left>{{rota.icone}}</v-icon>
                {{rota.nome}}
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
    props: ["title", "rotas", "toggleDrawer"],

    computed: {
        rotasToolbar() {
            return this.rotas.filter(rota => !rota.drawerOnly);
        }
    }
};
</script>
