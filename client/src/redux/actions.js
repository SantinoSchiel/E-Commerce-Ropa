import axios from "axios";
// import Swal from "sweetalert2";
import {
    GET_PRODUCTS
} from "./action-types";

const URL_API = import.meta.env.VITE_URL_API;

export const getProducts = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${URL_API}/products`);
            dispatch({
                type: GET_PRODUCTS,
                payload: data
            });
        } catch (error) {
            console.log(error)
            // Swal.fire({
            //     title: "Error",
            //     text: `Error al cargar los colaboradores. ${error.message}`,
            //     icon: "error",
            //     timer: "3000",
            //     confirmButtonColor: "rgb(187, 131, 43)",
            //   });
        }
    }
}