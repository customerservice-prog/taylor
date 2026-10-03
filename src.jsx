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
 const p=(location.pathname.replace(/\/+$/,"")||"/");
 const productMatch=p.match(/\/products\/([^/]+)$/);
 if(productMatch)return{type:"product",slug:decodeURIComponent(productMatch[1])};
 if(p==="/blogs/news")return{type:"blog"};
 if(p.startsWith("/blogs/news/"))return{type:"article",slug:p.split("/").pop()};
 if(p==="/apps/pages/offers"||p==="/a/pages/offers")return{type:"offers"};
 if(p==="/apps/pages/events"||p==="/a/pages/events")return{type:"events"};
 if(p.includes("/pages/locations/"))return{type:"location"};
 if(p.startsWith("/collections/"))return{type:"collection",slug:p.split("/")[2]||"all"};
 if(p.startsWith("/pages/"))return{type:"page",slug:p.split("/")[2]||""};
 if(p.startsWith("/policies/"))return{type:"policy",slug:p.split("/")[2]||""};
 return{type:"home"};
}
function go(path){history.pushState({}, "",path);window.dispatchEvent(new PopStateEvent("popstate"));scrollTo(0,0)}

function NavDrop({label,items,direct}){
 return <div className="navGroup">
   <button className="navLabel" onClick={()=>direct&&go(direct)}>{label}{items&&<ChevronDown size={13}/>}</button>
   {items&&<div className="navDropdown">{items.map(([name,path])=><button key={path} onClick={()=>go(path)}>{name}</button>)}</div>}
 </div>
}

function Header(){
 const[q,setQ]=useState("");
 const submit=()=>go("/collections/all");
 return <>
  <div className="announcement"><div className="siteWrap">Stop By or Give Us a Call to Take a Look at Our Fleet of Rentals!<div className="announceSocial"><Twitter size={13}/><Facebook size={13}/></div></div></div>
  <header className="header">
   <div className="siteWrap headerMain">
    <Logo/>
    <div className="storeInfo">
      <MapPin size={24}/>
      <div><strong>TAYLOR RENTAL OF DEWITT, INC.</strong><span>3131 Erie Blvd E, Syracuse, NY 13214</span><b>CLOSED</b></div>
      <ChevronDown size={14}/>
    </div>
    <div className="headerSearch"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="Search all products..."/><button onClick={submit}>SEARCH</button></div>
   </div>
   <nav className="nav"><div className="siteWrap navIn">
    <NavDrop label="▣ VIEW RENTALS" items={[
      ["Contractor","/collections/rental-contractor"],["Do-it-yourself","/collections/rental-do-it-yourself"],["Home & Business","/collections/rental-home-business"],["Landscaping","/collections/rental-landscaping"],["Moving & Shipping","/collections/rental-moving-shipping"],["Party & Event","/collections/rental-party-event"],["Wedding","/collections/rental-wedding"]
    ]}/>
    <NavDrop label="SERVICES" items={[
      ["Delivery","/pages/delivery"],["In-Store Pickup","/pages/in-store-pickup"],["Propane Refill / Exchange","/pages/propane-refill-exchange"],["Tent Installation","/pages/tent-installation"],["Wedding / Event Consultation","/pages/wedding-event-consultation"]
    ]}/>
    <NavDrop label="WHAT'S NEW" items={[["Offers","/apps/pages/offers"],["Events","/a/pages/events"]]}/>
    <NavDrop label="BLOG" direct="/blogs/news"/>
    <NavDrop label="ABOUT US" items={[["About Us","/pages/about-us"],["Reviews","/pages/see-what-our-customers-have-had-to-say"],["Gallery","/pages/gallery"]]}/>
    <NavDrop label="LOCATIONS" direct="/apps/pages/locations/taylor-rental-of-dewitt-ny-renting-memories"/>
    <NavDrop label="CONTACT US" direct="/pages/contact"/>
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

const LOGO_URL="https://nmr-mighty-media.s3.us-east-1.amazonaws.com/1000/508/QT5D24l90jl3Otka7Mf0m4tMlZ3lXbt0Guzku7Kw.png";
const SERVICE_FALLBACK=IMG.contractor;
const servicePages={
 "delivery":{title:"Delivery",heading:"Bringing Your Rentals Right to Your Doorstep!",image:"https://rentingmemories.com/cdn/shop/files/Delivery_600x400px_Shopify.png?v=1721672395",body:["Convenient delivery helps get event and project equipment where it needs to go without adding another errand to your day.","From party equipment to jobsite rentals, the team coordinates delivery details so you can stay focused on the event or project."]},
 "in-store-pickup":{title:"In-Store Pickup",heading:"Swift, Simple, Ready: Your Rentals Await with In-Store Pickup!",image:IMG.contractor,body:["Reserve what you need, then pick it up at the Syracuse store. The pickup experience is designed to be straightforward for event customers, homeowners, and contractors.","Store staff can help confirm the equipment and accessories before you leave."]},
 "propane-refill-exchange":{title:"Propane Refill / Exchange",heading:"Fuel Your Adventures: Convenient Propane Refill & Exchange.",image:"https://rentingmemories.com/cdn/shop/files/Fuel_600x400px_Shopify_1.png?v=1721672618",body:["Propane refill and exchange service supports grills, heaters, camping gear, and other outdoor equipment.","Stop by the store for a quick refill or exchange before your next event or project."]},
 "tent-installation":{title:"Tent Installation",heading:"Transform Your Event with Precision: Expert Tent Installation for Every Occasion.",image:"https://rentingmemories.com/cdn/shop/files/Party_Event_600x400px_Shopify.png?v=1721672737",body:["Professional tent installation helps create a secure, polished event space for celebrations of many sizes.","The rental team handles the setup details so customers can focus on the event itself."]},
 "wedding-event-consultation":{title:"Wedding / Event Consultation",heading:"Let Us Handle the Details, So You Can Enjoy the Day!",image:IMG.wedding,body:["Event consultation helps customers coordinate rental quantities, layouts, tents, tables, chairs, and finishing touches.","The goal is a practical rental plan that supports the look, guest count, and flow of the event."]}
};

const catalogSeed=[
 {name:"Drape Screw-In Bases 11\"",price:"$5.00",img:null},
 {name:"Choice 11qt Round Soup Chafer",price:"$15.00",img:IMG.party},
 {name:"X-Back Bar Stool",price:"$15.00",img:IMG.wedding},
 {name:"5oz Square Coffee Cup",price:"$0.90",img:null},
 {name:"10\" Square Dinner Plate",price:"$0.90",img:null},
 {name:"14HF Deep Fryer",price:"$175.00",img:IMG.party},
 {name:"Hydromist Misting Fan",price:"$120.00",img:IMG.landscape},
 {name:"Eco-Light LED Light Tower",price:"$190.00",img:IMG.contractor},
 {name:"2' x 3' Charcoal Grill",price:"$65.00",img:IMG.party},
 {name:"12K Generator",price:"$240.00",img:IMG.contractor},
 {name:"Enclosed Trailer",price:"$90.00",img:IMG.contractor},
 {name:"Zero Turn Mower",price:"$145.00",img:IMG.landscape},
 {name:"60' Towable Boom Lift",price:"$550.00",img:IMG.contractor},
 {name:"Large Floor Stripper",price:"$100.00",img:IMG.diy},
 {name:"Material Buggy",price:"$225.00",img:IMG.contractor},
 {name:"6600 lb. Excavator",price:"$425.00",img:IMG.contractor},
 {name:"Manual Sod Cutter",price:"$35.00",img:IMG.landscape},
 {name:"20x20 Traditional Party Canopy",price:"$200.00",img:IMG.tent},
 {name:"30x30 Twin Tube Frame Tent",price:"$900.00",img:null},
 {name:"White Resin Folding Chair",price:"$4.50",img:IMG.wedding},
 {name:"Portable Lectern",price:"$75.00",img:IMG.party},
 {name:"4' x 6' Stage",price:"$70.00",img:IMG.party},
 {name:"Caster Dolly",price:"$22.00",img:IMG.contractor},
 {name:"Pallet Truck",price:"$60.00",img:IMG.contractor}
];

const collectionConfig={
 "all":{title:"Products",brandCount:null},
 "rentals":{title:"Rentals",brandCount:null},
 "featured-products":{title:"Featured Products",brandCount:4},
 "rental-party-event":{title:"Party & Event",brandCount:17},
 "rental-do-it-yourself":{title:"Do-it-yourself",brandCount:33},
 "rental-contractor":{title:"Contractor",brandCount:36},
 "rental-landscaping":{title:"Landscaping",brandCount:18},
 "rental-wedding":{title:"Wedding",brandCount:12},
 "rental-home-business":{title:"Home & Business",brandCount:16},
 "rental-moving-shipping":{title:"Moving & Shipping",brandCount:4}
};

const filters=["Audio/Visual Equipment","Automotive","Buffet","Concession","Construction","Cooking Equipment","Crowd Control","Dance Floors","Décor","Furniture","Games","Generators","Grounds Care","Hand & Power Tools","Heating/Cooling","Inflatables","Linens","Moving","Pipe & Drape","Staging","Tabletop","Tents/Canopies","Trailers"];
const subfilters=["Air Movers","Arches/Columns","Bar","Beverage","Bounce Houses","Canopies","Carts/Dollies","Chairs, Folding","Decorative","Dinnerware","Dollies","Frame Tents","Frozen Drinks","Glassware/Stemware","Grill","LED Lighting","Pole/Tension Tents","Serving","Tables, Banquet","Tables, Round"];

const productDetails={
 "gold-medal-two-bowl-frozen-drink-slushee-machine":{name:"Gold Medal Two Bowl Frozen Drink Slushee Machine",brand:"Gold Medal Products Co.",price:"$200.00",img:null,details:"Two-bowl frozen drink machine for parties and events. Mixes are available separately."},
 "dunk-tank":{name:"Dunk Tank",brand:"Twister Display",price:"$200.00",img:IMG.dunk,details:"Trailer-mounted dunk tank designed for fundraisers, company events, block parties, and carnivals."},
 "bounce-house-with-slide":{name:"Bounce House with Slide",brand:"",price:"$250.00",img:IMG.bounce,details:"Inflatable bounce-and-slide combination for parties and family events."},
 "4-x-6-stage":{name:"4' x 6' Stage",brand:"Wenger Corp.",price:"$70.00",img:IMG.party,details:"Versatile portable stage section. Accessories such as stairs, guardrails, chair stops, and skirting may be available."},
 "4-x-8-stage":{name:"4' x 8' Stage",brand:"Wenger Corp.",price:"$80.00",img:IMG.party,details:"Portable stage section sized for event and presentation layouts."},
 "portable-lectern":{name:"Portable Lectern",brand:"",price:"$75.00",img:IMG.party,details:"Portable amplified lectern suitable for indoor and outdoor presentations."},
 "haulotte-5533a-60-towable-boom-lift":{name:"Haulotte 5533A 60' Towable Boom Lift",brand:"Haulotte Group",price:"$550.00",img:IMG.contractor,details:"Towable boom lift with a working height around 60 feet for indoor or outdoor access work."},
 "edco-tornado-200-vac-200":{name:"EDCO Tornado-200 (VAC-200)",brand:"EDCO",price:"$125.00",img:IMG.contractor,details:"Electric dust-control vacuum used with concrete grinding and surface-preparation equipment."},
 "toro-dingo-tx427":{name:"Toro Dingo TX427 compact loader",brand:"Toro",price:"$330.00",img:IMG.landscape,details:"Compact utility loader designed for digging, hauling, planting, and site work."}
};

const blogPosts=[
 {slug:"hosting-an-end-of-summer-party-simple-ways-to-create-an-unforgettable-event",title:"Hosting an End-of-Summer Party: Simple Ways to Create an Unforgettable Event",date:"August 4, 2026",img:IMG.party},
 {slug:"driveways-decks-and-more-what-you-can-clean-with-a-pressure-washer",title:"Driveways, Decks, and More: What You Can Clean with a Pressure Washer",date:"July 1, 2026",img:IMG.contractor},
 {slug:"sizzling-celebrations-must-have-event-and-party-rentals-for-your-summer-bash",title:"Sizzling Celebrations: Must-Have Event and Party Rentals for Your Summer Bash",date:"June 1, 2026",img:IMG.wedding},
 {slug:"from-diy-to-pro-the-must-have-rentals-for-every-type-of-project",title:"From DIY to Pro: The Must-Have Rentals for Every Type of Project",date:"May 1, 2026",img:IMG.diy},
 {slug:"hosting-a-spring-celebration-essential-rentals-for-showers-graduations-and-backyard-parties",title:"Hosting a Spring Celebration? Essential Rentals for Showers, Graduations, and Backyard Parties",date:"April 1, 2026",img:IMG.party}
];

function niceSlug(slug){return (slug||"").replaceAll("-"," ").replace(/\b\w/g,c=>c.toUpperCase())}
function SafeImage({src,alt="",fallback=SERVICE_FALLBACK,className=""}){return <img className={className} src={src||fallback} alt={alt} onError={e=>{if(e.currentTarget.src!==fallback)e.currentTarget.src=fallback}}/>}
function PageHeading({title,city=true,breadcrumb=false}){return <div className="innerHead">{breadcrumb&&<div className="breadcrumb"><button onClick={()=>go("/")}>Home</button> › {title}</div>}<h1>{title}</h1>{city&&<p>Syracuse, NY</p>}<div className="innerRule"/></div>}

function Collection({slug}){
 const cfg=collectionConfig[slug]||{title:niceSlug(slug),brandCount:null};
 let items=catalogSeed;
 if(slug==="featured-products")items=products.slice(0,7).map(p=>({name:p.name,price:p.price||"$200.00",img:p.img,slug:p.slug}));
 if(slug==="rental-wedding")items=catalogSeed.filter((_,i)=>[2,17,18,19,20,21,5,0].includes(i));
 if(slug==="rental-landscaping")items=catalogSeed.filter((_,i)=>[6,11,13,14,15,16,12,10].includes(i));
 if(slug==="rental-moving-shipping")items=catalogSeed.filter((_,i)=>[10,22,23,14,12].includes(i));
 if(slug==="rental-home-business")items=catalogSeed.filter((_,i)=>[22,20,21,3,4,9,10,1].includes(i));
 const repeated=Array.from({length:24},(_,i)=>items[i%items.length]);
 return <main className="catalog siteWrap">
   <div className="catalogNote"><strong>Please Note:</strong><span>There is a damage waiver charge and sales tax applied to all items. If you'd like to make a reservation you must call the store.</span><b>Online requests for availability are NOT reservations.</b></div>
   {cfg.brandCount&&<div className="brandCount">Brand Count:{cfg.brandCount}</div>}
   <h1>{cfg.title}</h1>
   <button className="mobileFilters">Filters</button>
   <div className="catalogLayout">
    <aside className="filterPanel">
     <h3>Rental Category</h3>{filters.map((x,i)=><label key={x}><input type="checkbox"/><span>{x}</span><em>({(i*7)%113+1})</em></label>)}
     <h3>Rental Subcategory</h3>{subfilters.map((x,i)=><label key={x}><input type="checkbox"/><span>{x}</span><em>({(i*5)%44+1})</em></label>)}
    </aside>
    <section className="catalogResults">
      <div className="sortRow"><span>{repeated.length} products</span><label>Sort by <select><option>Featured</option><option>Most relevant</option><option>Best selling</option><option>Alphabetically, A-Z</option><option>Price, low to high</option><option>Price, high to low</option></select></label></div>
      <div className="catalogGrid">{repeated.map((p,i)=><article className="catalogCard" key={i} onClick={()=>go("/products/"+(p.slug||p.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")))}>
        <div className="catalogImg">{p.img?<SafeImage src={p.img} alt={p.name} fallback={IMG.party}/>:<span>No Image<br/>Available</span>}</div>
        <small>Rental</small><h3>{p.name}</h3><p>rent from <b>{p.price||"$25.00"}</b></p>
      </article>)}</div>
      <div className="pagination"><button>←</button><b>1</b><button>2</button><button>3</button><span>…</span><button>13</button><button>→</button></div>
    </section>
   </div>
 </main>
}

function RequestModal({open,onClose,item}){
 if(!open)return null;
 return <div className="modalBack" onClick={onClose}><div className="requestModal" onClick={e=>e.stopPropagation()}><button className="modalClose" onClick={onClose}>×</button><h2>Request Availability</h2><p>{item}</p><div className="modalFields"><input placeholder="Full Name"/><input placeholder="Email"/><input placeholder="Phone"/><input placeholder="Event / project date"/><textarea placeholder="Tell us what you need..."/></div><button className="requestBtn">SUBMIT REQUEST</button></div></div>
}

function Product({slug}){
 const byHome=products.find(x=>slug.startsWith(x.slug));
 const p=productDetails[slug]||byHome||{name:niceSlug(slug),brand:"",price:"$75.00",img:IMG.contractor,details:"Rental item details and availability are confirmed by the store."};
 const[q,setQ]=useState(1),[modal,setModal]=useState(false);
 return <main className="productPage siteWrap">
   <div className="catalogNote"><strong>Please Note:</strong><span>There is a damage waiver charge and sales tax applied to all items. If you'd like to make a reservation you must call the store.</span><b>Online requests for availability are NOT reservations.</b></div>
   <div className="productDetail">
     <div className="productGallery"><div className="productPhoto">{p.img?<SafeImage src={p.img} alt={p.name} fallback={IMG.contractor}/>:<span>No Image Available</span>}</div><div className="galleryCount">1 / 1</div></div>
     <div className="productInfo"><h1>{p.name}</h1>{p.brand&&<p className="productBrand">{p.brand}</p>}<div className="productStars">☆ ☆ ☆ ☆ ☆</div>
       <label>Select Rental Duration</label><select><option>{p.price||"$75.00"} USD - 1 Day</option><option>{p.price||"$75.00"} USD - 1 Weekend</option><option>{p.price||"$75.00"} USD - 1 Week</option><option>{p.price||"$75.00"} USD - 4 Weeks</option></select>
       <label>Number Requesting</label><div className="qty"><button onClick={()=>setQ(Math.max(1,q-1))}><Minus size={16}/></button><b>{q}</b><button onClick={()=>setQ(q+1)}><Plus size={16}/></button></div>
       <button className="requestBtn" onClick={()=>setModal(true)}>Request Availability</button>
     </div>
   </div>
   <section className="itemDetails"><h2>Item Details</h2><p>{p.details}</p></section>
   <section className="recommend"><h2>We Also Recommend</h2><div className="recommendGrid">{products.slice(0,5).map(x=><FeaturedCard p={x} key={x.slug}/>)}</div></section>
   <RequestModal open={modal} onClose={()=>setModal(false)} item={p.name}/>
 </main>
}

function InfoPage({slug}){
 const d=servicePages[slug]||servicePages.delivery;
 return <main className="innerPage siteWrap"><PageHeading title={d.title}/><section className="infoSplit"><div className="infoImage"><SafeImage src={d.image} alt={d.title}/></div><div className="infoCopy"><h2>{d.heading}</h2>{d.body.map((x,i)=><p key={i}>{x}</p>)}<button onClick={()=>go("/pages/contact")}>CONTACT US</button></div></section></main>
}

function AboutPage(){
 return <main className="innerPage siteWrap"><PageHeading title="About Us"/><section className="infoSplit"><div className="infoImage"><SafeImage src="https://rentingmemories.com/cdn/shop/files/Store_600x400px_Shopify.png?v=1721668558" alt="Taylor Rental store"/></div><div className="infoCopy"><h2>About Us</h2><p>Renting Memories is the Taylor Rental Center serving the Syracuse area with equipment for contractors, homeowners, yard and garden projects, industrial work, parties, and special events.</p><p>The store combines practical project equipment with a large event-rental inventory, from small gatherings through large company functions and festivals.</p><button onClick={()=>go("/pages/contact")}>CONTACT US</button></div></section></main>
}

function ReviewsPage(){
 return <main className="innerPage siteWrap"><PageHeading title="See What Our Customers Have Had to Say!" breadcrumb/><section className="reviewsPanel"><img src={LOGO_URL} alt="Taylor Rental"/><div className="reviewStars">★★★★★</div><h2>Taylor Rental of Dewitt, NY / Renting Memories</h2><p>Customer feedback and store reviews appear here.</p><button>LEAVE A REVIEW</button></section></main>
}

const galleryNames=["Taste of Syracuse","Tent Liner & Lights","Pipe & Drape","Liner & Lights","Kinsella","Hanger Event","Frame Tent Liner","40' x 80' Frame Tent","60' x 150' Pole Tent","20' x 40' Frame Tent","30' x 90' Frame Tent","Chantilly Tent Interior","40' Frame Tent","Hobbitt Hollow in Skaneateles","60' Pole Tent Interior","Pole Tent Interior Decorations"];
function GalleryPage(){
 return <main className="innerPage siteWrap"><PageHeading title="See what's in Store"/><div className="galleryGrid">{galleryNames.map((name,i)=><figure key={name}><SafeImage src={"https://rentingmemories.com/cdn/shop/files/"+((i%8)+1)+"_800x.png?v=1721836460"} alt={name} fallback={IMG.wedding}/><figcaption>{name}</figcaption></figure>)}</div></main>
}

function LocationPage(){
 const photos=[IMG.contractor,IMG.party,IMG.wedding,IMG.landscape,IMG.tent];
 return <main className="innerPage siteWrap locationPage"><div className="breadcrumb"><button onClick={()=>go("/")}>Locations</button> › Taylor Rental of Dewitt, NY / Renting Memories</div><section className="locationHero"><img src={LOGO_URL} alt="Taylor Rental"/><div><h1>Taylor Rental of Dewitt, NY / Renting Memories</h1><span className="closed">Closed</span><p>3131 Erie Blvd E, Syracuse, NY, 13214</p></div></section><h2>Visit Our Store</h2><div className="locationGrid"><div><h3>Store Address</h3><p>3131 Erie Blvd E, Syracuse, NY, 13214</p><button>GET DIRECTIONS</button></div><div><h3>Contact</h3><p>Phone: (315) 446-7101</p><p>Email: trc@rentingmemories.com</p></div><div><h3>Store Hours</h3><div className="locationHours">{["Monday|7:30 AM - 5:30 PM","Tuesday|7:30 AM - 5:30 PM","Wednesday|7:30 AM - 5:30 PM","Thursday|7:30 AM - 5:30 PM","Friday|7:30 AM - 5:30 PM","Saturday|Closed","Sunday|Closed"].map(x=>{const[a,b]=x.split("|");return <React.Fragment key={a}><span>{a}</span><b>{b}</b></React.Fragment>})}</div></div></div><h2>Recent Photos</h2><div className="locationPhotos">{photos.map((x,i)=><SafeImage key={i} src={x} alt="Taylor Rental photo"/>)}</div></main>
}

function ContactPage(){
 return <main className="innerPage siteWrap"><PageHeading title="Contact" city={false}/><div className="contactIntro">Please fill out this form to contact us and we'll get back to you right away!</div><form className="contactForm" onSubmit={e=>e.preventDefault()}><div className="hiddenField"><label>Please leave this field blank</label><input/></div><label>Enter your full name<input placeholder="Enter your full name"/></label><label>Enter your email address<input placeholder="Enter your email address"/></label><label>Enter your phone number<input placeholder="Enter your phone number"/></label><label className="full">Tell us how we can help you...<textarea rows="8"/></label><button className="requestBtn">SUBMIT</button></form></main>
}

function EmptyPage({kind}){
 const offers=kind==="offers";
 return <main className="innerPage siteWrap"><PageHeading title={offers?"Special Offers & Deals":"Upcoming Events"} city={false}/><div className="emptyState"><div className="emptyIcon">{offers?"🏷️":"📅"}</div><h2>{offers?"No offers available":"No Events Available"}</h2><p>{offers?"Check back soon for new deals and promotions!":"Check back soon for upcoming events and workshops!"}</p>{!offers&&<button onClick={()=>go("/")}>BACK TO STORE</button>}</div></main>
}

function BlogPage(){
 return <main className="innerPage siteWrap"><PageHeading title="News" city={false}/><div className="blogPageLayout"><section className="blogFeed">{blogPosts.map(p=><article className="newsCard" key={p.slug}><SafeImage src={p.img} alt={p.title}/><div><h2>{p.title}</h2><p>Helpful ideas, planning guidance, and rental tips for events, home projects, and professional jobs.</p><button onClick={()=>go("/blogs/news/"+p.slug)}>Read More →</button></div></article>)}</section><aside className="recentArticles"><h3>Recent Articles</h3>{blogPosts.map(p=><button key={p.slug} onClick={()=>go("/blogs/news/"+p.slug)}><b>{p.title}</b><span>{p.date}</span></button>)}</aside></div><div className="pagination"><button>←</button><b>1</b><button>2</button><button>3</button><span>…</span><button>6</button><button>→</button></div></main>
}

function ArticlePage({slug}){
 const p=blogPosts.find(x=>x.slug===slug)||{title:niceSlug(slug),date:"2026",img:IMG.party};
 return <main className="innerPage siteWrap articlePage"><div className="blogPageLayout"><article className="articleBody"><SafeImage src={p.img} alt={p.title}/><h1>{p.title}</h1><div className="posted">Posted by Taylor Rental · {p.date}</div><p>Good planning starts with understanding the space, guest count, timing, and the equipment needed to keep an event or project running smoothly.</p><h2>Plan Around the Space</h2><p>Think through traffic flow, seating, work zones, weather protection, and where equipment will be placed before the rental day arrives.</p><h2>Choose the Right Rentals</h2><p>Tables, chairs, tents, tools, and specialty equipment can be reserved based on the job at hand rather than purchased for a one-time use.</p><h2>Reserve Early</h2><p>Popular rental dates and specialty items can book quickly. Early planning leaves more options and makes coordination easier.</p></article><aside className="recentArticles"><h3>Recent Articles</h3>{blogPosts.map(x=><button key={x.slug} onClick={()=>go("/blogs/news/"+x.slug)}><b>{x.title}</b><span>{x.date}</span></button>)}</aside></div></main>
}

function PolicyPage({slug}){
 const title={"privacy-policy":"Privacy Policy","refund-policy":"Return Policy","terms-of-service":"Terms of Service"}[slug]||"Accessibility Statement";
 return <main className="innerPage siteWrap policyPage"><PageHeading title={title} city={false}/><h2>{title}</h2><p>This demonstration page mirrors the layout used for Taylor Rental's informational policy pages. Policy details would be managed from PartyRentalCRM for the live customer site.</p><p>For questions about store policies, accessibility, returns, reservations, or website use, contact the store directly.</p></main>
}

function FloatingReservation(){
 const[open,setOpen]=useState(false);
 return <><button className="floatingReservation" onClick={()=>setOpen(true)}>▣ RENTAL RESERVATION REQUEST</button><RequestModal open={open} onClose={()=>setOpen(false)} item="Rental Reservation Request"/></>
}

function Footer(){return <footer><div className="siteWrap footerGrid">
 <div><h4>MAIN MENU</h4><a onClick={()=>go("/collections/rentals")}>View Rentals</a><a onClick={()=>go("/apps/pages/offers")}>Offers</a><a onClick={()=>go("/a/pages/events")}>Events</a><a onClick={()=>go("/blogs/news")}>Blog</a><a onClick={()=>go("/pages/about-us")}>About Us</a><a onClick={()=>go("/apps/pages/locations/taylor-rental-of-dewitt-ny-renting-memories")}>Locations</a><a onClick={()=>go("/pages/contact")}>Contact Us</a></div>
 <div><h4>TAYLOR RENTAL OF DEWITT, NY / RENTING MEMORIES</h4><p><MapPin size={13}/>3131 Erie Blvd E, Syracuse, NY 13214</p><div className="hours"><span>Mon:</span><b>7:30 AM - 5:30 PM</b><span>Tue:</span><b>7:30 AM - 5:30 PM</b><span>Wed:</span><b>7:30 AM - 5:30 PM</b><span>Thu:</span><b>7:30 AM - 5:30 PM</b><span>Fri:</span><b>7:30 AM - 5:30 PM</b><span>Sat:</span><b>CLOSED</b><span>Sun:</span><b>CLOSED</b></div><p><Phone size={13}/>(315) 446-7101</p><p><Mail size={13}/>trc@rentingmemories.com</p></div>
 <div className="footerNewsletter"><h4>NEWSLETTER</h4><p>Promotions, new products and sales. Directly to your inbox.</p><div><input placeholder="First Name"/><input placeholder="Email Address"/></div><button>SIGN UP</button></div>
 </div><div className="siteWrap footerBottom"><span><a onClick={()=>go("/collections/all")}>Search</a> · <a onClick={()=>go("/policies/privacy-policy")}>Privacy Policy</a> · <a onClick={()=>go("/policies/refund-policy")}>Return Policy</a> · <a onClick={()=>go("/policies/terms-of-service")}>Terms of Service</a> · <a onClick={()=>go("/pages/accessibility-statement")}>Accessibility Statement</a></span><span><Twitter size={13}/> <Facebook size={13}/></span></div><div className="siteWrap copyright">© 2026 Taylor Rental of Dewitt, NY / Renting Memories. Powered by PartyRentalCRM.</div></footer>}

function App(){
 const[r,setR]=useState(currentRoute());
 React.useEffect(()=>{const fn=()=>setR(currentRoute());addEventListener("popstate",fn);return()=>removeEventListener("popstate",fn)},[]);
 let body;
 if(r.type==="home")body=<Home/>;
 else if(r.type==="collection")body=<Collection slug={r.slug}/>;
 else if(r.type==="product")body=<Product slug={r.slug}/>;
 else if(r.type==="blog")body=<BlogPage/>;
 else if(r.type==="article")body=<ArticlePage slug={r.slug}/>;
 else if(r.type==="offers")body=<EmptyPage kind="offers"/>;
 else if(r.type==="events")body=<EmptyPage kind="events"/>;
 else if(r.type==="location")body=<LocationPage/>;
 else if(r.type==="policy")body=<PolicyPage slug={r.slug}/>;
 else if(r.type==="page"&&servicePages[r.slug])body=<InfoPage slug={r.slug}/>;
 else if(r.type==="page"&&r.slug==="about-us")body=<AboutPage/>;
 else if(r.type==="page"&&r.slug==="see-what-our-customers-have-had-to-say")body=<ReviewsPage/>;
 else if(r.type==="page"&&r.slug==="gallery")body=<GalleryPage/>;
 else if(r.type==="page"&&r.slug==="contact")body=<ContactPage/>;
 else if(r.type==="page"&&r.slug==="accessibility-statement")body=<PolicyPage slug="accessibility-statement"/>;
 else body=<AboutPage/>;
 return <><Header/>{body}{r.type!=="home"&&<FloatingReservation/>}<Footer/></>
}
createRoot(document.getElementById("root")).render(<App/>);