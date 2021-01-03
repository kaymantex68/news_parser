import React from 'react';
import classes from './Post.module.css'
const Post = ({title, description, image}) => {
    return (
        <div className={classes.Post}>
            <div className={classes.Post__image} style={{backgroundImage :`url(${image})`}}></div>
            <div className={classes.Post__info}>
                <h2 className={classes.Post__title}>{title}</h2>
                <p className={classes.Post__description}>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Post;