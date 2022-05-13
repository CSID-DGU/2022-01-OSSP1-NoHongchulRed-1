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
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 380,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: 500,
  },
  media: {
    maxheight: 300,
  }
});

export default function SearchResultCard({thumbnail, title, authors, publisher, datetime, contents}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia 
          component="img"
          alt="Contemplative Reptile"
          height= "100%"
          width= "100%"
          image={thumbnail}
          title="book"
        />

      </CardActionArea>
      
      <div className={classes.content}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="h3">
            저자: {authors}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="h3">
            출판사: {publisher}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="h3">
            출판년도: {datetime}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {contents}
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          독후감 작성
        </Button>
        <Button size="small" color="primary">
          독후감 모아보기
        </Button>
      </CardActions>
      </div>
    </Card>
  );
}