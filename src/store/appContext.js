import React, { createContext, useReducer } from 'react';
// {* estructura y funciones de flux en este appcontext*};

    export const AppContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
    message: null,
    demo: [
        { title: "FIRST", background: "white", initial: "white" },
        { title: "SECOND", background: "white", initial: "white" }
    ]
};

const actions = {
    exampleFunction: (dispatch) => {
        return () => {
            // Cambiar color del primer elemento del array 'demo'
            dispatch({ type: 'CHANGE_COLOR', payload: { index: 0, color: 'green' } });
        };
    },
    getMessage: async (dispatch) => {
        try {
            const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
            const data = await resp.json();
            dispatch({ type: 'SET_MESSAGE', payload: data.message });
            return data;
        } catch (error) {
            console.log("Error loading message from backend", error);
        }
    },
    changeColor: (dispatch) => {
        return (index, color) => {
            dispatch({ type: 'CHANGE_COLOR', payload: { index, color } });
        };
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload, isAuthenticated: true };
        case 'LOGOUT':
            return { ...state, user: null, isAuthenticated: false };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        case 'CHANGE_COLOR':
            const demo = state.demo.map((item, i) => {
                if (i === action.payload.index) {
                    return { ...item, background: action.payload.color };
                }
                return item;
            });
            return { ...state, demo: demo };
        default:
            return state;
    }
}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Envolver las acciones para que reciban el dispatch
    const boundActions = {};
    for (let key in actions) {
        boundActions[key] = actions[key](dispatch);
    }

    return (
        <AppContext.Provider value={{ state, actions: boundActions }}>
            {children}
        </AppContext.Provider>
    );
};
