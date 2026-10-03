import React,{useMemo,useState} from "react";
import{createRoot}from"react-dom/client";
import{Search,Menu,X,Phone,MapPin,ChevronRight,Truck,Store,Flame,PartyPopper,Mail,Facebook,Instagram,Clock,Heart,Plus,Minus,ArrowLeft}from"lucide-react";
import"./src.css";

const IMG={
hero1:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85",
hero2:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=85",
hero3:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85",
wedding:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85",
tools:"https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?auto=format&fit=crop&w=1200&q=85",
landscape:"https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=85",
contractor:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85",
party:"https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=1200&q=85",
tent:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
bounce:"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=85",
machine:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=85"
};

const products=[
{slug:"gold-medal-two-bowl-frozen-drink-slushee-machine",name:"Gold Medal Two Bowl Frozen Drink Slushee Machine",price:"$175.00",img:IMG.machine,cat:"Concession"},
{slug:"twister-display-dunk-tank",name:"Twister Display Dunk Tank",price:"$175.00",img:IMG.party,cat:"Games"},
{slug:"bounce-house-with-slide",name:"Bounce House with Slide",price:"$275.00",img:IMG.bounce,cat:"Inflatables"},
{slug:"eureka-30x30-twin-tube-frame-tent",name:"Eureka 30x30 Twin Tube Frame Tent",price:"$1,150.00",img:IMG.tent,cat:"Tents/Canopies"},
{slug:"60-x-60-single-center-pole-tent",name:"60' x 60' Single Center Pole Tent",price:"$3,500.00",img:IMG.wedding,cat:"Tents/Canopies"},
{slug:"40ft-x-100ft-twin-tube-plus-frame-tent",name:"40ft X 100ft Twin Tube Plus Frame Tent",price:"$4,200.00",img:IMG.hero2,cat:"Tents/Canopies"},
{slug:"eureka-20x20-traditional-party-canopy",name:"Eureka 20x20 Traditional Party Canopy",price:"$200.00",img:IMG.party,cat:"Tents/Canopies"},
{slug:"white-resin-folding-chair",name:"White Resin Folding Chair",price:"$4.50",img:IMG.wedding,cat:"Furniture"}
];

const categories=[
["Party & Event Rentals",IMG.party,"party-event"],
["Do It Yourself Rentals",IMG.tools,"do-it-yourself"],
["Contractor Rentals",IMG.contractor,"contractor"],
["Landscaping Rentals",IMG.landscape,"landscaping"],
["Wedding Rentals",IMG.wedding,"wedding"]
];

const catFilters=["Audio/Visual Equipment","Buffet","Concession","Cooking Equipment","Crowd Control","Dance Floors","Décor","Furniture","Games","Generators","Heating/Cooling","Inflatables","Linens","Pipe & Drape","Staging","Tabletop","Tents/Canopies"];

function route(){
 const p=location.pathname;
 if(p.startsWith("/products/"))return{type:"product",slug:p.split("/")[2]};
 if(p.startsWith("/collections/"))return{type:"collection",slug:p.split("/")[2]};
 return{type:"home"};
}
function go(path){history.pushState({}, "",path);window.dispatchEvent(new PopStateEvent("popstate"))}

function Header(){
 const[open,setOpen]=useState(false);
 return <><div className="announcement">Stop By or Give Us a Call to Take a Look at Our Fleet of Rentals!</div>
 <header>
   <div className="topline wrap">
    <button className="menuBtn" onClick={()=>setOpen(true)}><Menu size={22}/><span>Menu</span></button>
    <div className="brand" onClick={()=>go("/")}>
      <div className="brandTaylor">TAYLOR</div><div className="brandRental">RENTAL</div><div className="brandSub">OF DEWITT · RENTING MEMORIES</div>
    </div>
    <div className="headerRight"><div className="contactChip"><Phone size={16}/> (315) 446-2222</div><button className="searchIcon"><Search size={21}/></button></div>
   </div>
   <div className="searchbar wrap"><Search size={19}/><input placeholder="Search all products..." onKeyDown={e=>{if(e.key==="Enter")go("/collections/all")}}/><button onClick={()=>go("/collections/all")}>Search</button></div>
 </header>
 {open&&<div className="drawerBackdrop" onClick={()=>setOpen(false)}><aside className="drawer" onClick={e=>e.stopPropagation()}>
  <button className="close" onClick={()=>setOpen(false)}><X/></button>
  <div className="drawerBrand">TAYLOR RENTAL</div>
  {["Home","All Rentals","Party & Event","Do It Yourself","Contractor","Landscaping","Wedding","Gallery","Contact Us"].map((x,i)=><button key={x} onClick={()=>{setOpen(false);go(i===0?"/":i===1?"/collections/all":"/collections/"+x.toLowerCase().replaceAll(" ","-").replaceAll("&","").replaceAll("--","-"))}}>{x}<ChevronRight size={18}/></button>)}
 </aside></div>}</>
}

function Home(){
 const[hero,setHero]=useState(0);
 React.useEffect(()=>{const t=setInterval(()=>setHero(v=>(v+1)%3),5000);return()=>clearInterval(t)},[]);
 const slides=[
 {img:IMG.hero1,k:"EQUIPMENT RENTALS",h:"Get the Right Equipment for the Job",b:"Reliable rental equipment for homeowners, contractors and businesses."},
 {img:IMG.wedding,k:"EVENT RENTALS",h:"Make Your Next Event Unforgettable",b:"Tents, tables, chairs, linens, concessions and everything in between."},
 {img:IMG.tools,k:"DIY PROJECTS",h:"Big Project? Rent It Here.",b:"Professional-grade equipment without the cost of ownership."}
 ];
 return <main>
  <section className="hero" style={{backgroundImage:`linear-gradient(90deg,rgba(0,0,0,.60),rgba(0,0,0,.15)),url(${slides[hero].img})`}}>
    <div className="heroInner wrap"><div className="eyebrow">{slides[hero].k}</div><h1>{slides[hero].h}</h1><p>{slides[hero].b}</p><div className="heroBtns"><button className="primary" onClick={()=>go("/collections/rentals")}>Browse Rentals</button><button className="secondary" onClick={()=>go("/collections/party-event")}>Plan Your Event</button></div></div>
    <div className="dots">{slides.map((_,i)=><button key={i} className={hero===i?"active":""} onClick={()=>setHero(i)}/>)}</div>
  </section>

  <section className="section wrap"><div className="sectionHead"><div><p className="mini">FEATURED RENTALS</p><h2>Everything You Need for the Ultimate Summer Bash</h2></div><button className="textLink" onClick={()=>go("/collections/all")}>More featured products <ChevronRight size={16}/></button></div>
   <div className="productGrid">{products.slice(0,7).map(p=><ProductCard p={p} key={p.slug}/>)}</div>
  </section>

  <section className="categoryBand"><div className="wrap"><p className="mini light">SHOP BY CATEGORY</p><h2>Your Go-To Source for Top-Notch Rentals</h2><div className="catGrid">{categories.map(([name,img,slug])=><article key={slug} className="catCard" onClick={()=>go("/collections/"+slug)} style={{backgroundImage:`linear-gradient(180deg,transparent,rgba(0,0,0,.72)),url(${img})`}}><h3>{name}</h3><span>Explore Rentals <ChevronRight size={16}/></span></article>)}</div></div></section>

  <section className="section wrap brandSection"><p className="mini">TRUSTED EQUIPMENT</p><h2>Carrying Top Quality & Trusted Brands</h2><div className="brandGrid">{["Gold Medal","Bobcat","Toro","Takeuchi","Palmer Snyder","Eureka","Haulotte","Little Beaver","General Wire","Wenger","Clark","Big John"].map(b=><div className="brandTile" key={b}><div className="brandMark">{b.split(" ").map(w=>w[0]).join("").slice(0,2)}</div><strong>{b}</strong></div>)}</div></section>

  <section className="services"><div className="wrap"><p className="mini light">MORE THAN RENTALS</p><h2>Take Advantage of Our Services Today</h2><div className="serviceGrid">
   {[[Truck,"Delivery","Convenient delivery to your home, jobsite or event."],[Store,"In-Store Pickup","Reserve ahead and pick up at our Dewitt location."],[Flame,"Propane Refill / Exchange","Fast propane refill and exchange service."],[PartyPopper,"Tent Installation","Professional tent setup for events of all sizes."],[Heart,"Wedding / Event Consult.","Get expert help planning the details of your event."]].map(([Icon,t,d])=><div className="serviceCard" key={t}><Icon size={32}/><h3>{t}</h3><p>{d}</p><span>Click Here for More Information <ChevronRight size={15}/></span></div>)}
  </div></div></section>

  <section className="socialSplit"><div className="socialImage" style={{backgroundImage:`url(${IMG.contractor})`}}/><div className="socialText"><p className="mini">STAY CONNECTED</p><h2>Check Out Our Socials</h2><p>Like and follow Taylor Rental of Dewitt, NY / Renting Memories for tips, product recommendations, great photos, deals, events, and more!</p><div className="socialBtns"><button><Facebook/> Like Our Facebook Page</button><button><Instagram/> Follow Us</button></div></div></section>

  <section className="newsletter"><div className="wrap newsletterIn"><div><span>Subscribe to our newsletter</span><h2>Promotions, new products and sales. Directly to your inbox.</h2></div><form onSubmit={e=>e.preventDefault()}><input placeholder="First Name"/><input placeholder="Email Address"/><button>Sign Up</button></form></div></section>

  <section className="landscapeFeature" style={{backgroundImage:`linear-gradient(90deg,rgba(0,0,0,.6),rgba(0,0,0,.15)),url(${IMG.landscape})`}}><div className="wrap"><p>Check out our</p><h2>Landscaping Rentals</h2><span><MapPin size={17}/> Syracuse, NY</span><button onClick={()=>go("/collections/landscaping")}>View Landscaping Rentals</button></div></section>

  <section className="section wrap"><p className="mini">FROM OUR BLOG</p><h2>Read Our Latest Blogs & Articles...</h2><div className="blogGrid">{[
   ["Hosting a Large Gathering? Event Rental Tips for Managing a Crowd","October 1, 2026"],
   ["Most Popular Rental Equipment Rentals for Fall","September 1, 2026"],
   ["Hosting an End-of-Summer Party: Simple Ways to Create an Unforgettable Event","August 4, 2026"]
  ].map(([t,d])=><article className="blogCard" key={t}><div className="blogImg" style={{backgroundImage:`url(${IMG.party})`}}/><div><span>{d}</span><h3>{t}</h3><p>Planning is easier when you have the right equipment, the right quantities, and a rental team that knows events.</p><a>Read More →</a></div></article>)}</div></section>

  <section className="reviewBand" style={{backgroundImage:`linear-gradient(90deg,rgba(0,0,0,.64),rgba(0,0,0,.25)),url(${IMG.wedding})`}}><div className="wrap"><p>Take a moment and</p><h2>Review Our Store & Services</h2><span>We can't wait to hear from you!</span><button>Leave a Review</button></div></section>
 </main>
}

function ProductCard({p}){return <article className="productCard" onClick={()=>go("/products/"+p.slug)}><div className="productImg" style={{backgroundImage:`url(${p.img})`}}/><div className="productBody"><span>Rental</span><h3>{p.name}</h3><p>rent from <strong>{p.price}</strong></p></div></article>}

function Collection({slug}){
 const title=slug==="all"?"Products":slug.split("-").map(x=>x[0].toUpperCase()+x.slice(1)).join(" ").replace("Diy","Do It Yourself").replace("Party Event","Party & Event");
 const list=useMemo(()=>Array.from({length:24},(_,i)=>products[i%products.length]),[]);
 return <main className="collectionPage wrap">
   <button className="backLink" onClick={()=>go("/")}><ArrowLeft size={16}/> Home</button>
   <div className="notice"><strong>Please Note:</strong><br/>There is a damage waiver charge and sales tax applied to all items. If you'd like to make a reservation you must call the store.<br/><b>Online requests for availability are NOT reservations.</b></div>
   <h1>{title}</h1>
   <div className="collectionLayout"><aside className="filters"><h3>Rental Category</h3>{catFilters.map((x,i)=><label key={x}><input type="checkbox"/>{x} <span>({i*3+1})</span></label>)}</aside><section className="results"><div className="resultsTop"><span>{list.length} products</span><select><option>Sort by</option><option>Featured</option><option>Price, low to high</option><option>Price, high to low</option></select></div><div className="productGrid collectionGrid">{list.map((p,i)=><ProductCard p={{...p,slug:p.slug+"-"+i}} key={i}/>)}</div></section></div>
 </main>
}

function Product({slug}){
 let p=products.find(x=>slug.startsWith(x.slug))||products[4];
 const[q,setQ]=useState(1),[sent,setSent]=useState(false);
 return <main className="productPage wrap"><button className="backLink" onClick={()=>history.back()}><ArrowLeft size={16}/> Back to rentals</button>
  <div className="notice compact"><strong>Please Note:</strong> There is a damage waiver charge and sales tax applied to all items. Online requests for availability are NOT reservations.</div>
  <div className="productDetail"><div className="detailImage" style={{backgroundImage:`url(${p.img})`}}/><div className="detailInfo"><span className="rentalTag">Rental</span><h1>{p.name}</h1><p className="durationLabel">Select Rental Duration</p><select className="duration"><option>{p.price} USD - 1 Day</option><option>{p.price} USD - 1 Weekend</option></select><label>Number Requesting</label><div className="qty"><button onClick={()=>setQ(Math.max(1,q-1))}><Minus/></button><b>{q}</b><button onClick={()=>setQ(q+1)}><Plus/></button></div><button className="availability" onClick={()=>setSent(true)}>Request Availability</button>{sent&&<div className="success">Thanks! Your availability request has been prepared. Please call the store to confirm your reservation.</div>}</div></div>
  <section className="details"><h2>Item Details</h2><p>The right rental makes an important project or event easier. This item is maintained by Taylor Rental of Dewitt and is available by request. Contact the store for scheduling, delivery options, setup requirements and final availability.</p></section>
 </main>
}

function Footer(){return <footer><div className="wrap footerGrid"><div><div className="footerBrand">TAYLOR RENTAL</div><p>Taylor Rental of Dewitt, NY / Renting Memories</p><p><MapPin size={15}/> Dewitt / Syracuse, New York</p><p><Phone size={15}/> (315) 446-2222</p></div><div><h4>Rentals</h4><a onClick={()=>go("/collections/party-event")}>Party & Event</a><a onClick={()=>go("/collections/do-it-yourself")}>Do It Yourself</a><a onClick={()=>go("/collections/contractor")}>Contractor</a><a onClick={()=>go("/collections/landscaping")}>Landscaping</a><a onClick={()=>go("/collections/wedding")}>Wedding</a></div><div><h4>Customer Service</h4><a>Delivery</a><a>In-Store Pickup</a><a>Tent Installation</a><a>Contact Us</a><a>Policies</a></div><div><h4>Hours</h4><p><Clock size={15}/> Mon–Fri: 7:30 AM–5:30 PM</p><p>Saturday: 8:00 AM–4:00 PM</p><p>Sunday: Closed</p></div></div><div className="copyright">© 2026 Taylor Rental of Dewitt / Renting Memories · Demo recreation for PartyRentalCRM presentation</div></footer>}

function App(){
 const[r,setR]=useState(route());
 React.useEffect(()=>{const fn=()=>setR(route());addEventListener("popstate",fn);return()=>removeEventListener("popstate",fn)},[]);
 return <><Header/>{r.type==="home"?<Home/>:r.type==="collection"?<Collection slug={r.slug}/>:<Product slug={r.slug}/>}<Footer/></>
}
createRoot(document.getElementById("root")).render(<App/>);