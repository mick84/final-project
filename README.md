# CUDE - car undercover dealer exposition

## Purpose: help potential car buyers expose undercover dealers

## Story:

You are looking for some used car to buy, but only from private seller. You find it and contact the seller. The seller gives you info about the car and about himself : his ID, and ,if he is not the owner, also owner's ID. You fill the corresponding form on the site, and then you will get from our DB partial information about every car sale deal, in which the seller and the owner(if they are not the same) were involved.

#### Response structure: the seller profile with deal records and chance, that he is undercover dealer

#### Each seller's deal record shown in our site will include: deal date, brand, model and production year

### Point:

You will see all the record dates. If the seller is private person, who honestly tries to sell the car, you will not probably find out, that he, or the car owner, sold more than 2 other cars in the past every few months. If this is the case, so the seller is the potential undercover dealer.

### How this data will be accumulated:

#### After buying the car, fill the form on our site, which will include:

- seller ID
- owner ID(if not the same)
- car license with your data filled, for later verification
  **Your ID will be added to the form data automatically**

#### Conditions:

_must think about it_

After sending this form, provided document will be verified versus official government API. If it passes verification, your record will be successfully added to our data base
Otherwise, **your user profile data will be added to the blacklist, and your account will be deleted**  
 In any case, you will get a proper email message with all needed data provided

## Pages:

- Home
- About
- log in
- sign up
- look for seller: authentication needed
- post car deal: authentication needed
- feedbacks: read: free, write/edit/delete: authentication needed
- Optional - articles: read: free, w/e/d: authentication needed

### User profile:

- passport ID: (in Israel:9-digit) unique required
- e-mail: unique required
- password: strong required
- user name : unique required
- avatar: optional
  _At login: username and password required. JWT authentication will be used_
