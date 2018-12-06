<template>
    <v-footer app color="primary">
        <v-container fill-height>
            <v-layout align-center justify-start>
                <v-btn flat nuxt to="/sobre" class="white--text">
                    <strong>SOBRE</strong>
                </v-btn>
                <v-btn flat nuxt to="/sac" class="white--text">
                    <strong>SAC</strong>
                </v-btn>
                <v-btn flat nuxt to="/ajuda" class="white--text">
                    <strong>AJUDA</strong>
                </v-btn>
            </v-layout>
            <v-layout align-center justify-end>
                <span class="white--text">
                    &copy;2018 -
                    <a
                        href="https://rafaelst.com.br"
                        target="_blank"
                        class="white--text"
                    >
                        <strong>Rafael Sampaio Tavares</strong>
                    </a>
                </span>
            </v-layout>
        </v-container>
    </v-footer>
</template>
