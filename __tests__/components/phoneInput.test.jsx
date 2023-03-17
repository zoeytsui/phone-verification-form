
import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PhoneInput from "../../components/input-phone";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import userSlice from "../../store/userSlice";

const ReduxProvider = ({ children, reduxStore }) => (
    <Provider store={reduxStore}>{children}</Provider>
)

describe("Home page", () => {
    it("verify valid phone number",()=>{
        const store = configureStore({reducer: userSlice})
        const wrapper = ({children})=>(
            <ReduxProvider reduxStore={store}>
                {children}
            </ReduxProvider>
        )
        const {result} = renderHook(()=>{
            const dispatch = useDispatch()
        },{wrapper})

        render(<PhoneInput />)

        const input = screen.getByTestId('phone-input')
        const button = screen.getByTestId('phone-verify')
        fireEvent.change(input,{target:{value:"51234567"}})
        button.click()
        expect(input).toHaveTextContent("51234567")
    })

    it("verify invalid phone number",()=>{
        render(<PhoneInput />)
        const input = screen.getByTestId('phone-input')
        const button = screen.getByTestId('phone-verify')
        fireEvent.change(input,{target:{value:"12345678"}})
        button.click()
        expect(input).toHaveTextContent("12345678")
    })
})