import React from 'react'

function DesignSystem() {
  return (
      <div className='container'>
         <h1 className='uppercase'>Design System</h1>
         <section id='colors' className=''>
            <h2 className='uppercase'> <span>01</span>colors</h2>
            <div className='flex'>
               <div className='flex-grow'>
                  <div className='bg-blue' style={{ padding: "3rem 1rem 1rem ", border: "1px solid white", }}>
                     #0B0D17
                  </div>
                  <p> <span className='text-accent'>RGB</span> 11, 13, 23</p>
                  <p><span className='text-accent'>HSL</span> 230, 35%, 7% </p>
               </div>

               <div className='flex-grow'>
                  <div className='bg-accent text-blue' style={{ padding: "3rem 1rem 1rem ", border: "1px solid white", }}>
                     #D0D6F9
                  </div>
                  <p> <span className='text-accent'>RGB</span> 208, 214, 249</p>
                  <p><span className='text-accent'>HSL</span> 231°, 77%, 90%</p>
               </div>
               <div className='flex-grow'>
                  <div className='bg-white text-dark' style={{ padding: "3rem 1rem 1rem ", border: "1px solid white", }}>
                     #FFFFFF
                  </div>
                  <p> <span className='text-accent'>RGB</span> 255, 255, 255</p>
                  <p><span className='text-accent'>HSL</span> 0°, 0%, 100%</p>
               </div>
            </div>
         </section>
         <section id="typography" style={{ margin: "4rem 8" }}>
            <h2 className='uppercase'><span>02</span>Typography</h2>
            <div className='flex'>
               <div style={{ flexBasis: "100%" }}>
                  <div>
                     <p className='text-accent'>Heading 1 - Ballefair regular -- 150px</p>
                     <p className='fs-900 ff-serif uppercase'>Earth</p>
                  </div>
                  <div>
                     <p className='text-accent'>Heading 1 - Ballefair regular -- 100px</p>
                     <p  className='fs-800 ff-serif uppercase'>Venus</p>
                  </div>
                  <div>
                     <p className='text-accent'>Heading 1 - Ballefair regular -- 56px</p>
                     <p  className='fs-700 ff-serif uppercase'>Jupiter & Saturn</p>
                  </div>

                  <div>
                     <p className='text-accent'>Heading 1 - Ballefair regular -- 32px</p>
                     <p className='fs-600 ff-serif uppercase'>Uranus, Neptun, & Pluto</p>
                  </div>
                  <div > 
                            <p className='text-accent' >Heading 5 - Barlow Condensed Regular - 28px - 4.75 Character Space</p>
                            <p className='text-accent fs-500 ff-sans-cond uppercase letter-spacing-1'>So, you want to travel to space</p>
                        </div>
               </div>

               <div  style={{flexBasis: "100%"}}>
                        <div> 
                            <p>Subheading 1 - Bellefair Regular - 28px</p>
                            <p>384,400 km</p>
                        </div>
                        <div> 
                            <p>Subheading 2 - Barlow Condensed Regular - 14px - 2.35 Character Space</p>
                            <p>Avg. Distance</p>
                        </div>
                        <div> 
                            <p>Nav Text - Barlow Condensed Regular - 16px - 2.7 Character Space</p>
                            <p>Europa</p>
                        </div>
                        <div> 
                            <p>Body Text</p>
                            <p className='ff-lora text-blue'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. </p>
                        </div>
                    </div>
            </div>
         </section>

         <section>
            <button>Login</button>
         </section>
      </div>
  )
}

export default DesignSystem