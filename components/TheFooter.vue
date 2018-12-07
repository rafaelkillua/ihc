<template>
    <v-footer app color="primary">
        <v-container fill-height>
            <v-layout align-center justify-start>
                <v-btn flat nuxt small block to="/sobre" class="white--text mb-3">
                    <strong>SOBRE</strong>
                </v-btn>
                <v-btn flat nuxt small block to="/sac" class="white--text mb-3">
                    <strong>SAC</strong>
                </v-btn>
                <v-btn flat nuxt small block to="/ajuda" class="white--text mb-3">
                    <strong>AJUDA</strong>
                </v-btn>
            </v-layout>
            <v-layout align-center justify-end>
                <span class="white--text mb-3">
                    &copy;2018 -
                    <a
                        href="https://rafaelst.com.br"
                        target="_blank"
                        class="white--text"
                    >
                        <strong>Rafael</strong>
                    </a>
                </span>
            </v-layout>
        </v-container>
    </v-footer>
</template>
