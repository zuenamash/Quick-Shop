
const cartContainer = document.querySelector('.shopping-container');
const itemDisplay = document.querySelector('.list-container');
const displayImage = document.querySelector('.display-image');
const displayHeading = document.querySelector('.display-heading');
const displayParagraph = document.querySelector('.display-paragraph');
const displayPrice = document.querySelector('.display-price');
const inputComment = document.querySelector('.input-comment');
const form = document.querySelector('form');
const left = document.querySelector('.left-button');
const right = document.querySelector('.right-button');
const galleryImage = document.querySelector('.gallery-image');
const title = document.querySelector('.gallery-text-title');
const subtitle = document.querySelector('.gallery-text-subtitle');
const like = document.querySelector('.like-button');
const likeCount = document.querySelector('.like-count');
const cartList = document.querySelector('.cart-list');
const List = document.querySelector('.list');
const url = 'https://fakestoreapi.com/products';

//FETCH THE PRODUCTS 
document.addEventListener('DOMContentLoaded',(event)=>{
    const fetchProducts = ()=>{
        fetch(url,{
            method:'GET',
            headers:{
                'Access-Control-Allow-Origin': 'https://fakestoreapi.com/products'
            }
        })
        .then((response)=>response.json())
        .then((data)=>showProducts(data))
        .catch((error)=>`error found:${error}`)
    }
    fetchProducts();
})

//DISPLAYS THE PRODUCTS TO THE DOM
const showProducts = (info)=>{
    info.forEach((element,index)=>{
        const div = document.createElement('div');
        div.setAttribute('class','product-image-container')
        const img = document.createElement('img');
        img.setAttribute('src',`${element.image}`);
        img.setAttribute('class','product-image');
        const icon = document.createElement('i');
        icon.setAttribute('class','bx bx-cart-alt icon bx-sm');
        displayImage.setAttribute('src',`${element.image}`);
        displayHeading.textContent = `${element.title}`;
        displayParagraph.textContent = `${element.description}`;
        displayPrice.textContent = `${element.price}`
        img.addEventListener('click',(event)=>{
            console.log('click');
            displayImage.setAttribute('src',`${element.image}`)
            displayHeading.textContent = `${element.title}`;
            displayParagraph.textContent = `${element.description}`;
            displayPrice.textContent = `$ ${element.price}`;
            setTimeout(function () {
                window.scrollTo(0, 500);
            },2);
        })
        div.append(img,icon);
        itemDisplay.appendChild(div);
    })
}


//ADDS A COMMENT BAR FUNCTIONALITY
const commentBar = ()=>{
    fetch('https://raw.githubusercontent.com/anthonykimani/Quick-Shopping-Store/master/db.json')
    .then((response)=>response.json())
    .then((data)=>{
        data.comments.forEach((element)=>{
            const listComments = document.createElement('li');
            listComments.textContent = `${element.comment}`;
            List.appendChild(listComments);
            removeComment(listComments,element.id);
        })
        form.addEventListener('submit',(event)=>{
            event.preventDefault();
            const ListItem = document.createElement('li');
            const avatar = document.createElement('i');
            const commentDiv = document.createElement('div');
            const removeBtn = document.createElement('button');
            removeBtn.setAttribute('class','remove-item');
            removeBtn.textContent = 'x';
            commentDiv.setAttribute('class','comment-div');
            avatar.setAttribute('class','bx bxs-user bx-sm');
            ListItem.textContent = inputComment.value;
            commentDiv.append(avatar,ListItem,removeBtn);
            List.append(commentDiv);
            postComment(ListItem.textContent);
            inputComment.value = '';
            removeComment(commentDiv);
        })
    })
}


//REMOVES THE COMMENTS
const removeComment = (ListItem,id)=>{
    ListItem.addEventListener('click',(event)=>{
        ListItem.remove();
        fetch('https://raw.githubusercontent.com/anthonykimani/Quick-Shopping-Store/master/db.json',{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                
            })
        })
    })
}

//ALLOWS ADDING COMMENTS TO THE DOM 
const postComment = (ListItem)=>{
    fetch('https://raw.githubusercontent.com/anthonykimani/Quick-Shopping-Store/master/db.json',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "comment":`${ListItem}`
        })
    })
}

commentBar();

//FETCHES IMAGES AND TEXT FOR SLIDESHOW
const slideshowData = ()=>{
    fetch('https://raw.githubusercontent.com/anthonykimani/Quick-Shopping-Store/master/db.json')
    .then((response)=>response.json())
    .then((data)=>slideshow(data))
}


//DISPLAYS IMAGES AND TEXT TO THE DOM
const slideshow = (info)=>{
    let i = 0;
    galleryImage.setAttribute('src',`${info.images[0].image}`);
    title.textContent = `${info.images[0].title}`
        subtitle.textContent = `${info.images[0].subtitle}`;
        left.addEventListener('click',(event)=>{
            if(i<1){
                i = 3;
            }
            i--;
            galleryImage.setAttribute('src',`${info.images[i].image}`);
            title.textContent = `${info.images[i].title}`
            subtitle.textContent = `${info.images[i].subtitle}`;
        });
        right.addEventListener('click',(event)=>{
            if(i>1){
                i = -1;
            }
            i++
            galleryImage.setAttribute('src',`${info.images[i].image}`);
            title.textContent = `${info.images[i].title}`
            subtitle.textContent = `${info.images[i].subtitle}`;
        })
}

slideshowData();


//INITIATES THE LIKE FUNCTIONALITY
const likeHandler = ()=>{
    let i = 0;
    like.addEventListener('click',(event)=>{
        if(like.textContent === '♡'){
            likeCount.textContent = `${i++} likes`
            like.textContent = '♥';
        }
        else{
            like.textContent = '♡'
        }
    })
}

likeHandler();


//ADDS AN ADD TO CART FUNCTIONALITY
const cartHandler = ()=>{
    const cartButton = document.querySelectorAll('.icon');
    cartButton.forEach((button)=>{
        button.addEventListener('click',(event)=>{
            // fetch(url)
            // .then((response)=>response.json())
            // .then((data)=>()=>{
            //     console.log(event);
            //     const cartItem = document.createElement('div');
            //     cartItem.innerHTML = `<image src="${data.element.image}" width="300"><h3>"${data.element.title}"</h3><h3>"${data.element.price}"</h3><button class="cart-element">remove</button>`;
            //     cartList.appendChild(cartItem);
            // })
        }) 
    })
}

cartHandler();
