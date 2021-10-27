const getRememberMe = () => {
    var state = localStorage.getItem("rememberMeState");
    state = (state === "true");
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

var initialState = {
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
    searchText: "",
    snackbar:{
        show: false,
        message:"",
        color:""
    },
    loginLoading: false,
    updateLoading: false
};

export default initialState;

