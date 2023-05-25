import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userArr: [
        {
            key: 1,
            name: 'John Brown',
            email: "test@gmail.com",
            phone: "0343061257",
            address: 'New York No. 1 Lake Park',
            tags: "Kích hoạt",
            description: "This is description"
        },
        {
            key: 2,
            name: 'Jim Green',
            email: "test@gmail.com",
            phone: "0972374972",
            address: 'London No. 1 Lake Park',
            tags: "Chưa kích hoạt",
            description: "This is description"
        },
        {
            key: 3,
            name: 'Joe Black',
            email: "test@gmail.com",
            phone: "0978048261",
            address: 'Sydney No. 1 Lake Park',
            tags: "Kích hoạt",
            description: "This is description"
        },
        {
            key: 4,
            name: 'The Wind',
            email: "wind@gmail.com",
            phone: "0978048261",
            address: 'Sydney No. 1 Lake Park',
            tags: "Kích hoạt",
            description: "This is description"
        },
    ],

    filterArr: [] // Mảng lọc
}

// const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);

initialState.filterArr = [...initialState.userArr]

export const userSlice = createSlice({
    name: 'ListUser',
    initialState,
    reducers: {
        // Thêm
        addUser: (state, action) => {
            state.userArr = [...state.userArr, action.payload]
            state.filterArr = [...state.filterArr, action.payload]
        },

        // Xóa
        deleteUser: (state, action) => {
            state.userArr = state.userArr.filter((item) => item.key !== action.payload)
            state.filterArr = state.filterArr.filter((item) => item.key !== action.payload)
        },

        // Sửa
        updateUser: (state, action) => {
            // const index = state.userArr.findIndex((item) => item.key === action.payload.key)
            // if (index !== -1) {
            //     state.userArr.splice(index, index, action.payload)
            // }
            state.userArr = state.userArr.map((data) => {
                if (data.key === action.payload.key) {
                    return data = action.payload
                }
                return data
            })
            state.filterArr = state.filterArr.map((data) => {
                if (data.key === action.payload.key) {
                    return data = action.payload
                }
                return data
            })
        },

        // Search
        searchUser: (state, action) => {
            const { name, tag } = action.payload;
            state.filterArr = state.userArr.filter((item) => {
                return (
                    item.name.includes(name || "") && (!tag || item.tags === tag)
                )
            })
        },

        // Reset
        resetUser: (state) => {
            // state.userArr = [...initialState.userArr, ...state.userArr.filter((item) => !initialState.userArr.some((i) => i.key === item.key))]
            state.filterArr = [...state.userArr]
            // console.log(state.filterArr)
        }
    },
})

// Action creators are generated for each case reducer function
export const { addUser, deleteUser, updateUser, searchUser, resetUser } = userSlice.actions

export default userSlice.reducer