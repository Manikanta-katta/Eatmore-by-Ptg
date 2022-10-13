import {render,screen } from "@testing-library/react";
import Login from "../pages/Loginpage";

describe("Test the login component", () =>{
    test("render the login form with button", ()=>{
        render(<Login/>);
        // eslint-disable-next-line testing-library/await-async-query
        const buttonList = screen.findAllByRole("button");
        expect(buttonList).toHaveLength(1);
    });
})