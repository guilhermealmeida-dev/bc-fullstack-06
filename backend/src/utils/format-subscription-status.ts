export function formatSubscriptionStatus(aproved: boolean | null): string {
    switch (aproved) {
        case true:
            return "Aprovado";
            break;
        case false:
            return "Pendente"
            break;
        default:
            return "Não inscrito";
            break;
    }
}