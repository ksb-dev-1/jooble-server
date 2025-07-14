// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import NProgress from "nprogress";
// import { useEffect } from "react";

// type Props = React.ComponentProps<typeof Link>;

// export default function LinkWithNProgress(props: Props) {
//   const pathname = usePathname();

//   // Finish NProgress after route actually renders
//   useEffect(() => {
//     // Delay a little to allow for layout rendering
//     const doneTimeout = setTimeout(() => {
//       NProgress.done();
//     }, 300); // tweak this as needed

//     return () => clearTimeout(doneTimeout);
//   }, [pathname]);

//   return (
//     <Link
//       {...props}
//       onClick={(e) => {
//         NProgress.start(); // Start instantly on click
//         props.onClick?.(e);
//       }}
//     />
//   );
// }

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// 3rd party
import NProgress from "nprogress";

export default function LinkWithProgress(
  props: React.ComponentProps<typeof Link>
) {
  const pathname = usePathname();

  useEffect(() => {
    const done = setTimeout(() => NProgress.done(), 300); // show until content loads
    return () => clearTimeout(done);
  }, [pathname]);

  return (
    <Link
      {...props}
      onClick={(e) => {
        NProgress.start();
        props.onClick?.(e);
      }}
    />
  );
}
