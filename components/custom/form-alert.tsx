import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


export function FormAlert(Title: string, Description: string) {
    return(
        <Alert>
            <AlertTitle>{Title}</AlertTitle>
            <AlertDescription>{Description}</AlertDescription>
        </Alert>
    )
}