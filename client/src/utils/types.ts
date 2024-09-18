import { ReactNode } from 'react';

export type InputProps = {
    title: string,
    id: string,
    onChange: ({name, value}: {name: string, value: string}) => void,
    placeholder?: string,
    options?: string[]
}
export type ClientType = {
    name: string,
    mainLanguage: string,
    secondaryLanguage: string,
    dateOfBirth: string,
    fundingSource: string
}
export interface ClientResponse extends ClientType {
    id: number
}
export type FormSectionProps = {title: string, description: string, children: ReactNode}

export type ButtonProps = {
    type?: "button" | "submit" | "reset"
    onClick?: () => void,
    children: ReactNode,
    disabled?: boolean
}