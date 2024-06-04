import Link from "next/link"

type UiLinkParams = {
    children: string | React.ReactNode
    href: string
}

export const UiLink = ({...params}: UiLinkParams) => {
return <Link {...params} className=""></Link>
}