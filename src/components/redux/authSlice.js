import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    token: localStorage.getItem('token'),
    role: localStorage.getItem("role"),
    name: localStorage.getItem("name"),
    error: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.error = undefined
            state.loading = true
            state.name = undefined
            state.role = undefined
            state.token = undefined

            localStorage.removeItem("token")
            localStorage.removeItem("role")
            localStorage.removeItem("name")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            const payload = action.payload
            state.token = payload.token
            state.name = payload.user.name
            state.role = payload.user.role

            localStorage.setItem("token", payload.token)
            localStorage.setItem("name", payload.user.name)
            localStorage.setItem("role", payload.user.role)

            state.error = undefined
            state.loading = false
        })
        builder.addCase(loginThunk.rejected, (state, action) => {
            const payload = action.payload

            state.error = payload.message
            state.loading = false
        })
    }
})

export const loginThunk = createAsyncThunk("logThunk", async (data, { rejectWithValue }) => {
    const { username, password } = data

    try {
        const result = await fetch('https://192.168.1.247:3000/auth', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const json = await result.json()
        if (result.status === 400) {
            return rejectWithValue(json)
        }
        return json
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message)
    }
})

// Action creators are generated for each case reducer function
export const { logOut } = authSlice.actions

export default authSlice.reducer