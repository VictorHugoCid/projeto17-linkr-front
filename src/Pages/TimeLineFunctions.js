import getConfig from "../Services/getConfig.js";
import { useContext } from "react";
import GlobalContext from "../contexts/globalContext.js";
import { deletePost } from "../Services/api";

function AxiosDeletePost(postId, token) {

    const { deleteScreen, setDeleteScreen } = useContext(GlobalContext);

    deletePost(postId, getConfig(token))
        .then(() => window.location.reload(false))
        .catch((error) => console.log('error axiosDeletePost', error))
    setDeleteScreen({postId: '', status: false})
}

export {
    AxiosDeletePost,
}