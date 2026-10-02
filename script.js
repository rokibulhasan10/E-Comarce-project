const products=[
{id:1,name:"Classic Cotton T-Shirt",category:"fashion",price:18,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",desc:"Comfortable everyday cotton t-shirt."},
{id:2,name:"Wireless Headphones",category:"electronics",price:45,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",desc:"Comfortable wireless headphones for music and calls."},
{id:3,name:"Canvas Backpack",category:"accessories",price:28,image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",desc:"Lightweight backpack for study and travel."},
{id:4,name:"Minimal Desk Lamp",category:"home",price:32,image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",desc:"Simple modern lamp for your desk."},
{id:5,name:"Smart Watch",category:"electronics",price:60,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",desc:"Stylish smartwatch with everyday tracking features."},
{id:6,name:"Casual Sneakers",category:"fashion",price:52,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",desc:"Comfortable sneakers for daily use."},
{id:7,name:"Leather Wallet",category:"accessories",price:22,image:"https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=80",desc:"Compact wallet with a clean design."},
{id:8,name:"Ceramic Mug",category:"home",price:12,image:"https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=700&q=80",desc:"Minimal ceramic mug for tea and coffee."}
];

let cart=JSON.parse(localStorage.getItem("shopnestCart")||"[]");

function card(p){
return `<div class="col-sm-6 col-lg-4"><div class="product-card">
<img src="${p.image}" alt="${p.name}"><div class="product-info">
<small class="text-muted text-capitalize">${p.category}</small><h5 class="mt-1">${p.name}</h5>
<p class="price mb-2">$${p.price.toFixed(2)}</p>
<div class="d-flex gap-2"><a href="product-detail.html?id=${p.id}" class="btn btn-outline-dark btn-sm">Details</a>
<button class="btn btn-dark btn-sm" onclick="addToCart(${p.id})">Add to Cart</button></div>
</div></div></div>`;
}

function loadProducts(id,limit){
let el=document.getElementById(id); if(!el)return;
let list=limit?products.slice(0,limit):products;
el.innerHTML=list.map(card).join("");
}

function filterProducts(cat,btn){
document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
document.getElementById("productGrid").innerHTML=products.filter(p=>cat==="all"||p.category===cat).map(card).join("");
}

function addToCart(id){
let p=products.find(x=>x.id===id);let item=cart.find(x=>x.id===id);
item?item.qty++:cart.push({...p,qty:1});saveCart();updateCartCount();alert(p.name+" added to cart!");
}

function saveCart(){localStorage.setItem("shopnestCart",JSON.stringify(cart))}
function updateCartCount(){let el=document.getElementById("cartCount");if(el)el.textContent=cart.reduce((a,b)=>a+b.qty,0)}
function showCart(){
let html=cart.length?cart.map(x=>`<div class="d-flex justify-content-between border-bottom py-2"><span>${x.name} × ${x.qty}</span><b>$${(x.price*x.qty).toFixed(2)}</b></div>`).join(""):"Your cart is empty.";
let box=document.getElementById("cartItems");if(box)box.innerHTML=html;
let total=cart.reduce((a,b)=>a+b.price*b.qty,0);let t=document.getElementById("cartTotal");if(t)t.textContent=total.toFixed(2);
let modal=document.getElementById("cartModal");if(modal)new bootstrap.Modal(modal).show();
}

function showProductDetail(){
let id=Number(new URLSearchParams(location.search).get("id"))||1,p=products.find(x=>x.id===id)||products[0];
document.getElementById("productDetail").innerHTML=`<div class="row g-5 align-items-center">
<div class="col-md-6"><img src="${p.image}" class="detail-img" alt="${p.name}"></div>
<div class="col-md-6"><small class="text-uppercase text-muted">${p.category}</small><h1>${p.name}</h1>
<p class="fs-3 fw-bold">$${p.price.toFixed(2)}</p><p class="text-muted">${p.desc}</p>
<button class="btn btn-dark btn-lg" onclick="addToCart(${p.id})">Add to Cart</button>
<a href="products.html" class="btn btn-outline-dark btn-lg ms-2">Back</a></div></div>`;
}
updateCartCount();

document.addEventListener("DOMContentLoaded",()=>{
let form=document.getElementById("contactForm");
if(form)form.addEventListener("submit",e=>{e.preventDefault();alert("Thank you! Your message has been submitted.");form.reset();});
});
