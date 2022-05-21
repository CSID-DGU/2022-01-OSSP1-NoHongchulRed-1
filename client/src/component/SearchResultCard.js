import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 450,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: 500,
  },
  media: {
    maxHeight: 300,
  }
});

/*
  const book = {
      bookTitle: {title},
      bookAuthor: {authors},
      bookPublisher: {publisher}
    }

  //"독후감 작성" 버튼 눌렀을 때 전송될 데이터 확인용코드
  <Button size="small" color="primary" onClick = { () => {
  console.log("보낼 책 데이터를 출력해보자");
  console.log(book);
  console.log({title});
}
*/

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
            출판년도: {datetime.substr(0, 4)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {contents}
          </Typography>
        </CardContent>
      <CardActions>
        <Link to = "/EditPage" state = {{title: {title}, authors: {authors}, publisher: {publisher}}}>
        <Button size="small" color="primary">
          독후감 작성
        </Button>
        </Link>
        <Button size="small" color="primary">
          독후감 모아보기
        </Button>
      </CardActions>
      </div>
    </Card>
  );
}