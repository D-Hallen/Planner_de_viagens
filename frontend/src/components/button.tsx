import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps} from 'tailwind-variants'

const buttonVariants = tv({
    base: 'rounded-lg px-5 font-medium flex items-center gap-2 justify-center',
    variants: {
        bType: {
            primary: 'bg-yellow-400 text-stone-950 hover:bg-yellow-500',
            secondary: 'bg-stone-800 text-stone-200 hover:bg-stone-700'
        },

        size: {
            default:'py-2',
            full: 'w-full h-11'
        },
    },

    defaultVariants: {
        bType: 'primary',
        size: 'default'
    }
}) 

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants>{
    children: ReactNode
}

export function Button ({children, bType, size, ...props}:ButtonProps) {
     return (
        <button {...props} className={buttonVariants({bType, size}) }>
            {children}
        </button>
     )
}