import { useNavigate, useSearchParams } from "@solidjs/router";

type AuthType = "login" | "register";

export function AuthPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const authType = searchParams.type as AuthType ?? "login";


    return (
        <>
        </>
    );
}