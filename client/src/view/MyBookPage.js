import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components'; //CSS-IN_JS
import { FormControl } from '@material-ui/core';

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
//import itemData from './itemData';
import image from '../image/bookImg1.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    maxWidth: 300,
    height: 500,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const Wrapper = styled.div`
    width: 70rem;
    margin: 2rem auto;
    border-radius: 4px;
    background-color: var(--white-color);
    padding: 0.5rem 0.5rem 2rem;
    overflow: hidden;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

/**
 * The example data is structured as follows:
 *
 * import image from '../image/BookImg1.png';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
 const itemData = [
    {
      img: image,
      title: '책제목',
    },
   {
        img: image,
        title: '책제목',
    },
    {
        img: image,
        title: '책제목',
    },
    {
        img: image,
        title: '책제목',
    }
];
export default function MyBookPage() {
  const classes = useStyles();

  return (
    <Wrapper>
    <div className={classes.root}>
      <ImageList 
        rowHeight={200} 
        className={classes.imageList} 
        cols={2} 
        style ={{width: '100%'}}
        sx={{backgroundColor: "red"}}
      >
        <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
        <center><ListSubheader component="div">December</ListSubheader></center>
        </ImageListItem>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img src={item.img} alt={item.title} />
            <ImageListItemBar
              title={item.title}
              actionIcon={
                <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
    </Wrapper>
  );
}
//subtitle={<span>by: {item.author}</span>}