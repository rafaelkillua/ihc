import { auth } from "~/services/fireinit";

export default context => {
    const { store } = context;

    auth.useDeviceLanguage();
    auth.onAuthStateChanged(user => {
        if (user) store.dispatch("afterLogin", user);
        else store.dispatch("carregando");
    });
};
