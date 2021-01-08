import React from 'react';
import classes from './Post.module.css'
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'

const setText = text => text.length>300? text.substring(0,300)+'...': text;



const Post = ({ title, text, image,views }) => {
    return (
        <Item>
            <Item.Image src={image} />

            <Item.Content>
                <Item.Header as='a'>{title}</Item.Header>
                <Item.Description>{setText(text)}</Item.Description>
                <Item.Extra>
                    <Label icon='eye' content={views} />
                </Item.Extra>
            </Item.Content>
        </Item>





        // <div className={classes.Post}>
        //     <div className={classes.Post__image} style={{backgroundImage :`url(${image})`}}></div>
        //     <div className={classes.Post__info}>
        //         <h4 className={classes.Post__title}>{title}</h4>
        //         <p className={classes.Post__description}>{description}</p>
        //     </div>
        // </div>
    );
};

export default Post;