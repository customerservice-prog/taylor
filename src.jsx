import React,{useMemo,useState} from "react";
import{createRoot}from"react-dom/client";
import{Search,ChevronDown,ChevronRight,Truck,Box,Flame,House,Heart,Facebook,Twitter,MapPin,Phone,Mail,Clock,Minus,Plus,ArrowLeft}from"lucide-react";
import"./src.css";

const CDN="https://rentingmemories.com/cdn/shop/files/";
const IMG={
 hero:CDN+"Store_1800x800px_Shopify_02b6ad8d-9742-4280-8e9a-cce7ba36491f_2048x.png?v=1721669048",
 review:CDN+"Party_Event_1800x800px_Shopify_45e1b31b-f8ee-480d-b5ca-1831708fc820_1800x.png?v=1721670761",
 social:CDN+"Party_Event_Wedding_Highlight_600x300px_Shopify_1200x.png?v=1721670859",
 dunk:"https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=700&q=80",
 bounce:"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=700&q=80",
 tent:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=80",
 party:"https://images.unsplash.com/photo-1549451371-64aa98a6f660?auto=format&fit=crop&w=900&q=80",
 diy:"https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80",
 contractor:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
 landscape:"https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=85",
 wedding:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80"
};

const brands=[
["Gold Medal",CDN+"Party_Event_Wedding_Logo_500x500px_Shopify_200x200.png?v=1721669995"],
["Bobcat",CDN+"Party_Event_Wedding_Logo_500x500px_Shopify_1_200x200.png?v=1721670019"],
["Toro",CDN+"Party_Event_Wedding_Logo_500x500px_Shopify_2_200x200.png?v=1721670045"],
["Takeuchi",CDN+"Party_Event_Wedding_Logo_500x500px_Shopify_3_200x200.png?v=1721670099"],
["Palmer Snyder",CDN+"Party_Event_Wedding_Logo_500x500px_Shopify_4_200x200.png?v=1721670126"],
["Eureka",CDN+"Party_Event_Wedding_Logo_500x500px_Shopify_5_200x200.png?v=1721670150"],
["Haulotte",CDN+"Party_Event_Wedding_Logo_500x500px_Shopify_6_200x200.png?v=1721670174"],
["Little Beaver",CDN+"Party_Event_Wedding_Logo_500x500px_Shopify_90969b7d-1f8b-4a56-98f0-b13474af94ea_200x200.png?v=1721670250"],
["General Wire",CDN+"Party_Event_Wedding_Logo_500x500px_Shopify_1_9b2bdabc-a34b-43b5-9d76-91b1592d98e1_200x200.png?v=1721670287"],
["Wenger",CDN+"Party_Event_Wedding_Logo_500x500px_Shopify_2_583c2a0d-81fe-4912-a0a1-d5841dc1d279_200x200.png?v=1721670381"],
["Clark",CDN+"Party_Event_Wedding_Logo_500x500px_Shopify_b208628a-190f-4694-a649-5d9f053727b3_200x200.png?v=1721670439"],
["Big John",CDN+"Party_Event_Wedding_Logo_500x500px_Shopify_1_a57c3a41-2b6a-4143-9385-6b4fd88e625a_200x200.png?v=1721670515"]
];

const products=[
{slug:"gold-medal-two-bowl-frozen-drink-slushee-machine",brand:"Gold Medal Products Co.",name:"Gold Medal Two Bowl Frozen Drink Slushee Machine",price:"",img:null},
{slug:"dunk-tank",brand:"",name:"Twister Display Dunk Tank",price:"",img:IMG.dunk},
{slug:"bounce-house-with-slide",brand:"",name:"Bounce House with Slide",price:"",img:IMG.bounce},
{slug:"eureka-30x30-twin-tube-frame-tent",brand:"Eureka",name:"Eureka 30x30 Twin Tube Frame Tent",price:"",img:null},
{slug:"60-x-60-single-center-pole-tent",brand:"",name:"60' x 60' Single Center Pole Tent",price:"",img:IMG.tent},
{slug:"40ft-x-100ft-twin-tube-plus-frame-tent",brand:"",name:"40ft X 100ft Twin Tube Plus Frame Tent",price:"",img:IMG.wedding},
{slug:"eureka-20x20-traditional-party-canopy",brand:"Eureka",name:"Eureka 20x20 Traditional Party Canopy",price:"$200.00",img:IMG.party}
];

const collectionProducts=[
{name:"Drape Screw-In Bases 11\"",price:"$5.00"},
{name:"Choice 176SPCHA11QT 11qt Round Soup Chafer",price:"$15.00"},
{name:"Flash Furniture X-Back Bar Stool",price:"$15.00"},
{name:"CAC China 5oz Square Coffee Cup",price:"$0.90"},
{name:"10\" Square Dinner Plate",price:"$0.90"},
{name:"Castle 14HF Deep Fryer",price:"$175.00"},
{name:"Hydromist Misting fan",price:"$120.00"},
{name:"Eco-Light LED Light Tower",price:"$190.00"},
{name:"Big John 2' x 3' Charcoal grill",price:"$65.00"},
{name:"Whisper Watt 12K Generator",price:"$240.00"},
{name:"Toro Material Buggy",price:"$225.00"},
{name:"Takeuchi TB230 Excavator",price:"$425.00"}
];

function currentRoute(){
 const p=location.pathname;
 if(p.startsWith("/products/"))return{type:"product",slug:p.split("/")[2]};
 if(p.startsWith("/collections/"))return{type:"collection",slug:p.split("/")[2]};
 return{type:"home"};
}
function go(path){history.pushState({}, "",path);window.dispatchEvent(new PopStateEvent("popstate"));scrollTo(0,0)}

function Logo(){
 return <div className="logo" onClick={()=>go("/")}>
   <div className="logoMain">TAYLOR RENTAL</div>
   <div className="logoScript">Renting Memories!</div>
 </div>
}

function Header(){
 return <>
  <div className="announcement"><div className="siteWrap">Stop By or Give Us a Call to Take a Look at Our Fleet of Rentals!<div className="announceSocial"><Twitter size={13}/><Facebook size={13}/></div></div></div>
  <header className="header">
   <div className="siteWrap headerMain">
    <Logo/>
    <div className="storeInfo">
      <MapPin size={24}/>
      <div><strong>TAYLOR RENTAL OF DEWITT, INC.</strong><span>3131 Erie Blvd. Syracuse, NY 13214</span><b>CLOSED</b></div>
      <ChevronDown size={14}/>
    </div>
    <div className="headerSearch"><Search size={18}/><input placeholder="Search all products..."/><button onClick={()=>go("/collections/all")}>SEARCH</button></div>
   </div>
   <nav className="nav"><div className="siteWrap navIn">
    <button onClick={()=>go("/collections/rentals")}>▣ VIEW RENTALS <ChevronDown size={13}/></button>
    <button>SERVICES <ChevronDown size={13}/></button>
    <button>WHAT'S NEW <ChevronDown size={13}/></button>
    <button>BLOG</button><button>ABOUT US <ChevronDown size={13}/></button><button>LOCATIONS</button><button>CONTACT US</button>
   </div></nav>
  </header>
 </>;
}

function Home(){
 return <main>
   <section className="heroWrap siteWrap">
    <div className="hero" style={{backgroundImage:`linear-gradient(rgba(0,0,0,.16),rgba(0,0,0,.18)),url("${IMG.hero}")`}}>
      <div className="heroCopy"><span>Welcome to</span><h1>TAYLOR RENTAL OF DEWITT, NY</h1><p>We are truly a one-stop-shop for contractors, homeowners, and party/event equipment needs!</p></div>
      <button className="reservation">▣ RENTAL RESERVATION REQUEST</button>
      <div className="heroButtons"><button className="redBtn" onClick={()=>go("/collections/rentals")}>VIEW RENTALS</button><button className="darkBtn">READ ABOUT US</button></div>
    </div>
    <div className="heroDots"><span>‹</span><b>●</b><span>●</span><span>●</span><span>›</span></div>
   </section>

   <section className="homeSection siteWrap featured">
    <div className="titleRow"><h2>EVERYTHING YOU NEED FOR THE ULTIMATE SUMMER<br/>BASH</h2><a onClick={()=>go("/collections/all")}>MORE FEATURED PRODUCTS ›</a></div>
    <div className="featureRail"><span className="railArrow">‹</span>{products.slice(0,5).map(p=><FeaturedCard p={p} key={p.slug}/>)}<span className="railArrow">›</span></div>
    <div className="smallDots">○ ● ○</div>
   </section>

   <section className="homeSection siteWrap">
    <h2>YOUR GO-TO SOURCE FOR TOP-NOTCH RENTALS</h2>
    <div className="categoryGrid">
      <Category name="PARTY & EVENT RENTALS" img={IMG.party} path="/collections/rental-party-event"/>
      <Category name="DO IT YOURSELF RENTALS" img={IMG.diy} path="/collections/rental-do-it-yourself"/>
      <Category name="CONTRACTOR RENTALS" img={IMG.contractor} path="/collections/rental-contractor"/>
      <Category name="LANDSCAPING RENTALS" img={IMG.landscape} path="/collections/rental-landscaping"/>
      <Category name="WEDDING RENTALS" img={IMG.wedding} path="/collections/rental-wedding"/>
    </div>
   </section>

   <section className="homeSection siteWrap brands">
    <h2>CARRYING TOP QUALITY & TRUSTED BRANDS</h2>
    <div className="brandGrid">{brands.map(([name,img])=><div className="brandCell" key={name}><div className="brandLogo"><img src={img} alt={name}/></div><strong>{name.toUpperCase()}</strong></div>)}</div>
   </section>

   <section className="homeSection siteWrap services">
    <h2>TAKE ADVANTAGE OF OUR SERVICES TODAY</h2>
    <div className="serviceGrid">
     <Service icon={Truck} name="DELIVERY"/>
     <Service icon={Box} name="IN-STORE PICKUP"/>
     <Service icon={Flame} name={"PROPANE REFILL /\nEXCHANGE"}/>
     <Service icon={House} name="TENT INSTALLATION"/>
     <Service icon={Heart} name={"WEDDING / EVENT\nCONSULT."}/>
    </div>
   </section>

   <section className="socialBlock siteWrap">
    <div></div><div className="socialCopy"><h2>CHECK OUT OUR SOCIALS</h2><p>Like and follow Taylor Rental of Dewitt, NY / Renting Memories on Facebook and X for tips, product recommendations, great photos, deals, events, and more!</p><div><button>LIKE OUR FACEBOOK PAGE</button><button>FOLLOW US ON X</button></div></div>
   </section>

   <section className="newsletter siteWrap">
    <h2>SUBSCRIBE TO OUR NEWSLETTER</h2><p>Promotions, new products and sales. Directly to your inbox.</p>
    <div className="newsletterForm"><input placeholder="First Name"/><input placeholder="Email Address"/></div><button>SIGN UP</button>
   </section>

   <section className="landscapeBanner" style={{backgroundImage:`linear-gradient(rgba(0,0,0,.22),rgba(0,0,0,.24)),url("${IMG.landscape}")`}}>
    <div><span>Check out our</span><h2>LANDSCAPING RENTALS</h2><small>Syracuse, NY</small><button onClick={()=>go("/collections/rental-landscaping")}>VIEW LANDSCAPING RENTALS</button></div>
   </section>

   <section className="homeSection siteWrap blogSection">
    <h2>READ OUR LATEST BLOGS & ARTICLES...</h2>
    <div className="blogGrid">
      <Blog title="Hosting a Large Gathering? Event Rental Tips for Managing a Crowd" date="October 1, 2026"/>
      <Blog title="Most Popular Rental Equipment Rentals for Fall" date="September 1, 2026"/>
      <Blog title="Hosting an End-of-Summer Party: Simple Ways to Create an Unforgettable Event" date="August 4, 2026"/>
    </div>
    <button className="viewAll">VIEW ALL</button>
   </section>

   <section className="reviewBanner siteWrap" style={{backgroundImage:`linear-gradient(rgba(0,0,0,.34),rgba(0,0,0,.34)),url("${IMG.review}")`}}>
    <span>Take a moment and</span><h2>REVIEW OUR STORE & SERVICES</h2><p>We can't wait to hear from you!</p><button>LEAVE A REVIEW</button>
   </section>
 </main>
}

function FeaturedCard({p}){return <article className="featuredCard" onClick={()=>go("/products/"+p.slug)}>
 <div className="featuredImage">{p.img?<img src={p.img} alt=""/>:<span>No Image<br/>Available</span>}</div>
 <div className="featuredMeta">{p.brand&&<small>{p.brand}</small>}<h3>{p.name}</h3>{p.price&&<p>rent from {p.price}</p>}</div>
</article>}

function Category({name,img,path}){return <article className="categoryCard" onClick={()=>go(path)}><img src={img} alt=""/><strong>{name}</strong></article>}

function Service({icon:Icon,name}){return <article className="service"><div className="serviceIcon"><Icon size={34}/></div><strong>{name.split("\n").map((x,i)=><React.Fragment key={x}>{i>0&&<br/>}{x}</React.Fragment>)}</strong><span>Click Here for More<br/>Information</span></article>}

function Blog({title,date}){return <article className="blogCard"><div className="blogSpacer"></div><h3>{title}</h3><small>{date}</small><p>Bringing people together can make for an unforgettable celebration, but it also requires a little extra planning. Whether you're organizing an event, project, or gathering...</p><a>Read More →</a></article>}

function Collection({slug}){
 const title=(slug||"all").replace(/^rental-/,"").replaceAll("-"," ").replace(/\b\w/g,c=>c.toUpperCase()).replace("All","Products");
 const list=useMemo(()=>Array.from({length:24},(_,i)=>collectionProducts[i%collectionProducts.length]),[]);
 return <main className="catalog siteWrap">
  <button className="backLink" onClick={()=>go("/")}><ArrowLeft size={16}/> Home</button>
  <div className="notice"><b>Please Note:</b><p>There is a damage waiver charge and sales tax applied to all items. If you'd like to make a reservation you must call the store.</p><strong>Online requests for availability are NOT reservations.</strong></div>
  <h1>{title}</h1>
  <div className="catalogLayout"><aside><h3>Rental Category</h3>{["Audio/Visual Equipment","Buffet","Concession","Construction","Cooking Equipment","Crowd Control","Dance Floors","Décor","Furniture","Games","Generators","Heating/Cooling","Inflatables","Linens","Pipe & Drape","Staging","Tabletop","Tents/Canopies"].map((x,i)=><label key={x}><input type="checkbox"/>{x} <em>({i*3+1})</em></label>)}</aside>
  <section><div className="sort">Sort by <select><option>Featured</option><option>Price, low to high</option><option>Price, high to low</option></select></div><div className="catalogGrid">{list.map((p,i)=><article className="catalogCard" key={i}><div className="catalogImg"></div><small>Rental</small><h3>{p.name}</h3><p>rent from <b>{p.price}</b></p></article>)}</div></section></div>
 </main>
}

function Product({slug}){
 const p=products.find(x=>slug?.startsWith(x.slug))||products[1];const[q,setQ]=useState(1);
 return <main className="productPage siteWrap"><button className="backLink" onClick={()=>history.back()}><ArrowLeft size={16}/> Back</button><div className="notice"><b>Please Note:</b><p>There is a damage waiver charge and sales tax applied to all items. If you'd like to make a reservation you must call the store.</p><strong>Online requests for availability are NOT reservations.</strong></div><div className="productDetail"><div className="productPhoto">{p.img?<img src={p.img}/>:<span>No Image Available</span>}</div><div><h1>{p.name}</h1><label>Select Rental Duration</label><select><option>{p.price||"$175.00"} USD - 1 Day</option><option>{p.price||"$175.00"} USD - 1 Weekend</option></select><label>Number Requesting</label><div className="qty"><button onClick={()=>setQ(Math.max(1,q-1))}><Minus size={16}/></button><b>{q}</b><button onClick={()=>setQ(q+1)}><Plus size={16}/></button></div><button className="requestBtn">Request Availability</button></div></div></main>
}

function Footer(){return <footer><div className="siteWrap footerGrid">
 <div><h4>MAIN MENU</h4><a>View Rentals</a><a>Services</a><a>Events</a><a>Blog</a><a>About Us</a><a>Locations</a><a>Contact Us</a></div>
 <div><h4>TAYLOR RENTAL OF DEWITT, NY / RENTING MEMORIES</h4><p><MapPin size={13}/>3131 Erie Blvd, Syracuse, NY 13214</p><div className="hours"><span>Mon:</span><b>7:30 AM - 5:30 PM</b><span>Tue:</span><b>7:30 AM - 5:30 PM</b><span>Wed:</span><b>7:30 AM - 5:30 PM</b><span>Thu:</span><b>7:30 AM - 5:30 PM</b><span>Fri:</span><b>7:30 AM - 5:30 PM</b><span>Sat:</span><b>CLOSED</b><span>Sun:</span><b>CLOSED</b></div><p><Phone size={13}/>(315) 446-7701</p></div>
 <div className="footerNewsletter"><h4>NEWSLETTER</h4><p>Promotions, new products and sales. Directly to your inbox.</p><div><input placeholder="First Name"/><input placeholder="Email Address"/></div><button>SIGN UP</button></div>
 </div><div className="siteWrap footerBottom"><span>Search · Privacy Policy · Return Policy · Terms of Service · Accessibility Statement</span><span><Twitter size={13}/> <Facebook size={13}/></span></div><div className="siteWrap copyright">© 2026 Taylor Rental of Dewitt, NY / Renting Memories. Powered by PartyRentalCRM.</div></footer>}

function App(){const[r,setR]=useState(currentRoute());React.useEffect(()=>{const fn=()=>setR(currentRoute());addEventListener("popstate",fn);return()=>removeEventListener("popstate",fn)},[]);return <><Header/>{r.type==="home"?<Home/>:r.type==="collection"?<Collection slug={r.slug}/>:<Product slug={r.slug}/>}<Footer/></>}
createRoot(document.getElementById("root")).render(<App/>);
