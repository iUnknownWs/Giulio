import pkg from "@material-tailwind/react";
const { Card, CardHeader, CardBody, CardFooter, Typography, Avatar, Tooltip, } = pkg;

export function BlogCard(props) {
  const date = new Date(props.date);
  const dt = date.toLocaleDateString("en-GB");
  return (
    <Card className="max-w-[24rem] overflow-hidden">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img
          src={props.img}
          alt={props.alt}
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray">
          {props.title}
        </Typography>
        <Typography variant="lead" color="gray" className="mt-3 font-normal">
          {props.description}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
          <Tooltip content={props.name}>
            <Avatar
              size="sm"
              variant="circular"
              alt={props.name}
              src={props.avatar}
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
        </div>
        <Typography className="font-normal">{dt}</Typography>
      </CardFooter>
    </Card>
  );
}