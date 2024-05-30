"use client"
import { NextUIProvider } from "@nextui-org/react";
import NavBar from "@/app/components/NavBar";
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export function Providers({children}) {
    return (
        <Provider store={store}>
            <NextUIProvider>
                <div className="h-screen">
                    <NavBar />
                    <div className="h-4.5/5">
                        {children}
                    </div>
                </div>
            </NextUIProvider>
        </Provider>
    )
}