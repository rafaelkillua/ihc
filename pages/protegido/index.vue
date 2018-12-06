<template>
    <v-layout align-center justify-center>
        <v-flex xs12>
            <h1>PÁGINA PROTEGIDA PELO CABO DACIOLO</h1>
        </v-flex>
    </v-layout>
</template>

<script>
import needAuth from "~/middleware/needAuth";

export default {
    middleware: needAuth
};
</script>
