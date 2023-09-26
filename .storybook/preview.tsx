import type { Preview } from "@storybook/react";
import "../src/styles.css";
import "tailwindcss/tailwind.css";
import React from "react";

import { AppProvider } from "../src/providers/AppProvider";

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/
            }
        }
    }
};

export default preview;

export const decorators = [
    (Story) => (
        <AppProvider>
            <Story />
        </AppProvider>
    )
];
