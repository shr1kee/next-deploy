"use client"

import {Button} from "@heroui/react";
import Link from "next/link";

const NotFoundPage = () => {
    return (<div>
        <div className="pt-6">
            <Button as={Link} color="primary" variant="shadow" href="/">
                На главную
            </Button>
        </div>
    </div>)
}

export default NotFoundPage;