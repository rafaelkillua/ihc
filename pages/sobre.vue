<template>
    <v-container grid-list-md>
        <v-layout align-center justify-center row wrap="">
            <v-flex xs12 sm8 md4>
                <v-card class="v-layout-item v-size-50 v-small-size-100">
                    <v-card-title primary-title>
                        <div class="headline">Sobre</div>
                    </v-card-title>
                    <v-card-text>{{welcome}}</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            welcome: "Este é o sobre! Em breve teremos mais dados!"
        };
    }
};
</script>
