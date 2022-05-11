import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function SearchResultCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="170"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            책제목: Lizard
          </Typography>
          <Typography gutterBottom variant="h7" component="h3">
            저자: Lizard
          </Typography>
          <Typography gutterBottom variant="h7" component="h3">
            출판사: Lizard
          </Typography>
          <Typography gutterBottom variant="h7" component="h3">
            출판년도: Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            책소개: Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          독후감 작성
        </Button>
        <Button size="small" color="primary">
          독후감 모아보기
        </Button>
      </CardActions>
    </Card>
  );
}