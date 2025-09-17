import {usePathname} from "next/navigation";
import {siteConfig} from "@/config/site.config";

const PageContent = () => {
    const pathname = usePathname()
    const pageContent = siteConfig.pagesContent[pathname as keyof typeof siteConfig.pagesContent]
    if (!pageContent) {
        return <div>Страница не найдена</div>
    }
    return (<p>{pageContent.content}</p>)
}

export default PageContent;