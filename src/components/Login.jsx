import pkg from "@material-tailwind/react";
const {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} = pkg;
export function LoginCard() {
    return (
        <Card className="w-96">
            <CardHeader
                variant="gradient"
                color="gray"
                className="mb-4 grid h-28 place-items-center"
            >
                <Typography variant="h3" color="white">
                    Login
                </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
                <Input label="Email" size="lg" />
                <Input label="Contraseña" size="lg" />
                <div className="-ml-2.5">
                    <Checkbox label="Recuerdame" />
                </div>
            </CardBody>
            <CardFooter className="pt-0">
                <Button variant="gradient" fullWidth>
                    Ingresar
                </Button>
                <Typography variant="small" className="mt-6 flex justify-center">
                    ¿No tienes una cuenta?
                    <Typography
                        as="a"
                        href="#signup"
                        variant="small"
                        color="blue-gray"
                        className="ml-1 font-bold"
                    >
                        Registrate
                    </Typography>
                </Typography>
            </CardFooter>
        </Card>
    );
}