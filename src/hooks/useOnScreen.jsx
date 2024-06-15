import { useEffect } from 'react';

export default function UseInViewport(elementRef, onIntersection, options = {}) {
  useEffect(() => {
    const targetElement = elementRef.current;

    if (!targetElement) {
      console.error('Ref not provided or not valid');
      return;
    }

    const observer = new IntersectionObserver(onIntersection, options);

    observer.observe(targetElement);

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, [elementRef, onIntersection, options]);
}

// Example usage in a functional component
// import React, { useRef } from 'react';

// const YourComponent = () => {
//   const elementRef = useRef();

//   const handleIntersection = (entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         console.log("Element is in the viewport");
//       } else {
//         console.log("Element is out of the viewport");
//       }
//     });
//   };

//   UseInViewport(elementRef, handleIntersection);

//   return (
//     <div ref={elementRef}>
//       {/* Your component content here */}
//     </div>
//   );
// };
