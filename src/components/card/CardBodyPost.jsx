
import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

export default function CardPost( {title = "Nuevo", handlePost, handleEmpty , children} ) {
    return (
      <Card sx={{ marginLeft: 1, marginTop: 1 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <h2>{title}</h2>
          {children}
        </CardContent>
        <CardActions>
          <Button variant="outlined" onClick={handlePost}>
            Agregar
          </Button>
          <Button variant="text" onClick={handleEmpty}>
            Clear
          </Button>
        </CardActions>
      </Card>
    );
}