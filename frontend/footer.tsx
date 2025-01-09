function footer() {
  return (
    <footer className="bg-green-900 text-white py-5 px-4 sm:px-8 md:px-16">
      <hr className="border-t border-gray-300 my-8"></hr>
      {/* Container */}
      <div className="flex flex-wrap justify-between space-y-4 md:space-y-0">
        {/* Left Section */}
        <div className="flex-1 flex space-x-4 items-center p-4">
          <a className="flex h-20 w-20 ml-3 text-gray-500">
          <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="56" cy="56" r="56" fill="#F2F2EC"/>
          <path d="M55.5 59H57.25C59.175 59 60.75 57.425 60.75 55.5V38H45C42.375 38 40.0825 39.4525 38.8925 41.5875" stroke="#345333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M38 64.25C38 67.155 40.345 69.5 43.25 69.5H45C45 67.575 46.575 66 48.5 66C50.425 66 52 67.575 52 69.5H59C59 67.575 60.575 66 62.5 66C64.425 66 66 67.575 66 69.5H67.75C70.655 69.5 73 67.155 73 64.25V59H67.75C66.7875 59 66 58.2125 66 57.25V52C66 51.0375 66.7875 50.25 67.75 50.25H70.0075L67.015 45.0175C66.7067 44.482 66.2631 44.0369 65.7287 43.7268C65.1944 43.4166 64.5879 43.2522 63.97 43.25H60.75V55.5C60.75 57.425 59.175 59 57.25 59H55.5" stroke="#345333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M38 48.5H48.5M38 53.75H45M38 59H41.5M48.5 73C49.4283 73 50.3185 72.6313 50.9749 71.9749C51.6313 71.3185 52 70.4283 52 69.5C52 68.5717 51.6313 67.6815 50.9749 67.0251C50.3185 66.3687 49.4283 66 48.5 66C47.5717 66 46.6815 66.3687 46.0251 67.0251C45.3687 67.6815 45 68.5717 45 69.5C45 70.4283 45.3687 71.3185 46.0251 71.9749C46.6815 72.6313 47.5717 73 48.5 73V73ZM62.5 73C63.4283 73 64.3185 72.6313 64.9749 71.9749C65.6313 71.3185 66 70.4283 66 69.5C66 68.5717 65.6313 67.6815 64.9749 67.0251C64.3185 66.3687 63.4283 66 62.5 66C61.5717 66 60.6815 66.3687 60.0251 67.0251C59.3687 67.6815 59 68.5717 59 69.5C59 70.4283 59.3687 71.3185 60.0251 71.9749C60.6815 72.6313 61.5717 73 62.5 73ZM73 55.5V59H67.75C66.7875 59 66 58.2125 66 57.25V52C66 51.0375 66.7875 50.25 67.75 50.25H70.0075L73 55.5Z" stroke="#345333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </a>
          <div className="flex flex-col">
            <p className="text-3xl">Free Shipping</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex-1 flex space-x-4 items-center p-4">
          <a className="flex h-20 w-20 ml-3 text-gray-500">
          <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="56" cy="56" r="56" fill="#F2F2EC"/>
          <path d="M70.1787 51.4697C68.9645 49.3701 66.9972 47.8254 64.6863 47.157C62.3755 46.4886 59.899 46.748 57.7723 47.8813V38.9103H54.2277V47.8813C52.101 46.748 49.6245 46.4886 47.3137 47.157C45.0028 47.8254 43.0356 49.3701 41.8213 51.4697C38.2766 56.8523 47.1383 73 50.683 73C54.2277 73 54.2277 71.2058 56 71.2058C57.7723 71.2058 57.7723 73 61.317 73C64.8617 73 73.7234 56.8523 70.1787 51.4697ZM67.0771 57.5341C65.9783 61.9657 63.816 66.0385 60.7853 69.4116C60.4308 69.4116 60.0232 69.2322 59.7219 68.9631C58.6685 68.1008 57.3547 67.6304 56 67.6304C54.6453 67.6304 53.3315 68.1008 52.2781 68.9631C51.9768 69.2322 51.5692 69.4116 51.2147 69.4116C48.1756 66.0498 46.013 61.9735 44.9229 57.552C44.4798 56.2422 44.3912 54.8248 44.7634 53.4792C45.2678 52.5687 45.9966 51.8059 46.8786 51.2651C47.7607 50.7243 48.766 50.4239 49.7968 50.3932C50.7893 50.4111 51.7641 50.6444 52.6503 51.0929L54.2277 51.9003H57.7723L59.3497 51.0929C60.2359 50.6444 61.2107 50.4111 62.2032 50.3932C64.2945 50.447 66.2087 51.6132 67.2366 53.4612C67.6088 54.8069 67.5202 56.2243 67.0771 57.5341ZM54.2277 42.4987C44.2671 48.0069 42.0163 40.3098 42.0163 40.3098C42.0163 40.3098 46.7307 33.8686 54.2277 42.4987Z" fill="#345333"/>
          </svg>
          </a>
          <div className="flex flex-col">
            <p className="text-3xl">Free Shipping</p>
            <p>Lorem, ipsum dolor sit sicing elit.</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex space-x-4 items-center p-4">
          <a className="flex h-20 w-20 ml-3 text-gray-500">
            <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="56" cy="56" r="56" fill="#F2F2EC"/>
              <path d="M50.7464 60.7404L61.2621 50.2246M41.964 60.1445L39.3 57.4805C38.2133 56.3938 38.2133 54.6062 39.3 53.5195L41.964 50.8555C42.4196 50.3998 42.7877 49.506 42.7877 48.8751V45.1069C42.7877 43.5646 44.0496 42.3027 45.5919 42.3027H49.36C49.991 42.3027 50.8848 41.9347 51.3405 41.479L54.0045 38.815C55.0911 37.7283 56.8788 37.7283 57.9655 38.815L60.6295 41.479C61.0851 41.9347 61.979 42.3027 62.6099 42.3027H66.3781C67.9204 42.3027 69.1823 43.5646 69.1823 45.1069V48.8751C69.1823 49.506 69.5503 50.3998 70.006 50.8555L72.67 53.5195C73.7566 54.6062 73.7566 56.3938 72.67 57.4805L70.006 60.1445C69.5503 60.6001 69.1823 61.494 69.1823 62.1249V65.8931C69.1823 67.4354 67.9204 68.6973 66.3781 68.6973H62.6099C61.979 68.6973 61.0851 69.0653 60.6295 69.521L57.9655 72.185C56.8788 73.2717 55.0911 73.2717 54.0045 72.185L51.3405 69.521C50.8848 69.0653 49.991 68.6973 49.36 68.6973H45.5919C44.0496 68.6973 42.7877 67.4354 42.7877 65.8931V62.1249C42.7877 61.4765 42.4196 60.5826 41.964 60.1445V60.1445Z" stroke="#345333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M60.377 59.8637H60.3928M51.6139 51.1006H51.6279" stroke="#345333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <div className="flex flex-col">
            <p className="text-3xl">Free Shipping</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-300 my-8"></hr>
      <div className="flex flex-wrap justify-between space-y-4 md:space-y-0">
        
        {/* Left Section */}
        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <p className="title-font  text-white tracking-widest text-3xl mb-3">Information</p>
          <nav className="list-none space-y-6 mb-10">
          <li>
            <a className="text-slate-300 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit</a>
          </li>
          <hr className="border-t border-gray-300 my-8"></hr>
          <li>
            <a className="text-slate-300 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit</a>
          </li>
          
        </nav>
            {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p> */}

          </div>
      

        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <p className="title-font  text-white tracking-widest text-3xl mb-3">Information</p>
        <nav className="list-none space-y-6 mb-10">
          <li>
            <a className="text-slate-300 hover:text-white">First Link</a>
          </li>
          <li>
            <a className="text-slate-300 hover:text-white">Second Link</a>
          </li>
          <li>
            <a className="text-slate-300 hover:text-white">Third Link</a>
          </li>
          <li>
            <a className="text-slate-300 hover:text-white">Fourth Link</a>
          </li>
        </nav>
      </div>

        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <p className="title-font  text-white tracking-widest text-3xl mb-3">Categories</p>
        <nav className="list-none space-y-6 mb-10">
        <li>
            <a className="text-slate-300 hover:text-white">First Link</a>
          </li>
          <li>
            <a className="text-slate-300 hover:text-white">Second Link</a>
          </li>
          <li>
            <a className="text-slate-300 hover:text-white">Third Link</a>
          </li>
          <li>
            <a className="text-slate-300 hover:text-white">Fourth Link</a>
          </li>
        </nav>
      </div>
        <div className="lg:w-1/4 md:w-1/2 w-full p-4 ">
        <p className="title-font  text-white tracking-widest text-3xl mb-3">Subscribe</p>
        <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
          <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
            <label  className="leading-7 text-sm text-slate-300">Placeholder</label>
            <input type="text" id="footer-field" name="footer-field" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
            </input>
          </div>
          <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
        </div>
        <p className="text-slate-300 text-sm mt-2 md:text-left text-center">Bitters chicharrones fanny pack <br></br> waistcoat green juice
        </p>
        <div className="flex flex-row justify-center ">
        {/* <ul className="flex space-x-4">
    <li>
        <a href="javascript:void(0);">
            <img src="assets/images/icons/fb.svg" alt="Facebook" className="w-6 h-6"/>
        </a>
    </li>
    <li>
        <a href="javascript:void(0);">
            <img src="assets/images/icons/ig.svg" alt="Instagram" className="w-6 h-6"/>
        </a>
    </li>
    <li>
        <a href="javascript:void(0);">
            <img src="assets/images/icons/twitter-new.png" alt="Twitter" className="w-6 h-6"/>
        </a>
    </li>
    <li>
        <a href="javascript:void(0);">
            <img src="assets/images/icons/yt.svg" alt="YouTube" className="w-6 h-6"/>
        </a>
    </li>
</ul> */}

        <a className="flex h-10 w-10 ml-3 text-gray-500">
        <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="31" cy="31" r="31" fill="#496547"/>
          <path d="M31.741 41.0002V31.8772H34.803L35.262 28.3222H31.742V26.0522C31.742 25.0222 32.027 24.3212 33.503 24.3212L35.386 24.3202V21.1402C34.4749 21.0437 33.5592 20.997 32.643 21.0002C29.928 21.0002 28.07 22.6572 28.07 25.7002V28.3222H25V31.8772H28.07V41.0002H31.741V41.0002Z" fill="#F2F2EC"/>
          </svg>

          </a>
          <a className="flex h-10 w-10 ml-3 text-gray-500">
            <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="31" cy="31" r="31" fill="#496547"/>
            <path d="M26.8 21H35.2C38.4 21 41 23.6 41 26.8V35.2C41 36.7383 40.3889 38.2135 39.3012 39.3012C38.2135 40.3889 36.7383 41 35.2 41H26.8C23.6 41 21 38.4 21 35.2V26.8C21 25.2617 21.6111 23.7865 22.6988 22.6988C23.7865 21.6111 25.2617 21 26.8 21M26.6 23C25.6452 23 24.7295 23.3793 24.0544 24.0544C23.3793 24.7295 23 25.6452 23 26.6V35.4C23 37.39 24.61 39 26.6 39H35.4C36.3548 39 37.2705 38.6207 37.9456 37.9456C38.6207 37.2705 39 36.3548 39 35.4V26.6C39 24.61 37.39 23 35.4 23H26.6ZM36.25 24.5C36.5815 24.5 36.8995 24.6317 37.1339 24.8661C37.3683 25.1005 37.5 25.4185 37.5 25.75C37.5 26.0815 37.3683 26.3995 37.1339 26.6339C36.8995 26.8683 36.5815 27 36.25 27C35.9185 27 35.6005 26.8683 35.3661 26.6339C35.1317 26.3995 35 26.0815 35 25.75C35 25.4185 35.1317 25.1005 35.3661 24.8661C35.6005 24.6317 35.9185 24.5 36.25 24.5ZM31 26C32.3261 26 33.5979 26.5268 34.5355 27.4645C35.4732 28.4021 36 29.6739 36 31C36 32.3261 35.4732 33.5979 34.5355 34.5355C33.5979 35.4732 32.3261 36 31 36C29.6739 36 28.4021 35.4732 27.4645 34.5355C26.5268 33.5979 26 32.3261 26 31C26 29.6739 26.5268 28.4021 27.4645 27.4645C28.4021 26.5268 29.6739 26 31 26M31 28C30.2044 28 29.4413 28.3161 28.8787 28.8787C28.3161 29.4413 28 30.2044 28 31C28 31.7956 28.3161 32.5587 28.8787 33.1213C29.4413 33.6839 30.2044 34 31 34C31.7956 34 32.5587 33.6839 33.1213 33.1213C33.6839 32.5587 34 31.7956 34 31C34 30.2044 33.6839 29.4413 33.1213 28.8787C32.5587 28.3161 31.7956 28 31 28Z" fill="#F2F2EC"/>
            </svg>
          </a>
          <a className="flex h-10 w-10 ml-3 text-gray-500">
          <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="31" cy="31" r="31" fill="#496547"/>
          <path d="M31 23C31.855 23 32.732 23.022 33.582 23.058L34.586 23.106L35.547 23.163L36.447 23.224L37.269 23.288C38.161 23.3563 39.0004 23.7369 39.6395 24.363C40.2786 24.9891 40.6764 25.8205 40.763 26.711L40.803 27.136L40.878 28.046C40.948 28.989 41 30.017 41 31C41 31.983 40.948 33.011 40.878 33.954L40.803 34.864C40.79 35.01 40.777 35.151 40.763 35.289C40.6764 36.1796 40.2784 37.0112 39.6391 37.6373C38.9999 38.2634 38.1602 38.6439 37.268 38.712L36.448 38.775L35.548 38.837L34.586 38.894L33.582 38.942C32.7218 38.9794 31.861 38.9987 31 39C30.139 38.9987 29.2782 38.9794 28.418 38.942L27.414 38.894L26.453 38.837L25.553 38.775L24.731 38.712C23.839 38.6437 22.9996 38.2631 22.3605 37.637C21.7214 37.0109 21.3236 36.1795 21.237 35.289L21.197 34.864L21.122 33.954C21.0455 32.9711 21.0048 31.9858 21 31C21 30.017 21.052 28.989 21.122 28.046L21.197 27.136C21.21 26.99 21.223 26.849 21.237 26.711C21.3235 25.8207 21.7212 24.9894 22.3601 24.3633C22.999 23.7373 23.8381 23.3565 24.73 23.288L25.551 23.224L26.451 23.163L27.413 23.106L28.417 23.058C29.2775 23.0206 30.1387 23.0013 31 23V23ZM31 25C30.175 25 29.326 25.022 28.5 25.056L27.522 25.103L26.583 25.158L25.701 25.218L24.893 25.281C24.4683 25.3111 24.068 25.4906 23.7631 25.7877C23.4581 26.0848 23.2682 26.4803 23.227 26.904C23.11 28.113 23 29.618 23 31C23 32.382 23.11 33.887 23.227 35.096C23.312 35.968 24.004 36.646 24.893 36.719L25.701 36.781L26.583 36.841L27.522 36.897L28.5 36.944C29.326 36.978 30.175 37 31 37C31.825 37 32.674 36.978 33.5 36.944L34.478 36.897L35.417 36.842L36.299 36.782L37.107 36.719C37.5317 36.6889 37.932 36.5094 38.2369 36.2123C38.5419 35.9152 38.7318 35.5197 38.773 35.096C38.89 33.887 39 32.382 39 31C39 29.618 38.89 28.113 38.773 26.904C38.7318 26.4803 38.5419 26.0848 38.2369 25.7877C37.932 25.4906 37.5317 25.3111 37.107 25.281L36.299 25.219L35.417 25.159L34.478 25.103L33.5 25.056C32.6671 25.0202 31.8336 25.0015 31 25V25ZM29 28.575C28.9999 28.4773 29.0237 28.381 29.0694 28.2946C29.115 28.2081 29.181 28.1341 29.2618 28.079C29.3425 28.0239 29.4354 27.9894 29.5326 27.9784C29.6297 27.9674 29.728 27.9803 29.819 28.016L29.9 28.056L34.1 30.48C34.1836 30.5283 34.2544 30.596 34.3063 30.6774C34.3581 30.7589 34.3896 30.8517 34.3979 30.9478C34.4062 31.044 34.3912 31.1408 34.3542 31.23C34.3171 31.3192 34.2591 31.3981 34.185 31.46L34.1 31.52L29.9 33.945C29.8154 33.994 29.72 34.0216 29.6223 34.0253C29.5246 34.0291 29.4274 34.0089 29.3393 33.9665C29.2511 33.9241 29.1747 33.8608 29.1166 33.7821C29.0585 33.7034 29.0205 33.6117 29.006 33.515L29 33.425V28.575V28.575Z" fill="#F2F2EC"/>
          </svg>

          </a>
          
        </div>
      </div>

      </div>
      <hr className="border-t border-gray-300 my-8"></hr>

      {/* Footer Bottom */}
      <div className="mt-4 flex flex-wrap justify-between items-center">
        <div className="flex">
          <p>VEBBAZAR
          </p>
        </div>
        <div className="flex">
          <p>&copy; 2025 VegBazaar. All rights reserved.</p>
        </div>
       
      </div>
    </footer>
  );
}

export default footer;
