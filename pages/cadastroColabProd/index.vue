<template>
    <v-layout justify-center row wrap>
        <v-flex xs12 md6>
            <v-card>
                <v-card-title class="headline">Cadastro de Produto</v-card-title>

                <v-card-text>
                    <v-card flat tile class="d-flex">
                        <button>
                            <v-img
                                src="https://via.placeholder.com/200"
                                aspect-ratio="1"
                                max-height="200"
                                contain
                            >
                                <v-layout
                                    slot="progress"
                                    fill-height
                                    align-center
                                    justify-center
                                    ma-0
                                >
                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                </v-layout>
                            </v-img>
                        </button>
                    </v-card>
                    <input ref="input" type="file" accept="image/*">
                    <v-form ref="form" lazy-validation>
                        <v-text-field
                            label="Nome"
                            required
                            counter="30"
                            prepend-icon="label"
                            type="text"
                            name="nome"
                            autocomplete="name"
                        />
                        <v-text-field
                            label="Descrição"
                            required
                            prepend-icon="description"
                            type="text"
                            name="descricao"
                        />
                        <v-text-field
                            label="Valor"
                            name="valor"
                            required
                            prepend-icon="attach_money"
                            type="number"
                        />
                        <v-select
                            :items="categorias"
                            prepend-icon="category"
                            placeholder="Selecionar categoria"
                        />
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer/>
                    <v-btn flat color="orange">Cadastrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>

        <v-flex xs12 md6>
            <v-card>
                <v-card-title class="headline">Cadastro de Funcionário</v-card-title>

                <v-card-text>
                    <v-select
                        :items="funcionariosSelect"
                        prepend-icon="person"
                        placeholder="Selecionar funcionário"
                    />
                    <v-select
                        :items="funcoes"
                        prepend-icon="category"
                        placeholder="Selecionar função"
                    />
                </v-card-text>

                <v-card-actions>
                    <v-spacer/>
                    <v-btn flat color="orange">Cadastrar</v-btn>
                </v-card-actions>
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
            funcionarios: [
                {
                    nome: "Rafael",
                    email: "email_rafael@gmail.com"
                },
                {
                    nome: "Helder",
                    email: "email_helder@gmail.com"
                }
            ],

            funcoes: ["ADMIN", "GERENTE", "VENDEDOR", "OUTROS"]
        };
    },

    computed: {
        funcionariosSelect() {
            return this.funcionarios.map(
                func => func.nome + " <" + func.email + ">"
            );
        },

        categorias() {
            const cats = this.$store.getters.getCategorias;
            cats.splice(0, 1);
            return cats;
        }
    }
};
</script>

<style scoped>
form {
    margin: 20px;
}

input[type="file"] {
    position: absolute;
    left: -99999px;
}
</style>
