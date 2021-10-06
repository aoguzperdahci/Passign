const getRememberMe = () => {
    var state = localStorage.getItem("rememberMeState");
    var usename = "";
    var token = "";
    if (state) {
        usename = localStorage.getItem("rememberMeUsername");
        token = localStorage.getItem("rememberMeToken");
    } else {
        state = false;
    }
    return {state: state, username: usename, token: token};
}

export default {
    records: [],
    recordsVisible: [],
    login: {
        state: false,
        id: "",
        authorization: "",
    },
    rememberMe: getRememberMe(),
    encryptionKey: "",
    editMode: false,
    updateLoading: false,
    loginErrorMessage: "",
    updateErrorMessage: "",
}

