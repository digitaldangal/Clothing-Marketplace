# Clothing Marketplace

This application will serve as way to connect emerging streetwear brands directly to the customers. 
Web App that could be utilize as an online wardrobe / closet to help create a visual representation of a person's clothing collection
<!-- ![armoire image](./public/splashimage.png) -->

## Installation 

## The Making of AppName

### Wireframes

## Technical Discussion

<!-- Front-end:
- HTML, CSS, Bootstrap

Back-end:
- Node.js, Express, PostgreSQL -->

### Code Snippet
<!-- - This code snippet is how I am able to either return all outfits or return certain outfits that belong to a user.

```javascript
const Outfits = {
    findAll: (userid)=>{
        return db.query(`
        select o.*,c.* , o.name as outfitName, o.id as outfitId from clothes c inner join outfits o on c.id = o.top_id WHERE o.userid = $1 union all
        select o.*,c.* , o.name as outfitName, o.id as outfitId from clothes c inner join outfits o on c.id = o.bottom_id WHERE o.userid = $1 union all
        select o.*,c.* , o.name as outfitName, o.id as outfitId  from clothes c inner join outfits o on c.id = o.shoe_id WHERE o.userid = $1
        `,[userid])
    },
}
``` -->

## App Structure

## Opportunities for Future Growth 