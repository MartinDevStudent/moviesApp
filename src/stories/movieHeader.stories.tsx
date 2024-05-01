import type { Meta, StoryObj } from '@storybook/react';
import ShowHeader from "../components/showHeader";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";

import React from 'react';

const meta = {
    title: "Movie Details Page/MovieHeader",
    component: ShowHeader,
    decorators: [
        (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    ],
} satisfies Meta<typeof ShowHeader>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: {
        ...SampleMovie
    }
};
Basic.storyName = "Default";