import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { expect, test, vi, describe } from "vitest";
import store from "../store/store";
import Inbox from "./Inbox";
import { BrowserRouter } from "react-router";
import * as SendMailAPI from "../API/SendMail";

// Mock the entire API module to prevent real network calls
vi.mock("../API/SendMail");

describe("Inbox Component", () => {

    test("renders 'Inbox' heading", () => {
        SendMailAPI.getMail.mockResolvedValue({ ok: true, data: null });
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Inbox />
                </Provider>
            </BrowserRouter>
        );
        const headingElement = screen.getByRole('heading', { name: /inbox/i });
        expect(headingElement).toBeInTheDocument();
    });

    test("renders mail icons when API returns emails", async () => {
        const mockMails = {
            'mail1': { id: 'mail1', subject: 'Test Mail 1', isRead: false },
            'mail2': { id: 'mail2', subject: 'Test Mail 2', isRead: true },
        };
        SendMailAPI.getMail.mockResolvedValue({ ok: true, data: mockMails });

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Inbox />
                </Provider>
            </BrowserRouter>
        );

        const mailIcons = await screen.findAllByTestId("mail-icon");

        expect(mailIcons[0]).toBeInTheDocument();
    });
});
