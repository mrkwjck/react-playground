import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import Dashboard from "./Dashboard";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const root = createRoot(document.getElementById('root')!)
const queryClient = new QueryClient()

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Dashboard />
        </QueryClientProvider>
    </StrictMode>
)
