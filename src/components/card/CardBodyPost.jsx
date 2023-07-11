
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

export default function CardPost( {title = "Nuevo", handlePost, handleEmpty , children} ) {
    return (
      <Card  className="ml-4 mt-4"  >
        <CardContent className="flex flex-col">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {children}
        </CardContent>
        <CardActions>
          <Button variant="text" onClick={handleEmpty}>
            Clear
          </Button>
          <Button variant="outlined" onClick={handlePost}>
            Agregar
          </Button>
        </CardActions>
      </Card>
    );
}