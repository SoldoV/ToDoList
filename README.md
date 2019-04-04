# To do list

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See setup for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
npm install -g @vue/cli
npm i node
```
## Implementation
Used: Vue.js (Vue CLI 3.x., Element UI Library), Node.js(Express), HTML, CSS(SASS)

Description:
Two tables containing items.
First table is to do list, second is done list.
To transfer items you can click the checkbox or simply drag and drop.
You can: add new items, edit items, delete items, delete entire done table items, upload image on a specific item.

## Project frontend setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Run your tests
```
npm run test
```
### Lints and fixes files
```
npm run lint
```

## Project backend setup

First navigate to server folder.

### Run node
node app.js

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).





## API documentation

**Get data**
----
  Returns table data.

* **URL**

http://localhost:3000  

* **Method:**

  `GET`
  


**Edit item name**
----
  Edits the name of an item in to do table.

* **URL**

http://localhost:3000/edit  

* **Method:**

  `POST`
  
*  **Payload example**
{ item:"eat", id:2 }



**Add item**
----
  Adds an item in the to do table.

* **URL**

http://localhost:3000/add  

* **Method:**

  `POST`
  
*  **Payload example**
{ item:"eat", id:2, done:false }



**Drag and drop**
----
  Updates table order according to the changes made by drag and drop.

* **URL**

http://localhost:3000/dragAndDrop  

* **Method:**

  `POST`
  
*  **Payload example**
[{item: 'Create to do list',id: 0,done: true,image: false,src: ""},{item: 'Do the miracle',id: 1,done: false,image: false,src: ""}]



**Post image**
----
    Posts an image source to backend

* **URL**

http://localhost:3000/image  

* **Method:**

  `POST`
  
*  **Payload example**
{ id:2, src:"/image.jpg" }



**Checkmark**
----
    Changes data after click on checkmark

* **URL**

http://localhost:3000/checkmark  

* **Method:**

  `POST`
  
*  **Payload example**
{ id:2 }



**Delete one item**
----
    Deletes one item from table

* **URL**

http://localhost:3000/deleteItem  

* **Method:**

  `DELETE`
  
*  **Payload example**
{ id:2 }



**Delete all items**
----
    Deletes all items from table done

* **URL**

http://localhost:3000/deleteAllDone  

* **Method:**

  `delete`
  
*  **Payload example**
none



## Author

* **Vinko Soldo** - (https://github.com/SoldoV)

