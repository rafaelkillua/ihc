import Vuex from "vuex";
import { auth, db, storage } from "~/services/fireinit";
import avatar from "~/static/avatar.jpg";

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            carregando: true,
            user: null,
            progressoUpload: 0,
            notificacoes: [],
            mostrarNotificacao: false,
            itens: [
                {
                    id: "1",
                    nome: "Headset Razer Kraken",
                    imagem:
                        "https://images8.kabum.com.br/produtos/fotos/76488/76488_1526584582_g.jpg",
                    descricao: "Um bonito headset, né",
                    preco: 199.99
                },
                {
                    id: "2",
                    nome: "Earphones in-ear JBL",
                    imagem:
                        "https://images-na.ssl-images-amazon.com/images/I/51Rz5q4nUNL._SY450_.jpg",
                    descricao: "Um bonito fonezinho, né",
                    preco: 99.99
                }
            ],
            carrinho: [],
            categorias: [
                "Fone de Ouvido",
                "Pen Drive",
                "WebCam",
                "Teclado",
                "Mouse",
                "Acessórios",
                "Caixas de Som",
                "Joystick"
            ]
        }),

        mutations: {
            setUser: (state, user) => {
                state.user = user;
            },

            setNotificacao: (state, notificacao) => {
                state.notificacoes.push(notificacao);
                state.mostrarNotificacao = true;
            },

            limparNotificacao: state => {
                state.notificacoes.shift();
                state.mostrarNotificacao = false;
            },

            mostrarNotificacao: state => {
                state.mostrarNotificacao = true;
            },

            setProgress: (state, progresso) => {
                state.progressoUpload = progresso;
            },

            setCarregando: state => {
                state.carregando = false;
            }
        },

        getters: {
            getLoggedUser(state) {
                return state.user;
            },

            getNotificacao(state) {
                return state.notificacoes[0];
            },

            getMostrarNotificacao(state) {
                return state.mostrarNotificacao;
            },

            getProgresso(state) {
                return state.progressoUpload;
            },

            getCarregando(state) {
                return state.carregando;
            },

            getAllItens(state) {
                return state.itens;
            },

            getCategorias(state) {
                return ["Todas"].concat(state.categorias.sort());
            }
        },

        actions: {
            redirecionar() {
                this.$router.push(
                    this.$router.history.current.query.redirect || "/"
                );
            },

            notificacao(ctx, { tipo, mensagem }) {
                const notificacao = { tipo, mensagem };
                ctx.commit("setNotificacao", notificacao);
            },

            limparNotificacao(ctx) {
                ctx.commit("limparNotificacao");
                setTimeout(() => {
                    if (ctx.state.notificacoes.length)
                        ctx.commit("mostrarNotificacao");
                }, 500);
            },
            carregando(ctx) {
                ctx.commit("setCarregando");
            },

            afterLogin(ctx, { uid, email }) {
                let usuario = {
                    uid,
                    email
                };

                const promise = () =>
                    new Promise(resolve => {
                        db.ref("perfil/" + uid).on("value", snapshot => {
                            usuario = {
                                ...usuario,
                                nome: snapshot.val().nome,
                                avatar: snapshot.val().avatar,
                                telefone: snapshot.val().telefone
                            };

                            ctx.commit("setUser", usuario);
                            resolve();
                        });
                    });

                promise().then(() => {
                    ctx.dispatch("notificacao", {
                        tipo: "success",
                        mensagem: usuario.nome + " logado com sucesso!"
                    });
                    ctx.dispatch("redirecionar");
                    ctx.commit("setCarregando");
                });
            },

            signUp(ctx, { email, senha, nome, telefone }) {
                return auth
                    .createUserWithEmailAndPassword(email, senha)
                    .then(() => {
                        db.ref("perfil/" + auth.currentUser.uid).set({
                            nome,
                            telefone,
                            avatar
                        });
                    });
            },

            login(ctx, { email, senha }) {
                return auth.signInWithEmailAndPassword(email, senha);
            },

            logout(ctx) {
                auth.signOut()
                    .then(() => {
                        ctx.commit("setUser", null);
                        ctx.dispatch("notificacao", {
                            tipo: "success",
                            mensagem: "Deslogado com sucesso!"
                        });
                        ctx.dispatch("redirecionar");
                    })
                    .catch(erro =>
                        ctx.dispatch("notificacao", {
                            tipo: "error",
                            mensagem:
                                "Erro ao deslogar: (" +
                                erro.code +
                                ") " +
                                erro.message
                        })
                    );
            },

            async editProfile(ctx, { nome, telefone, avatar }) {
                let avatarURL = null;

                if (avatar) {
                    await ctx
                        .dispatch("uploadAvatar", avatar)
                        .then(url => (avatarURL = url))
                        .catch(erro =>
                            ctx.dispatch("notificacao", {
                                tipo: "error",
                                mensagem:
                                    "Erro ao fazer upload de avatar: (" +
                                    erro.code +
                                    ") " +
                                    erro.message
                            })
                        );
                }

                const novoPerfil = { nome, telefone };
                if (avatarURL) novoPerfil.avatar = avatarURL;

                return db
                    .ref("perfil/" + auth.currentUser.uid)
                    .update(novoPerfil)
                    .then(() => {
                        ctx.dispatch("notificacao", {
                            tipo: "success",
                            mensagem: "Perfil editado com sucesso!"
                        });
                        ctx.dispatch("redirecionar");
                    });
            },

            uploadAvatar(ctx, avatar) {
                return new Promise((resolve, reject) => {
                    const uploadTask = storage
                        .ref("avatar/" + auth.currentUser.uid)
                        .put(avatar);
                    uploadTask.on(
                        "state_changed",
                        snapshot => {
                            let progresso =
                                (snapshot.bytesTransferred /
                                    snapshot.totalBytes) *
                                100;
                            ctx.commit("setProgress", progresso);
                        },
                        erro => reject(erro),
                        () => {
                            uploadTask.snapshot.ref
                                .getDownloadURL()
                                .then(url => {
                                    resolve(url);
                                });
                        }
                    );
                });
            },

            recuperarEmail(ctx, email) {
                return auth.sendPasswordResetEmail(email);
            }
        }
    });
};

export default createStore;
